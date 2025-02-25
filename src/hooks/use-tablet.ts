import * as React from "react";

const TABLET_BREAKPOINT_MIN = 768;
const TABLET_BREAKPOINT_MAX = 1024;

/**
 * Custom hook to determine if the current viewport width is considered tablet.
 *
 * This hook uses the `window.matchMedia` API to listen for changes in the viewport width
 * and updates the state accordingly. The tablet breakpoints are defined by the `TABLET_BREAKPOINT_MIN`
 * and `TABLET_BREAKPOINT_MAX` constants.
 *
 * @returns {boolean} - Returns `true` if the viewport width is between the tablet breakpoints, otherwise `false`.
 */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${TABLET_BREAKPOINT_MIN}px) and (max-width: ${TABLET_BREAKPOINT_MAX}px)`
    );
    const onChange = () => {
      setIsTablet(
        window.innerWidth >= TABLET_BREAKPOINT_MIN &&
          window.innerWidth <= TABLET_BREAKPOINT_MAX
      );
    };
    mql.addEventListener("change", onChange);
    setIsTablet(
      window.innerWidth >= TABLET_BREAKPOINT_MIN &&
        window.innerWidth <= TABLET_BREAKPOINT_MAX
    );
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}
