import { ComingSoonMessageProps } from "@/lib/interfaces";
import React from "react";

const ComingSoonMessage: React.FC<ComingSoonMessageProps> = ({
  gender,
  sectionName,
}) => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-59.5rem)] p-6">
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wider">
          Coming Soon
        </h2>
        <p className="text-xl text-gray-600">
          {`More products are coming soon for the ${gender} ${sectionName}.`}
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Stay tuned for the latest collections and trends!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonMessage;
