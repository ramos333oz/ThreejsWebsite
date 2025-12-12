
export function initProjectDecorations() {
  const projectsSection = document.getElementById("projects")
  if (!projectsSection) return

  const football = document.querySelector(".proj-dec-football")
  const permit = document.querySelector(".proj-dec-permit")
  const microchip = document.querySelector(".proj-dec-microchip")

  if (!football || !permit) return

  // State for Smooth Animation (Lerp)
  // We track current visual state vs target scroll state
  const state = {
    football: {
      currentX: -20, targetX: -20,
      currentRot: 0, targetRot: 0,
      opacity: 0, targetOpacity: 0
    },
    permit: {
      currentX: 0, targetX: 0,
      currentRot: 0, targetRot: 0,
      opacity: 0, targetOpacity: 0
    },
    microchip: {
      currentX: -20, targetX: -20,
      currentRot: 0, targetRot: 0,
      opacity: 0, targetOpacity: 0
    }
  }

  // LERP Helper
  const lerp = (start, end, factor) => start + (end - start) * factor

  function update() {
    // 1. Calculate Targets based on Scroll
    const rect = projectsSection.getBoundingClientRect()
    const sectionTop = rect.top
    const sectionHeight = rect.height
    const windowHeight = window.innerHeight

    const totalDistance = windowHeight + sectionHeight
    const currentPos = windowHeight - sectionTop
    let progress = currentPos / totalDistance
    progress = Math.max(0, Math.min(1, progress))

    // --- FOOTBALL (Active 0.0 - 0.55) ---
    if (progress < 0.6) {
      if (progress < 0.15) {
        // FAST Entry
        const p = progress / 0.15
        state.football.targetX = -20 + (30 * p) // -20 to 10
        state.football.targetRot = p * 10
      } else if (progress < 0.35) {
        // Hold
        const p = (progress - 0.15) / 0.2
        state.football.targetX = 10 + (5 * p) // 10 to 15
        state.football.targetRot = 10 + (p * 5)
      } else {
        // Exit
        const p = (progress - 0.35) / 0.15
        state.football.targetX = 15 - (35 * p) // 15 to -20
        state.football.targetRot = 15 + (p * 15)
      }
      state.football.targetOpacity = 1
    } else {
      state.football.targetOpacity = 0
    }

    // --- PERMIT (Active 0.3 - 0.8) ---
    if (progress > 0.3 && progress < 0.8) {
      const busProgress = (progress - 0.3) / 0.45 
      
      if (busProgress < 0.33) {
        // Enter
        const p = busProgress / 0.33
        state.permit.targetX = -30 * p 
        state.permit.targetRot = -10 * p
      } else if (busProgress < 0.66) {
        // Hold
        const p = (busProgress - 0.33) / 0.33
        state.permit.targetX = -30 + (-5 * p) 
        state.permit.targetRot = -10 + (-5 * p)
      } else {
        // Exit
        const p = (busProgress - 0.66) / 0.34
        state.permit.targetX = -35 + (35 * p) 
        state.permit.targetRot = -15 + (15 * p)
      }
      state.permit.targetOpacity = 1
    } else {
      state.permit.targetOpacity = 0
    }

    // --- MICROCHIP (Active 0.6 - 1.0) ---
    if (microchip) {
      if (progress > 0.6) {
        const chipProgress = (progress - 0.6) / 0.4
        
        if (chipProgress < 0.375) {
          // Enter
          const p = chipProgress / 0.375
          state.microchip.targetX = -20 + (30 * p)
          state.microchip.targetRot = p * 15
        } else if (chipProgress < 0.75) {
          // Hold
          const p = (chipProgress - 0.375) / 0.375
          state.microchip.targetX = 10 + (5 * p)
          state.microchip.targetRot = 15 + (p * 5)
        } else {
          // Exit
          const p = (chipProgress - 0.75) / 0.25
          state.microchip.targetX = 15 - (35 * p)
          state.microchip.targetRot = 20 + (p * 20)
        }
        state.microchip.targetOpacity = 1
      } else {
        state.microchip.targetOpacity = 0
      }
    }

    // 2. Smooth Values (Lerp)
    const factor = 0.08 // Smoothness (Lower = smoother/slower)

    // Football
    state.football.currentX = lerp(state.football.currentX, state.football.targetX, factor)
    state.football.currentRot = lerp(state.football.currentRot, state.football.targetRot, factor)
    state.football.opacity = lerp(state.football.opacity, state.football.targetOpacity, 0.1) // Faster opacity

    // Permit
    state.permit.currentX = lerp(state.permit.currentX, state.permit.targetX, factor)
    state.permit.currentRot = lerp(state.permit.currentRot, state.permit.targetRot, factor)
    state.permit.opacity = lerp(state.permit.opacity, state.permit.targetOpacity, 0.1)

    // Microchip
    if (microchip) {
      state.microchip.currentX = lerp(state.microchip.currentX, state.microchip.targetX, factor)
      state.microchip.currentRot = lerp(state.microchip.currentRot, state.microchip.targetRot, factor)
      state.microchip.opacity = lerp(state.microchip.opacity, state.microchip.targetOpacity, 0.1)
    }

    // 3. Apply to DOM
    // Only apply if opacity is visible to save layout thrashing
    if (state.football.opacity > 0.01) {
      football.style.transform = `translateX(${state.football.currentX.toFixed(2)}vw) rotate(${state.football.currentRot.toFixed(2)}deg)`
      football.style.opacity = state.football.opacity.toFixed(2)
    } else {
      football.style.opacity = "0"
    }

    if (state.permit.opacity > 0.01) {
      permit.style.transform = `translateX(${state.permit.currentX.toFixed(2)}vw) rotate(${state.permit.currentRot.toFixed(2)}deg)`
      permit.style.opacity = state.permit.opacity.toFixed(2)
    } else {
      permit.style.opacity = "0"
    }

    if (microchip) {
      if (state.microchip.opacity > 0.01) {
        microchip.style.transform = `translateX(${state.microchip.currentX.toFixed(2)}vw) rotate(${state.microchip.currentRot.toFixed(2)}deg)`
        microchip.style.opacity = state.microchip.opacity.toFixed(2)
      } else {
        microchip.style.opacity = "0"
      }
    }

    requestAnimationFrame(update)
  }

  // Start Loop
  requestAnimationFrame(update)
}
