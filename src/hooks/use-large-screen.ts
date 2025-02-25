import * as React from "react";

const LARGE_SCREEN_BREAKPOINT = 1440;

/**
 * Custom hook to determine if the current viewport width is considered large screen.
 *
 * This hook uses the `window.matchMedia` API to listen for changes in the viewport width
 * and updates the state accordingly. The large screen breakpoint is defined by the `LARGE_SCREEN_BREAKPOINT` constant.
 *
 * @returns {boolean} - Returns `true` if the viewport width is greater than the large screen breakpoint, otherwise `false`.
 */
export function useIsLargeScreen(): boolean {
  const [isLargeScreen, setIsLargeScreen] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LARGE_SCREEN_BREAKPOINT}px)`);
    const onChange = () => {
      setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLargeScreen;
}
