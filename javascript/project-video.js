/**
 * Project Video Scroll Handler
 * Handles video autoplay when projects section enters viewport
 */

export function initProjectVideo() {
  const projectsSection = document.getElementById("projects")
  if (!projectsSection) return

  const video = projectsSection.querySelector(".project-video")
  if (!video) return

  // Check if video is already initialized
  if (video.dataset.initialized === "true") return

  // Mark as initialized
  video.dataset.initialized = "true"

  // Ensure video is set up correctly
  video.muted = true
  video.loop = true
  video.playsInline = true

  // Function to attempt video playback
  const attemptPlay = () => {
    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video started playing successfully
          video.style.opacity = "1"
          console.log("Video playback started")
        })
        .catch((error) => {
          // Autoplay was prevented (browser policy)
          console.warn("Video autoplay prevented:", error)
          // Try again after user interaction
          document.addEventListener(
            "click",
            () => {
              video.play().catch((e) => console.warn("Play failed:", e))
            },
            { once: true }
          )
        })
    }
  }

  // Wait for video to be ready
  if (video.readyState >= 2) {
    // Video is already loaded enough
    attemptPlay()
  } else {
    // Wait for video to load
    video.addEventListener(
      "loadeddata",
      () => {
        attemptPlay()
      },
      { once: true }
    )

    // Also try when metadata is loaded
    video.addEventListener(
      "loadedmetadata",
      () => {
        attemptPlay()
      },
      { once: true }
    )
  }

  // Intersection Observer options - more lenient threshold
  const observerOptions = {
    root: null, // Use viewport as root
    rootMargin: "0px", // No margin offset
    threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0] // Multiple thresholds for better detection
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        // Section is visible - start video playback
        attemptPlay()
      } else if (!entry.isIntersecting) {
        // Section is not visible - pause video for performance
        video.pause()
        // Reset to beginning for next time
        video.currentTime = 0
      }
    })
  }, observerOptions)

  // Start observing the projects section
  observer.observe(projectsSection)

  // Also observe the video element directly for more precise control
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          attemptPlay()
        } else if (!entry.isIntersecting) {
          video.pause()
          video.currentTime = 0
        }
      })
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.2, 0.5, 1.0],
    }
  )

  videoObserver.observe(video)

  // Cleanup function (for potential future use)
  return () => {
    observer.disconnect()
    videoObserver.disconnect()
  }
}

