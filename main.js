import "./css/main.css"
import { initScrollReveal } from "./javascript/scrollveal"
import { initTilt } from "./javascript/valtilt"

initScrollReveal()
initTilt()

document.getElementById("year").textContent = new Date().getFullYear()

