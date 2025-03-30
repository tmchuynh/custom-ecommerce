/**
 * The `CannotFind` component displays a message indicating that the data on the page cannot be loaded.
 * It uses the `SpinningText` component to create a spinning text effect.
 *
 * @component
 * @example
 * return (
 *   <CannotFind />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
import React from "react";
import { SpinningText } from "../magicui/spinning-text";

const CannotFind: React.FC = () => {
  return (
    <main className="w-10/12 md:w-11/12 mx-auto -mt-28 h-svh flex justify-center items-center">
      <SpinningText reverse className="text-4xl" duration={4} radius={6}>
        the data on this page • cannot be loaded • at this time •
      </SpinningText>
    </main>
  );
};

export default CannotFind;
