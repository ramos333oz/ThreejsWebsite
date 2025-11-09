/**
 * Project Image Slider Handler
 * Handles automatic image sliding for project cards when scrolled into viewport
 */

function initializeSlider(sliderContainer) {
  // Check if slider is already initialized
  if (sliderContainer.dataset.initialized === "true") return

  // Mark as initialized
  sliderContainer.dataset.initialized = "true"

  const images = sliderContainer.querySelectorAll(".slider-image")
  if (!images.length || images.length < 2) return

  let currentIndex = 0
  let intervalId = null

  // Function to cycle to next image
  const cycleImages = () => {
    // Remove active class from current image
    images[currentIndex].classList.remove("active")

    // Move to next image (loop back to 0 if at end)
    currentIndex = (currentIndex + 1) % images.length

    // Add active class to next image
    images[currentIndex].classList.add("active")
  }

  // Intersection Observer to start/stop slider based on visibility
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.2, 0.5, 1.0],
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
        // Slider is visible - start the interval
        if (!intervalId) {
          // Ensure first image is active
          images.forEach((img, index) => {
            if (index === 0) {
              img.classList.add("active")
            } else {
              img.classList.remove("active")
            }
          })
          currentIndex = 0

          // Start cycling every 5 seconds
          intervalId = setInterval(cycleImages, 5000)
        }
      } else if (!entry.isIntersecting) {
        // Slider is not visible - stop the interval
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      }
    })
  }, observerOptions)

  // Start observing the slider container
  observer.observe(sliderContainer)

  // Return cleanup function
  return () => {
    observer.disconnect()
    if (intervalId) {
      clearInterval(intervalId)
    }
  }
}

export function initProjectSlider() {
  const projectsSection = document.getElementById("projects")
  if (!projectsSection) return

  // Get all slider containers
  const sliderContainers = projectsSection.querySelectorAll(".thumbnail.has-slider")
  if (!sliderContainers.length) return

  // Initialize each slider separately
  sliderContainers.forEach((container) => {
    initializeSlider(container)
  })
}

