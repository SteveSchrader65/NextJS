// This custom hook modifies scrolling speed by calculating
// and modifying the required duration to perform the scroll
// This variation begins fast and then slows down as the distance
// to the top of screen is close.
import {useCallback} from "react"

const useScrollPacer = (duration = 1000) => {
  const triggerScroll = useCallback(() => {
    const startPosition = window.scrollY
    const startTime = performance.now()
    let lastPosition = startPosition

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate speed factor based on remaining distance
      const remainingDistance = lastPosition
      const speedFactor =
        remainingDistance > window.innerHeight
          ? 0.25
          : remainingDistance > window.innerHeight * 0.3
          ? 0.15
          : 0.08

      // Calculate next position
      const movement = remainingDistance * speedFactor
      const nextPosition = Math.max(0, lastPosition - movement)

      window.scrollTo(0, nextPosition)
      lastPosition = nextPosition

      if (nextPosition > 0 && progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [duration])

  return triggerScroll
}

export default useScrollPacer
