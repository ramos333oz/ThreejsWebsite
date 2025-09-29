import "./css/main.css"
import { initScrollReveal } from "./javascript/scrollveal"
import { initTilt } from "./javascript/valtilt"
import { initLogoViewers } from "./javascript/logo-viewer"

initScrollReveal()
initTilt()
initLogoViewers()

const footerYear = document.getElementById("year")
if (footerYear) {
  footerYear.textContent = new Date().getFullYear()
}

