import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to determine if the current viewport width is considered mobile.
 *
 * This hook uses the `window.matchMedia` API to listen for changes in the viewport width
 * and updates the state accordingly. The mobile breakpoint is defined by the `MOBILE_BREAKPOINT` constant.
 *
 * @returns {boolean} - Returns `true` if the viewport width is less than the mobile breakpoint, otherwise `false`.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
