import * as THREE from "three"

// This class handles everything for our background 3D scene
class BackgroundScene {
  constructor(container) {
    // Store the HTML container where we'll put the canvas
    this.container = container
    
    // Step 1: Create a Three.js Scene (like an empty 3D world)
    this.scene = new THREE.Scene()
    console.log("âœ… Step 1: Scene created")
    
    // Step 2: Create a Camera (this is our "eyes" looking at the scene)
    this.camera = new THREE.PerspectiveCamera(
      45,                                  // Field of view (how wide we can see)
      window.innerWidth / window.innerHeight,  // Aspect ratio (screen shape)
      0.1,                                 // Near clipping (how close we can see)
      100                                  // Far clipping (how far we can see)
    )
    // Move camera back so we can see the objects
    this.camera.position.set(0, 0, 15)  // x=0 (center), y=0 (center), z=15 (back)
    console.log("âœ… Step 2: Camera created at position:", this.camera.position)

    // Step 3: Create a Renderer (this draws the 3D scene onto a 2D canvas)
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,      // Smooth edges
      alpha: true           // Transparent background (so gradient shows through)
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)  // Transparent black (0 = fully transparent)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    console.log("âœ… Step 3: Renderer created")
    
    // Step 4: Add the canvas to our HTML container
    this.domElement = this.renderer.domElement  // This is the <canvas> element
    this.container.appendChild(this.domElement)
    console.log("âœ… Step 4: Canvas added to container")

    // Step 5: Create Groups to hold our left and right objects
    this.leftGroup = new THREE.Group()   // Group for left cube
    this.rightGroup = new THREE.Group()  // Group for right cube
    this.scene.add(this.leftGroup, this.rightGroup)
    console.log("âœ… Step 5: Groups created and added to scene")

    // Step 6: Position the groups (where they'll appear on screen)
    this.leftGroup.position.set(-8, 2, 0)   // Left side: x=-8, up a bit: y=2
    this.rightGroup.position.set(8, -1, 0)  // Right side: x=8, down a bit: y=-1
    
    // Step 6b: Setup entry animation (slide down from top)
    this.isAnimatingEntry = true           // Flag: "entry animation is running"
    this.entryAnimationDuration = 1.5      // Animation length in seconds
    this.entryAnimationTime = 0            // Current progress time
    this.floatingStartTime = 0             // Will store when floating animation starts

    // Store final positions (where cubes should end up)
    this.leftFinalY = 2                    // Left cube final Y position
    this.rightFinalY = -1                  // Right cube final Y position

    // Store starting positions (above screen, out of view)
    this.leftStartY = 15                   // Start way above
    this.rightStartY = 15                  // Start way above

    // Set cubes to their starting positions (above screen)
    this.leftGroup.position.y = this.leftStartY
    this.rightGroup.position.y = this.rightStartY
    
    console.log("✅ Step 6: Groups positioned")
    console.log("   Left cube will slide from Y=" + this.leftStartY + " to Y=" + this.leftFinalY)
    console.log("   Right cube will slide from Y=" + this.rightStartY + " to Y=" + this.rightFinalY)

    // Step 7: Add lights so we can see the cubes
    this.addLights()
    
    // Step 8: Create the actual cube objects
    this.createCubes()
    
    // Step 9: Handle window resize
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener("resize", this.handleResize)
    console.log("âœ… Step 9: Resize handler added")

    // Step 10: Start the animation loop
    this.clock = new THREE.Clock()
    this.animate = this.animate.bind(this)
    this.renderer.setAnimationLoop(this.animate)
    console.log("âœ… Step 10: Animation loop started")
    
