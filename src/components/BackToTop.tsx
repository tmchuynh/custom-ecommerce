import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <p className="sr-only">Scroll back to the top of the page</p>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size={"icon"}
          className="fixed bottom-4 right-4 bg-accent-1 text-accent-foreground border-accent-1 rounded-full shadow-lg"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </Button>
      )}
    </div>
  );
};

export default BackToTop;
