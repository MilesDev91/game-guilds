import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    function handleWidthChange() {
      setWindowWidth(window.innerWidth);
    }

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleWidthChange);
    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return windowWidth;
}
