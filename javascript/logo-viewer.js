import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const loader = new GLTFLoader()
const POINTER_OUTSIDE = new THREE.Vector2(999, 999)

class LogoViewer {
  constructor(container, modelUrl) {
    this.container = container
    this.modelUrl = modelUrl
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20)
    this.camera.position.set(0, 0, 4)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.domElement = this.renderer.domElement
    this.container.appendChild(this.domElement)

    this.pivot = new THREE.Group()
    this.anchor = new THREE.Group()
    this.pivot.add(this.anchor)
    this.scene.add(this.pivot)

    this.raycaster = new THREE.Raycaster()
    this.pointer = POINTER_OUTSIDE.clone()
    this.pointerHover = false
    this.focused = false
    this.isHovered = false

    this.baseScaleValue = 1
    this.baseScaleVec = new THREE.Vector3(1, 1, 1)
    this.hoverScaleVec = new THREE.Vector3(1, 1, 1)
    this.targetScaleVec = new THREE.Vector3(1, 1, 1)

    this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    this.hoverScaleFactor = this.motionQuery.matches ? 1.03 : 1.12
    this.handleMotionPreferenceChange = this.handleMotionPreferenceChange.bind(this)
    if (this.motionQuery.addEventListener) {
      this.motionQuery.addEventListener("change", this.handleMotionPreferenceChange)
    } else {
      this.motionQuery.addListener(this.handleMotionPreferenceChange)
    }

    this.linkHref = container.dataset.link || null
    this.linkTarget = container.dataset.linkTarget || "_blank"

    if (!container.hasAttribute("tabindex")) {
      container.setAttribute("tabindex", "0")
    }
    if (!container.hasAttribute("role") && this.linkHref) {
      container.setAttribute("role", "link")
    }

    this.addLights()
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      this.handleResize(width, height)
    })
    this.resizeObserver.observe(this.container)

    this.clock = new THREE.Clock()
    this.rotationSpeed = 0.35
    this.animate = this.animate.bind(this)
    this.renderer.setAnimationLoop(this.animate)

    this.registerEvents()

    this.handleResize(this.container.clientWidth, this.container.clientHeight)
    this.loadModel()
  }

  registerEvents() {
    this.onPointerMove = this.handlePointerMove.bind(this)
    this.onPointerLeave = this.handlePointerLeave.bind(this)
    this.onClick = this.handleClick.bind(this)
    this.onFocus = this.handleFocus.bind(this)
    this.onBlur = this.handleBlur.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)

    this.domElement.addEventListener("pointermove", this.onPointerMove)
    this.domElement.addEventListener("pointerleave", this.onPointerLeave)
    this.domElement.addEventListener("click", this.onClick)

    this.container.addEventListener("focus", this.onFocus)
    this.container.addEventListener("blur", this.onBlur)
    this.container.addEventListener("keydown", this.onKeyDown)
  }

  addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85)
    keyLight.position.set(4, 6, 6)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-4, -3, -6)

    this.scene.add(ambient, keyLight, fillLight)
  }

  handleResize(width, height) {
    const safeWidth = Math.max(width, 1)
    const safeHeight = Math.max(height, 1)
    this.camera.aspect = safeWidth / safeHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(safeWidth, safeHeight, false)
  }

  loadModel() {
    loader.load(
      this.modelUrl,
      (gltf) => {
        this.anchor.clear()
        this.model = gltf.scene
        this.anchor.add(this.model)
        this.frameModel()
      },
      undefined,
      (error) => {
        console.error(`Failed to load model ${this.modelUrl}`, error)
      }
    )
  }

  frameModel() {
    this.anchor.updateMatrixWorld(true)
    const sizeBox = new THREE.Box3().setFromObject(this.anchor)
    const size = sizeBox.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 1.8
    const scale = maxDim > 0 ? targetSize / maxDim : 1
    this.anchor.scale.setScalar(scale)

    this.anchor.updateMatrixWorld(true)
    const centerBox = new THREE.Box3().setFromObject(this.anchor)
    const center = centerBox.getCenter(new THREE.Vector3())
    this.anchor.position.sub(center)
    this.anchor.updateMatrixWorld(true)

    this.refreshScaleVectors(scale)
    this.updateHoverState()

    this.camera.position.set(0, 0, 4)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  refreshScaleVectors(baseScale) {
    if (typeof baseScale === "number") {
      this.baseScaleValue = baseScale
    }
    this.baseScaleVec.setScalar(this.baseScaleValue)
    this.hoverScaleVec.copy(this.baseScaleVec).multiplyScalar(this.hoverScaleFactor)
    const active = this.isHovered ? this.hoverScaleVec : this.baseScaleVec
    this.targetScaleVec.copy(active)
    this.anchor.scale.copy(active)
  }

  handlePointerMove(event) {
    if (!this.model) return
    const rect = this.domElement.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    this.pointer.set(x, y)
    this.castPointer()
  }

  handlePointerLeave() {
    this.pointer.copy(POINTER_OUTSIDE)
    this.pointerHover = false
    this.updateHoverState()
  }

  castPointer() {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const intersections = this.raycaster.intersectObject(this.anchor, true)
    this.pointerHover = intersections.length > 0
    this.updateHoverState()
  }

  handleFocus() {
    this.focused = true
    this.updateHoverState()
  }

  handleBlur() {
    this.focused = false
    this.updateHoverState()
  }

  handleClick(event) {
    if (!this.linkHref || event.button !== 0) return
    if (!this.isHovered) return
    this.navigateToLink()
  }

  handleKeyDown(event) {
    if (!this.linkHref) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.navigateToLink()
    }
  }

  navigateToLink() {
    if (!this.linkHref) return
    if (this.linkTarget === "_blank") {
      window.open(this.linkHref, "_blank", "noopener,noreferrer")
    } else {
      window.location.assign(this.linkHref)
    }
  }

  updateHoverState() {
    const shouldHover = this.focused || this.pointerHover
    if (shouldHover === this.isHovered) return
    this.isHovered = shouldHover
    this.targetScaleVec.copy(this.isHovered ? this.hoverScaleVec : this.baseScaleVec)
  }

  handleMotionPreferenceChange() {
    this.hoverScaleFactor = this.motionQuery.matches ? 1.03 : 1.12
    this.refreshScaleVectors()
  }

  animate() {
    const delta = this.clock.getDelta()
    this.pivot.rotation.y += this.rotationSpeed * delta
    const easing = this.motionQuery.matches ? 0.2 : 0.1
    this.anchor.scale.lerp(this.targetScaleVec, easing)
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.setAnimationLoop(null)
    this.resizeObserver.disconnect()
    this.domElement.removeEventListener("pointermove", this.onPointerMove)
    this.domElement.removeEventListener("pointerleave", this.onPointerLeave)
    this.domElement.removeEventListener("click", this.onClick)
    this.container.removeEventListener("focus", this.onFocus)
    this.container.removeEventListener("blur", this.onBlur)
    this.container.removeEventListener("keydown", this.onKeyDown)
    if (this.motionQuery.removeEventListener) {
      this.motionQuery.removeEventListener("change", this.handleMotionPreferenceChange)
    } else {
      this.motionQuery.removeListener(this.handleMotionPreferenceChange)
    }
  }
}

export function initLogoViewers() {
  const containers = document.querySelectorAll("[data-logo-viewer]")
  if (!containers.length) return

  for (const container of containers) {
    const modelUrl = container.dataset.model
    if (!modelUrl) continue
    if (container.__logoViewerInstance) continue
    container.__logoViewerInstance = new LogoViewer(container, modelUrl)
  }
}
