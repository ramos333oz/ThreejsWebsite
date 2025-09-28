import "./css/main.css"
import { initScrollReveal } from "./javascript/scrollveal"
import { initTilt } from "./javascript/valtilt"

initScrollReveal()
initTilt()

const footerYear = document.getElementById("year")
if (footerYear) {
  footerYear.textContent = new Date().getFullYear()
}

