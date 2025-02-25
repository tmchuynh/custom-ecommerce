import * as React from "react";

/**
 * Custom hook that returns a boolean indicating whether the component is mounted.
 *
 * @returns {boolean} - `true` if the component is mounted, `false` otherwise.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const mounted = useMounted();
 *
 *   React.useEffect(() => {
 *     if (mounted) {
 *       console.log('Component is mounted');
 *     }
 *   }, [mounted]);
 *
 *   return <div>{mounted ? 'Mounted' : 'Not Mounted'}</div>;
 * };
 * ```
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
