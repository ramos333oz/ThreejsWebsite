import * as THREE from "three"


const backgroundThemes = {
  about: {
    name: "About",
    colorStart: [240, 249, 255],    // Pale cyan
    colorMid: [236, 252, 255],      // Bright cyan (close to hero)
    colorEnd: [235, 247, 255],      // Light sky blue
    glowColor: [56, 189, 248],      // Bright sky blue glow
  },
  skills: {
    name: "Skills",
    colorStart: [236, 254, 255],    // Ice blue
    colorMid: [224, 242, 254],      // Azure
    colorEnd: [236, 252, 255],      // Bright cyan
    glowColor: [34, 211, 238],      // Teal-cyan glow
  },
  projects: {
    name: "Projects",
    colorStart: [240, 249, 255],    // Sky blue
    colorMid: [235, 245, 255],      // Pale blue
    colorEnd: [237, 233, 254],      // Soft periwinkle
    glowColor: [99, 102, 241],      // Indigo glow (subtle)
  },
  education: {
    name: "Education",
    colorStart: [236, 254, 252],    // Mint-cyan
    colorMid: [240, 253, 250],      // Light mint
    colorEnd: [235, 250, 255],      // Ice blue
    glowColor: [20, 184, 166],      // Teal glow
  },
  certificates: {
    name: "Certificates",
    colorStart: [245, 243, 255],    // Pale lavender
    colorMid: [240, 249, 255],      // Sky blue
    colorEnd: [235, 250, 255],      // Light cyan
    glowColor: [139, 92, 246],      // Soft violet glow
  },
  contact: {
    name: "Contact",
    colorStart: [245, 247, 251],    // Return to hero colors
    colorMid: [236, 252, 255],
    colorEnd: [241, 245, 255],
    glowColor: [37, 99, 235],       // Hero blue glow
  }
}

// ========== ABOUT 3D MODEL (LEFT) ==========
const modelConfig = {
  about: { position: "Left", enabled: true },
}

// ========== ABOUT 3D MODEL (RIGHT) ==========


// ========== 3D SCENE CLASS ==========
class Section3DScene {
  constructor(container, position = "right") {
    this.container = container
    this.position = position
    this.opacity = 0
    this.targetOpacity = 0
        
    // Three.js setup
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(8, 0, 11)
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Create wrapper div
    this.wrapper = document.createElement("div")
    this.wrapper.className = `section-3d-scene section-3d-scene--${position}`
    this.wrapper.style.opacity = "0"
    this.wrapper.setAttribute("aria-hidden", "true")
    this.wrapper.appendChild(this.renderer.domElement)
    this.container.appendChild(this.wrapper)
    
    this.addLights()
    this.createCube()
    
    // Animation loop
    this.clock = new THREE.Clock()
    this.animate = this.animate.bind(this)
    this.renderer.setAnimationLoop(this.animate)
    
    // Resize handler
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
    
    // Accessibility: Check reduced motion preference
    this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    this.animationEnabled = !this.motionQuery.matches
    
  }
  
  addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    const directional = new THREE.DirectionalLight(0xffffff, 0.8)
    directional.position.set(10, 10, 8)
    this.scene.add(ambient, directional)
  }
  
  createCube() {
    // Using Octahedron for "About" section
    const geometry = new THREE.OctahedronGeometry(1.8, 0)
    
    const material = new THREE.MeshPhysicalMaterial({ 
      color: 0x7dd3fc,      // Sky Blue 300
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.2,    // Slightly more transparent
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    })
    this.model = new THREE.Mesh(geometry, material)
    
    // Position based on left/right
    if (this.position === "left") {
      this.model.position.x = -2
    } else {
      this.model.position.x = 2
    }
    
    this.scene.add(this.model)
  }
  
  handleResize() {
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
  
  setTargetOpacity(opacity) {
    this.targetOpacity = opacity
  }
  
  animate() {
    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()
    
    // Smooth opacity transition (lerp)
    const lerpSpeed = 0.08
    this.opacity += (this.targetOpacity - this.opacity) * lerpSpeed
    this.wrapper.style.opacity = this.opacity.toFixed(3)
    
    // Animate cube if enabled
    if (this.model && this.animationEnabled) {
      this.model.rotation.y += 0.3 * delta
      this.model.rotation.x += 0.15 * delta
      this.model.position.y = Math.sin(elapsed * 0.5) * 0.3
    }
    
    // Performance: Only render if visible
    if (this.opacity > 0.01) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  
  dispose() {
    this.renderer.setAnimationLoop(null)
    window.removeEventListener("resize", this.handleResize)
    this.renderer.dispose()
    if (this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper)
    }
  }
}

