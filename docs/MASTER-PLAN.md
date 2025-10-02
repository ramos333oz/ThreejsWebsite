# 🎨 MASTER PLAN: Scroll-Triggered Features

**Project**: Portfolio Website Enhancement  
**Date**: October 2, 2025  
**Status**: Ready for Implementation  
**Time**: 6-8 hours total

---

## 📋 TWO CONNECTED FEATURES

### Feature 1: Background Color Transitions
- Gradient colors change per section
- **Option 3: Complementary Pairs** (Cool → Warm → Cool → Warm)
- Smooth 1.2s transitions using CSS variables

### Feature 2: 3D Models per Section  
- Rotating cubes fade in/out based on scroll
- Alternate LEFT → RIGHT → LEFT positioning
- **Testing Phase**: Use Three.js BoxGeometry (simple cubes)

**Both features use ONE Intersection Observer**  
**Both triggered by same scroll detection**  
**Both optimized for 60 FPS performance**

---

## 🎯 USER EXPERIENCE

```
┌────────────────────────────────────────┐
│ 🏠 HERO                                │
│ BG: STAYS SAME (current blue gradient)│
│ 3D: Background cubes (existing - keep) │
│ ✅ NO CHANGES - Already perfect        │
└────────────────────────────────────────┘
      ↓ scroll down ↓ COLOR TRANSITIONS START HERE
┌────────────────────────────────────────┐
│ 👤 ABOUT                               │
│ BG: Purple → Pink (🔥 warm)            │
│ 3D: Cube on LEFT (fades in)           │
└────────────────────────────────────────┘
      ↓ scroll down
┌────────────────────────────────────────┐
│ 💻 SKILLS                              │
│ BG: Teal → Mint (❄️ cool)             │
│ 3D: Cube on RIGHT (fades in)          │
└────────────────────────────────────────┘
      ↓ scroll down
┌────────────────────────────────────────┐
│ 📁 PROJECTS                            │
│ BG: Coral → Peach (🔥 warm)            │
│ 3D: Cube on LEFT (fades in)           │
└────────────────────────────────────────┘
      ↓ scroll down
┌────────────────────────────────────────┐
│ 🎓 EDUCATION                           │
│ BG: Sky → Ice (❄️ cool)               │
│ 3D: Cube on RIGHT (fades in)          │
└────────────────────────────────────────┘
      ↓ scroll down
┌────────────────────────────────────────┐
│ 🏆 CERTIFICATES                        │
│ BG: Lavender → Lilac (🔥 warm)         │
│ 3D: Cube on LEFT (fades in)           │
└────────────────────────────────────────┘
      ↓ scroll down ↓ BACK TO HERO COLORS
┌────────────────────────────────────────┐
│ 📧 CONTACT                             │
│ BG: Blue → Cyan (return to hero)      │
│ 3D: Logo viewers (existing - keep)    │
└────────────────────────────────────────┘
```

---

## 🎨 COLOR SCHEME (Option 3)

**IMPORTANT**: Hero section keeps its current colors (no changes)

| Section | Colors | RGB Start | RGB Mid | RGB End | Glow RGB | Notes |
|---------|--------|-----------|---------|---------|----------|-------|
| **Hero** | **NO CHANGE** | - | - | - | - | ✅ Keep current SCSS gradient |
| About | Purple-Pink | 251,245,255 | 252,231,255 | 255,233,245 | 124,58,237 | 🔥 First transition |
| Skills | Teal-Mint | 240,253,250 | 236,254,255 | 240,249,255 | 34,211,238 | ❄️ Cool |
| Projects | Coral-Peach | 255,245,245 | 255,241,242 | 255,251,235 | 249,115,22 | 🔥 Warm |
| Education | Sky-Ice | 240,249,255 | 224,242,254 | 240,253,250 | 14,165,233 | ❄️ Cool |
| Certificates | Lavender | 250,245,255 | 245,243,255 | 251,241,255 | 168,85,247 | 🔥 Warm |
| Contact | Blue (return) | 245,247,251 | 236,252,255 | 241,245,255 | 37,99,235 | ❄️ Return to hero colors |

---

## 📁 FILES TO CREATE/UPDATE

### NEW FILES (3)
1. `javascript/scroll-effects-manager.js` (Main implementation)
2. `style/sections/_section-scenes.scss` (3D positioning)
3. `docs/MASTER-PLAN.md` (This file - your reference)

### UPDATE FILES (3)
1. `style/base/_base.scss` (Add CSS variables)
2. `style/main.scss` (Import new SCSS)
3. `main.js` (Initialize manager)

---

## 🔧 IMPLEMENTATION STEPS

### STEP 1: Create Manager (1-2 hours)

