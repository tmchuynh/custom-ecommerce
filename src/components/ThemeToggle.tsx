"use client";

import React from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { Switch } from "./ui/switch";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <FiSun
        className={`text-xl ${
          theme === "dark" ? "text-gray-400" : "text-yellow-500"
        }`}
      />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <FiMoon
        className={`text-xl ${
          theme === "light" ? "text-gray-400" : "text-blue-500"
        }`}
      />
    </div>
  );
};
