"use client";

import * as React from "react";

/**
 * Custom hook to copy text to the clipboard.
 *
 * @param {Object} [options] - Configuration options for the hook.
 * @param {number} [options.timeout=2000] - Duration in milliseconds to keep the copied state.
 * @param {Function} [options.onCopy] - Optional callback function to be called after the text is copied.
 *
 * @returns {Object} - An object containing:
 *   - `isCopied` (boolean): State indicating whether the text has been copied.
 *   - `copyToClipboard` (Function): Function to copy the provided text to the clipboard.
 *
 * @example
 * const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 3000, onCopy: () => console.log('Copied!') });
 * copyToClipboard('Hello, World!');
 */
export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number;
  onCopy?: () => void;
} = {}): object {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return;
    }

    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      if (onCopy) {
        onCopy();
      }

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    }, console.error);
  };

  return { isCopied, copyToClipboard };
}
