import "./css/main.css"
import { initScrollReveal } from "./javascript/scrollveal"
import { initTilt } from "./javascript/valtilt"
import { initLogoViewers } from "./javascript/logo-viewer"
import { initBackgroundScene } from "./javascript/background-scene"
import { initScrollEffects } from "./javascript/scroll-effects-manager"  // NEW

initScrollReveal()
initTilt()
initLogoViewers()
initBackgroundScene()  // Initialize 3D background cubes
initScrollEffects()    // NEW - Initialize scroll-triggered features (About section only for testing)

const footerYear = document.getElementById("year")
if (footerYear) {
  footerYear.textContent = new Date().getFullYear()
}

