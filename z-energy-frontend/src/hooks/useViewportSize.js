import { useState, useEffect } from "react"

const useViewportSize = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint)

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth
      setIsMobile(currentWidth <= breakpoint)
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])

  return { isMobile, width: window.innerWidth }
}

export { useViewportSize }