// ========== MAIN MANAGER CLASS ==========
class ScrollEffectsManager {
  constructor() {
    this.scenes = new Map()
    this.currentSection = "hero"
    
    // Current and target colors for smooth lerp transitions
    this.currentColors = {
      start: [245, 247, 251],
      mid: [236, 252, 255],
      end: [241, 245, 255],
      glow: [37, 99, 235]
    }
    this.targetColors = { ...this.currentColors }
    
    // Animation frame for color lerp
    this.animateColors = this.animateColors.bind(this)
    this.isAnimatingColors = false
    
    this.init()
  }
  
  init() {
    this.initializeSections()
    this.setupIntersectionObserver()
  }
  
  initializeSections() {
    Object.entries(modelConfig).forEach(([sectionId, config]) => {
      if (!config.enabled) return
      
      const section = document.getElementById(sectionId)
      if (section) {
        const scene = new Section3DScene(section, config.position)
        this.scenes.set(sectionId, scene)
      } else {
      }
    })
  }
  
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.2, 0.5, 0.8, 1.0]
    }
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.handleSectionChange(entry.target.id)
        }
      })
    }, options)
    
    document.querySelectorAll("section[id]").forEach(section => {
      this.observer.observe(section)
    })
  }
  
  handleSectionChange(sectionId) {
    if (sectionId === this.currentSection) return
    
    this.currentSection = sectionId
    
    this.updateBackgroundColors(sectionId)
    this.update3DModels(sectionId)
  }
  
  updateBackgroundColors(sectionId) {
    if (sectionId === 'hero') {
      this.targetColors = {
        start: [245, 247, 251],
        mid: [236, 252, 255],
        end: [241, 245, 255],
        glow: [37, 99, 235]
      }
      this.startColorAnimation()
      return
    }
    
    const theme = backgroundThemes[sectionId]
    if (!theme) {
      return
    }
    
    // Set target colors (will lerp smoothly to these)
    this.targetColors = {
      start: theme.colorStart,
      mid: theme.colorMid,
      end: theme.colorEnd,
      glow: theme.glowColor
    }
    
    this.startColorAnimation()
  }
  
  startColorAnimation() {
    if (!this.isAnimatingColors) {
      this.isAnimatingColors = true
      this.animateColors()
    }
  }
  
  animateColors() {
    if (!this.isAnimatingColors) return
    
    const lerpSpeed = 0.05  // Slower = smoother (like 3D model fade)
    let hasChanged = false
    
    // Lerp each color component (start, mid, end, glow)
    const keys = ['start', 'mid', 'end', 'glow']
    keys.forEach(key => {
      for (let i = 0; i < 3; i++) {  // RGB (3 components)
        const current = this.currentColors[key][i]
        const target = this.targetColors[key][i]
        const diff = Math.abs(current - target)
        
        if (diff > 0.5) {
          this.currentColors[key][i] += (target - current) * lerpSpeed
          hasChanged = true
        } else {
          this.currentColors[key][i] = target  // Snap to final value
        }
      }
    })
    
    // Update CSS variables with current (lerped) colors
    document.body.style.setProperty('--color-start', `rgb(${this.currentColors.start.map(Math.round).join(', ')})`)
    document.body.style.setProperty('--color-mid', `rgb(${this.currentColors.mid.map(Math.round).join(', ')})`)
    document.body.style.setProperty('--color-end', `rgb(${this.currentColors.end.map(Math.round).join(', ')})`)
    document.body.style.setProperty('--glow-color', `rgb(${this.currentColors.glow.map(Math.round).join(', ')})`)
    
    // Continue animating if colors are still changing
    if (hasChanged) {
      requestAnimationFrame(this.animateColors)
    } else {
      this.isAnimatingColors = false
    }
  }
  
  update3DModels(sectionId) {
    // Fade out all models
    this.scenes.forEach((scene) => {
      scene.setTargetOpacity(0)
    })
    
    // Fade in current section's model (if it has one)
    const currentScene = this.scenes.get(sectionId)
    if (currentScene) {
      currentScene.setTargetOpacity(1)
      console.log(`✨ 3D Model → ${sectionId} (visible)`)
    }
  }
  
  dispose() {
    this.observer.disconnect()
    this.scenes.forEach(scene => scene.dispose())
    this.scenes.clear()
  }
}

// ========== EXPORT ==========
export function initScrollEffects() {
  // Only initialize once
  if (window.scrollEffectsManager) {
    return
  }
  
  window.scrollEffectsManager = new ScrollEffectsManager()
}

