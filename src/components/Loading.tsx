import React, { JSX } from "react";
import SyncLoader from "./SyncLoader";

/**
 * LoadingIndicator component renders a loading spinner centered within the viewport.
 *
 * @returns {JSX.Element} The JSX code for the loading indicator.
 *
 * @example
 * <LoadingIndicator />
 *
 * @component
 * @name LoadingIndicator
 *
 * @description
 * This component uses the SyncLoader from the 'react-spinners' library to display a loading spinner.
 * The spinner is centered both horizontally and vertically within the viewport.
 *
 * @remarks
 * The component uses Tailwind CSS classes for styling and layout.
 * The spinner's size, speed, and CSS overrides are customizable via the SyncLoader props.
 */
const LoadingIndicator: React.FC = (): JSX.Element => {
  return (
    <main className="w-10/12 md:w-11/12 mx-auto py-6 h-lvh flex justify-center items-center">
      <SyncLoader
        size={50}
        aria-label="Loading Spinner"
        cssOverride={{
          display: "flex",
          gap: 30,
          height: "15rem",
        }}
        speedMultiplier={0.7}
      />
    </main>
  );
};

export default LoadingIndicator;
