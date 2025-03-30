import { ComingSoonMessageProps } from "@/lib/types";
import Image from "next/image";
import React from "react";

/**
 * A React component that displays a "Coming Soon" message with an accompanying image.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.gender - The gender category for which products are coming soon (e.g., "Men's", "Women's")
 * @param {string} props.sectionName - The name of the section for which products are coming soon (e.g., "Shoes", "Clothing")
 *
 * @returns {JSX.Element} A responsive layout containing a message and an image
 * indicating that products are coming soon for the specified gender and section
 *
 * @example
 * ```tsx
 * <ComingSoonMessage gender="Women's" sectionName="Accessories" />
 * ```
 */
const ComingSoonMessage: React.FC<ComingSoonMessageProps> = ({
  gender,
  sectionName,
}) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-19 lg:flex-row-reverse lg:gap-36 2xl:justify-around 2xl:w-10/12 mx-auto items-center justify-center w-full h-[calc(100vh-59.5rem)] p-6">
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-2xl font-bold text-foreground/85 uppercase tracking-widest">
          Coming Soon
        </h2>
        <p className="text-xl text-balance text-foreground/45">
          {`More products are coming soon for the ${gender} ${sectionName}.`}
        </p>
        <p className="text-lg text-balance mt-2 text-foreground/45">
          Stay tuned for the latest collections and trends!
        </p>
      </div>
      <Image
        src="/images/Coming Soon.png"
        alt="Coming Soon"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ComingSoonMessage;
