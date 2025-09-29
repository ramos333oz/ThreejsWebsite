import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const loader = new GLTFLoader()

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
    this.container.appendChild(this.renderer.domElement)

    this.pivot = new THREE.Group()
    this.anchor = new THREE.Group()
    this.pivot.add(this.anchor)
    this.scene.add(this.pivot)

    this.addLights()
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      this.handleResize(width, height)
    })
    this.resizeObserver.observe(this.container)

    this.clock = new THREE.Clock()
    this.rotationSpeed = 0.35
    this.animate = this.animate.bind(this)
    this.renderer.setAnimationLoop(this.animate)

    this.handleResize(this.container.clientWidth, this.container.clientHeight)
    this.loadModel()
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
        this.normalizeGeometry(this.model)
        this.anchor.add(this.model)
        this.frameModel()
      },
      undefined,
      (error) => {
        console.error(`Failed to load model ${this.modelUrl}`, error)
      }
    )
  }

  normalizeGeometry(root) {
    root.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.geometry = child.geometry.clone()
        child.geometry.computeBoundingBox()
        child.geometry.center()
        child.position.set(0, 0, 0)
        child.rotation.set(0, 0, 0)
        child.updateMatrix()
      }
    })
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

    this.camera.position.set(0, 0, 4)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  animate() {
    const delta = this.clock.getDelta()
    this.pivot.rotation.y += this.rotationSpeed * delta
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
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
