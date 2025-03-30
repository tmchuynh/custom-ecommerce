"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

/**
 * A React functional component that provides a toggle switch for switching between light and dark themes.
 *
 * This component uses the `useTheme` hook to access and modify the current theme, and ensures that it only
 * renders after the component has been mounted to avoid hydration mismatches in server-side rendering.
 *
 * @returns {JSX.Element | null} A JSX element containing the theme toggle UI, or `null` if the component is not yet mounted.
 *
 * @remarks
 * - The component displays a sun icon (`FiSun`) for the light theme and a moon icon (`FiMoon`) for the dark theme.
 * - The `Switch` component is used to toggle between themes, and its state is determined by the current theme.
 * - The `useEffect` hook ensures that the component only renders after mounting.
 *
 * @example
 * ```tsx
 * import { ThemeToggle } from './ThemeToggle';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <ThemeToggle />
 *     </div>
 *   );
 * };
 * ```
 */
export const ThemeToggle = (): JSX.Element | null => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme if not set
    if (!theme || theme === "system") {
      setTheme(systemTheme || "light");
    }
  }, [systemTheme, theme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center space-x-2">
      <FiSun
        className={`text-xl ${
          currentTheme === "dark" ? "text-gray-400" : "text-primary"
        }`}
      />
      <Switch checked={currentTheme === "dark"} onCheckedChange={toggleTheme} />
      <FiMoon
        className={`text-xl ${
          currentTheme === "light" ? "text-gray-400" : "text-blue-500"
        }`}
      />
    </div>
  );
};
