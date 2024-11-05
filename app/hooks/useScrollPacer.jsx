import {useState, useEffect, useCallback} from "react";
import {animateScroll as scroll} from "react-scroll";

// This custom hook allows setting of 'speed' by calculating
// and modifying the required duration to perform the scroll
const useScrollPacer = (duration = 1000) => {
  const [_, setScrollDistance] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollDistance(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerScroll = useCallback(() => {
    scroll.scrollToTop({
      duration: duration,
      smooth: true,
      easing: (t) => {
        return 1 - Math.pow(1 - t, 3);
      },
    });
  }, [duration]);

  return triggerScroll;
};

export default useScrollPacer;
