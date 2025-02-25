import React from "react";
import SyncLoader from "./SyncLoader";

const LoadingIndicator: React.FC = () => {
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
