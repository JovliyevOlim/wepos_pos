import { useEffect, useState } from "react"

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth)
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }
    handleResize()
    return () => {
      if (typeof window !== "undefined") {
        return window.removeEventListener("resize", handleResize)
      }
    }
  }, [])
  return windowWidth
}

export default useWindowWidth
