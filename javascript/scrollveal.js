import ScrollReveal from "scrollreveal"

const defaultProps = {
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  distance: "30px",
  origin: "bottom",
  duration: 1000,
  desktop: true,
  mobile: true,
}

export function initScrollReveal() {
  const sr = ScrollReveal()

  // Hero Section
  sr.reveal(".hero-title", {
    ...defaultProps,
    delay: 500,
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })
  sr.reveal(".name", {
    ...defaultProps,
    distance: "0px",
    delay: 700,
    scale: 0,
  })
  sr.reveal(".hero-cta", {
    ...defaultProps,
    delay: 1200,
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })
  sr.reveal(".scroll-down-link", {
    ...defaultProps,
    delay: 2000,
    origin: "top",
  })

  // About Section
  sr.reveal(".section-title", {
    ...defaultProps,
    delay: 400,
    distance: "0px",
  })
  sr.reveal(".about-wrapper__image", {
    ...defaultProps,
    delay: 600,
    scale: 0.5,
  })

  sr.reveal(".about-wrapper__info", {
    ...defaultProps,
    delay: 700,
    distance: "100px",
    origin: window.innerWidth > 768 ? "left" : "top",
  })

  // Projects Section
  sr.reveal(".project-wrapper__text", {
    ...defaultProps,
    delay: 600,
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })

  sr.reveal(".project-wrapper__image", {
    ...defaultProps,
    delay: 600,
    scale: 0.9,
    origin: window.innerWidth > 768 ? "right" : "bottom",
  })

  // Contact Section
  sr.reveal(".contact-wrapper", {
    ...defaultProps,
    delay: 600,
  })

  sr.reveal(".fa", {
    ...defaultProps,
    delay: 500,
    interval: 100,
  })
}
