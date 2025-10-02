import "./css/main.css"
import { initScrollReveal } from "./javascript/scrollveal"
import { initTilt } from "./javascript/valtilt"
import { initLogoViewers } from "./javascript/logo-viewer"
import { initBackgroundScene } from "./javascript/background-scene"

initScrollReveal()
initTilt()
initLogoViewers()
initBackgroundScene()  // Initialize 3D background cubes

const footerYear = document.getElementById("year")
if (footerYear) {
  footerYear.textContent = new Date().getFullYear()
}