**File**: `javascript/scroll-effects-manager.js`

**Contents**: See full code in detailed section below

**Key Points**:
- ScrollEffectsManager class (main)
- Section3DScene class (inner - manages each cube)
- backgroundThemes object (7 color schemes)
- modelConfig object (which sections get cubes)
- Intersection Observer (watches all sections)

### STEP 2: Update Styles (30 mins)

**File**: `style/base/_base.scss`

**IMPORTANT**: Keep the existing `background: $body-bg-gradient;` line initially. The CSS variables will override it when scrolling to other sections.

**Add CSS variables** (these will be updated by JavaScript):
```scss
body {
  // Keep existing: background: $body-bg-gradient;
  // This maintains hero section colors
  
  // CSS variables for dynamic color changes (updated by JS)
  --color-start: 245, 247, 251;  // Default matches hero
  --color-mid: 236, 252, 255;
  --color-end: 241, 245, 255;
  --glow-color: 37, 99, 235;
  
  // Note: Gradient stays as SCSS variable initially
  // Only switches to CSS variables when scrolling past hero
}
```

**File**: `style/sections/_section-scenes.scss`

**3D positioning**:
```scss
.section-3d-scene {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  
  &--left canvas { transform: translateX(-10%); }
  &--right canvas { transform: translateX(10%); }
}
```

### STEP 3: Wire It Up (15 mins)

**File**: `main.js`

```javascript
import { initScrollEffects } from "./javascript/scroll-effects-manager"

// Add after other inits
initScrollEffects()
```

**File**: `style/main.scss`

```scss
@import "./sections/section-scenes";  // Add this line
```

### STEP 4: Test (1 hour)

- [ ] Run `npm run dev`
- [ ] Scroll through all sections
- [ ] Check console logs
- [ ] Verify colors change smoothly
- [ ] Verify cubes fade in/out
- [ ] Test mobile responsiveness

---

## 💻 COMPLETE CODE

### `javascript/scroll-effects-manager.js` (Full File)

```javascript
import * as THREE from "three"

// ========== COLOR THEMES ==========
const backgroundThemes = {
  // NOTE: Hero section NOT included - it keeps current colors
  about: {
    name: "About",
    colorStart: [251, 245, 255],
    colorMid: [252, 231, 255],
    colorEnd: [255, 233, 245],
    glowColor: [124, 58, 237],
  },
  skills: {
    name: "Skills",
    colorStart: [240, 253, 250],
    colorMid: [236, 254, 255],
    colorEnd: [240, 249, 255],
    glowColor: [34, 211, 238],
  },
  projects: {
    name: "Projects",
    colorStart: [255, 245, 245],
    colorMid: [255, 241, 242],
    colorEnd: [255, 251, 235],
    glowColor: [249, 115, 22],
  },
  education: {
    name: "Education",
    colorStart: [240, 249, 255],
    colorMid: [224, 242, 254],
    colorEnd: [240, 253, 250],
    glowColor: [14, 165, 233],
  },
  certificates: {
    name: "Certificates",
    colorStart: [250, 245, 255],
    colorMid: [245, 243, 255],
    colorEnd: [251, 241, 255],
    glowColor: [168, 85, 247],
  },
  contact: {
    name: "Contact",
    colorStart: [245, 247, 251],
    colorMid: [236, 252, 255],
    colorEnd: [241, 245, 255],
    glowColor: [37, 99, 235],
  }
}

// ========== 3D MODEL CONFIG ==========
const modelConfig = {
  about: { position: "left", enabled: true },
  skills: { position: "right", enabled: true },
  projects: { position: "left", enabled: true },
  education: { position: "right", enabled: true },
  certificates: { position: "left", enabled: true },
}

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
    this.camera.position.set(0, 0, 8)
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Create wrapper
    this.wrapper = document.createElement("div")
    this.wrapper.className = `section-3d-scene section-3d-scene--${position}`
    this.wrapper.style.opacity = "0"
    this.wrapper.setAttribute("aria-hidden", "true")
    this.wrapper.appendChild(this.renderer.domElement)
    this.container.appendChild(this.wrapper)
    
    this.addLights()
    this.createCube()
    
    this.clock = new THREE.Clock()
    this.animate = this.animate.bind(this)
    this.renderer.setAnimationLoop(this.animate)
    
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
    
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
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
    const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.85 })
    this.model = new THREE.Mesh(geometry, material)
    
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
    
    // Smooth fade
    this.opacity += (this.targetOpacity - this.opacity) * 0.08
    this.wrapper.style.opacity = this.opacity.toFixed(3)
    
    // Animate cube
    if (this.model && this.animationEnabled) {
      this.model.rotation.y += 0.3 * delta
      this.model.rotation.x += 0.15 * delta
      this.model.position.y = Math.sin(elapsed * 0.5) * 0.3
    }
    
    // Only render if visible
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
    this.init()
  }
  
  init() {
    console.log("🚀 Initializing Scroll Effects Manager...")
    this.initializeSections()
    this.setupIntersectionObserver()
    console.log("✅ Scroll Effects Manager ready")
  }
  
  initializeSections() {
    Object.entries(modelConfig).forEach(([sectionId, config]) => {
      if (!config.enabled) return
      const section = document.getElementById(sectionId)
      if (section) {
        const scene = new Section3DScene(section, config.position)
        this.scenes.set(sectionId, scene)
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
    
    console.log(`📍 ${this.currentSection} → ${sectionId}`)
    this.currentSection = sectionId
    
    this.updateBackgroundColors(sectionId)
    this.update3DModels(sectionId)
  }
  
  updateBackgroundColors(sectionId) {
    // Skip hero section - it keeps its original colors
    if (sectionId === 'hero') {
      console.log(`🎨 Background → Hero (keeping original)`)
      return
    }
    
    const theme = backgroundThemes[sectionId]
    if (!theme) {
      console.warn(`⚠️  No theme for ${sectionId}`)
      return
    }
    
    // Switch body to use CSS variables
    if (!document.body.classList.contains('dynamic-bg')) {
      document.body.style.background = `linear-gradient(
        140deg,
        rgb(var(--color-start)),
        rgb(var(--color-mid)),
        rgb(var(--color-end))
      )`
      document.body.style.transition = 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      document.body.classList.add('dynamic-bg')
    }
    
    // Update CSS variables
    document.body.style.setProperty('--color-start', theme.colorStart.join(', '))
    document.body.style.setProperty('--color-mid', theme.colorMid.join(', '))
    document.body.style.setProperty('--color-end', theme.colorEnd.join(', '))
    document.body.style.setProperty('--glow-color', theme.glowColor.join(', '))
    
    console.log(`🎨 Background → ${theme.name}`)
  }
  
  update3DModels(sectionId) {
    this.scenes.forEach((scene) => scene.setTargetOpacity(0))
    
    const currentScene = this.scenes.get(sectionId)
    if (currentScene) {
      currentScene.setTargetOpacity(1)
      console.log(`✨ 3D → ${sectionId}`)
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
  if (window.scrollEffectsManager) {
    console.warn("⚠️  Already initialized")
    return
  }
  window.scrollEffectsManager = new ScrollEffectsManager()
}
```

