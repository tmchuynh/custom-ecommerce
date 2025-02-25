import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the screen size is small (<= 640px).
 */
const useSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen;
};

export default useSmallScreen;