    console.log("ðŸŽ‰ Background scene fully initialized!")
  }

  addLights() {
    // Add basic ambient light (lights everything equally)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    // Add directional light from top-right (like sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 8)
    this.scene.add(directionalLight)
    
    console.log("âœ… Step 7: Lights added")
  }

  createCubes() {
    // LEFT CUBE
    // Step 1: Create geometry (the shape)
    const leftGeometry = new THREE.BoxGeometry(2, 2, 2)  // 2x2x2 cube
    
    // Step 2: Create material (how it looks) - Using MeshNormalMaterial for prototype
    // MeshNormalMaterial shows colors based on surface direction - great for testing!
    const leftMaterial = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.8
    })
    
    // Step 3: Create mesh (geometry + material = visible object)
    this.leftCube = new THREE.Mesh(leftGeometry, leftMaterial)
    
    // Step 4: Add to left group
    this.leftGroup.add(this.leftCube)
    console.log("âœ… Left cube created with MeshNormalMaterial")

    // RIGHT CUBE (same process)
    const rightGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)  // Slightly smaller
    const rightMaterial = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.8
    })
    this.rightCube = new THREE.Mesh(rightGeometry, rightMaterial)
    this.rightCube.rotation.set(0.5, 0.5, 0)  // Rotate it a bit for variety
    this.rightGroup.add(this.rightCube)
    console.log("âœ… Right cube created with MeshNormalMaterial")
    
    console.log("âœ… Step 8: Both cubes created with prototype material")
  }

  // Easing function for smooth motion (not linear/robotic)
  easeOutCubic(t) {
    // Makes the cube slow down as it reaches the end
    // Fast at start → slower at end (like a ball rolling to a stop)
    return 1 - Math.pow(1 - t, 3)
  }

  handleResize() {
    // Update camera aspect ratio when window resizes
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    
    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate() {
    // This function runs every frame (about 60 times per second)
    
    const delta = this.clock.getDelta()    // Time since last frame
    const elapsed = this.clock.getElapsedTime()  // Total time since start

    // ========================================
    // ENTRY ANIMATION (only runs at page load)
    // ========================================
    if (this.isAnimatingEntry) {
      // Increase the animation timer
      this.entryAnimationTime += delta
      
      // Calculate progress (0.0 = start, 1.0 = finished)
      let progress = this.entryAnimationTime / this.entryAnimationDuration
      progress = Math.min(progress, 1.0)  // Cap at 100%
      
      // Apply easing for smooth motion
      const easedProgress = this.easeOutCubic(progress)
      
      // LEFT CUBE - Slide down
      // Formula: currentY = startY + (finalY - startY) * progress
      this.leftGroup.position.y = this.leftStartY + (this.leftFinalY - this.leftStartY) * easedProgress
      
      // RIGHT CUBE - Slide down with slight delay (stagger effect)
      const rightDelay = 0.13  // 0.13 second delay
      const rightProgress = Math.max(0, progress - rightDelay)
      const rightEasedProgress = this.easeOutCubic(rightProgress)
      this.rightGroup.position.y = this.rightStartY + (this.rightFinalY - this.rightStartY) * rightEasedProgress
      
      // Check if BOTH animations finished (including right cube's delay)
      // Right cube finishes at: duration + delay = 1.5 + 0.13 = 1.63 seconds
      const totalDuration = this.entryAnimationDuration + rightDelay
      if (this.entryAnimationTime >= totalDuration) {
        this.isAnimatingEntry = false  // Stop entry animation
        this.floatingStartTime = elapsed  // Record when floating starts
        
        // Force both cubes to exact final positions (no rounding errors)
        this.leftGroup.position.y = this.leftFinalY
        this.rightGroup.position.y = this.rightFinalY
        
        console.log("✅ Entry animation complete! Starting floating at time:", elapsed)
      }
      
      // Still apply rotation during entry
      this.leftGroup.rotation.y += 0.2 * delta
      this.rightGroup.rotation.y -= 0.15 * delta
    }
    // ========================================
    // NORMAL ANIMATION (floating, after entry is done)
    // ========================================
    else {
      // Calculate time SINCE floating started (not total time)
      const floatingTime = elapsed - this.floatingStartTime
      
      // LEFT CUBE: Float up and down using sine wave (starts at 0)
      // Math.sin(0) = 0, so starts at exact final position
      this.leftGroup.position.y = this.leftFinalY + Math.sin(floatingTime * 0.5) * 0.5
      this.leftGroup.rotation.y += 0.2 * delta
      
      // RIGHT CUBE: Float using sine wave (different speed for variety)
      // Use Math.sin() so it starts at 0 (no jump!)
      // Different multiplier (0.4 vs 0.5) makes it float at different speed
      this.rightGroup.position.y = this.rightFinalY + Math.sin(floatingTime * 0.4) * 0.6
      this.rightGroup.rotation.y -= 0.15 * delta
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera)
  }

  // Cleanup method (good practice)
  dispose() {
    this.renderer.setAnimationLoop(null)
    window.removeEventListener("resize", this.handleResize)
    this.renderer.dispose()
    console.log("âœ… Background scene disposed")
  }
}

// Export function to initialize the scene
export function initBackgroundScene() {
  console.log("ðŸš€ Initializing background scene...")
  
  // Find the hero section
  const heroSection = document.getElementById("hero")
  if (!heroSection) {
    console.error("âŒ Hero section not found!")
    return
  }
  console.log("âœ… Hero section found:", heroSection)

  // Create a container div for the Three.js canvas
  const container = document.createElement("div")
  container.className = "hero-background-scene"
  container.setAttribute("aria-hidden", "true")  // Hide from screen readers
  
  // Insert at the beginning of hero section (so it's behind content)
  heroSection.insertBefore(container, heroSection.firstChild)
  console.log("âœ… Container created and inserted into hero")

  // Create the background scene
  const bgScene = new BackgroundScene(container)
  
  // Store globally so we can access it later
  window.backgroundScene = bgScene
  
  return bgScene
}