---

## ✅ TESTING CHECKLIST

### Phase 1: Basic Functionality
- [ ] Page loads without errors
- [ ] Console shows "Scroll Effects Manager ready"
- [ ] **Hero section stays UNCHANGED** (current gradient + cubes)
- [ ] Scroll to About → Background changes to purple (first transition)
- [ ] Scroll to Skills → Background changes to teal
- [ ] Cube appears in About (left side)
- [ ] Cube appears in Skills (right side)
- [ ] NO cube in Hero section (existing cubes remain)

### Phase 2: Smoothness
- [ ] Background colors fade smoothly (no jumps)
- [ ] Cubes fade in smoothly (~1 second)
- [ ] Cubes fade out smoothly when leaving section
- [ ] Cubes rotate continuously
- [ ] Cubes float up/down (sine wave)

### Phase 3: Performance
- [ ] No lag during scroll
- [ ] 60 FPS maintained (check DevTools)
- [ ] Mobile: Cubes scale down appropriately
- [ ] Reduced motion: Animations disabled

---

## 🎯 SUCCESS CRITERIA

✅ Background colors change for all 7 sections  
✅ 3D cubes fade in/out smoothly  
✅ Left/right positioning alternates  
✅ Maintains 60 FPS on desktop  
✅ Works on mobile (responsive)  
✅ Respects reduced motion preference  
✅ Glassmorphism cards look premium with all colors

---

## 🚀 NEXT STEPS

1. **Implement** (follow steps above)
2. **Test** (use checklist)
3. **Build** (`npm run build`)
4. **Deploy**

### **KEY REMINDER**:
- ✅ **Hero section**: Keep everything as-is (colors + existing cubes)
- ✅ **About → Contact**: Apply new features (colors + new cubes)
- ✅ Color transitions start from About section
- ✅ Hero cubes from `background-scene.js` stay untouched

5. **FUTURE**: Replace test cubes with custom GLB models
   - About: Abstract sculpture
   - Skills: Network nodes
   - Projects: Blueprint wireframe
   - Education: Book stack
   - Certificates: Trophy/medal

---

**This is your single source of truth. Refer back here for all implementation details.** 🎨

