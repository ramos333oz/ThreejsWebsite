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
  sr.reveal(".hero__eyebrow", {
    ...defaultProps,
    delay: 200,
    distance: "10px",
    origin: "top",
  })

  sr.reveal(".hero-title", {
    ...defaultProps,
    delay: 300,
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })

  sr.reveal(".hero__subtitle", {
    ...defaultProps,
    delay: 450,
    distance: "40px",
  })

  sr.reveal(".hero-cta", {
    ...defaultProps,
    delay: 600,
    distance: "40px",
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })

  sr.reveal(".hero__highlights li", {
    ...defaultProps,
    delay: 700,
    interval: 120,
    origin: window.innerWidth > 768 ? "right" : "bottom",
  })

  sr.reveal(".scroll-down-link", {
    ...defaultProps,
    delay: 900,
    origin: "top",
  })

  // About Section
  sr.reveal("#about .section-title", {
    ...defaultProps,
    delay: 200,
    distance: "0px",
  })

  sr.reveal(".about-wrapper__image", {
    ...defaultProps,
    delay: 300,
    scale: 0.95,
  })

  sr.reveal(".about-wrapper__info", {
    ...defaultProps,
    delay: 400,
    distance: "60px",
    origin: window.innerWidth > 768 ? "right" : "bottom",
  })

  sr.reveal(".about-pill", {
    ...defaultProps,
    delay: 550,
    interval: 120,
    distance: "20px",
  })

  // Skills Section
  sr.reveal(".skills-card", {
    ...defaultProps,
    delay: 200,
    interval: 120,
    distance: "35px",
    origin: window.innerWidth > 768 ? "bottom" : "bottom",
  })

  // Projects Section
  sr.reveal(".project-card", {
    ...defaultProps,
    delay: 200,
    interval: 160,
    distance: "60px",
    origin: window.innerWidth > 768 ? "left" : "bottom",
  })

  sr.reveal(".project-wrapper__image", {
    ...defaultProps,
    delay: 320,
    interval: 160,
    scale: 0.95,
    origin: window.innerWidth > 768 ? "right" : "bottom",
  })

  // Education Section
  sr.reveal(".timeline__item", {
    ...defaultProps,
    delay: 240,
    interval: 140,
    distance: "45px",
  })

  // Certificates Section
  sr.reveal(".certificate-card", {
    ...defaultProps,
    delay: 200,
    interval: 110,
    distance: "40px",
    origin: window.innerWidth > 768 ? "bottom" : "bottom",
  })

  // Contact Section
  sr.reveal(".contact-wrapper__text", {
    ...defaultProps,
    delay: 200,
    distance: "30px",
  })

  sr.reveal(".contact-wrapper__channels", {
    ...defaultProps,
    delay: 320,
    distance: "20px",
    origin: "top",
  })

  sr.reveal(".social-links a", {
    ...defaultProps,
    delay: 200,
    interval: 100,
    distance: "20px",
  })
}
