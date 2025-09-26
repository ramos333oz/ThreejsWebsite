import VanillaTilt from "vanilla-tilt"

export function initTilt() {
  const tilt = document.querySelectorAll(".rounded")
  if (!tilt.length) {
    return
  }

  VanillaTilt.init(tilt, {
    max: 3,
    speed: 500,
    scale: 1.05,
    glare: true,
    "max-glare": 0.3,
  })
}
