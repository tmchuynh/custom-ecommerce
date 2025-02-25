import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the medium size is small (<= 768px).
 */
const useMediumScreen = () => {
  const [IsMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return IsMediumScreen;
};

export default useMediumScreen;
