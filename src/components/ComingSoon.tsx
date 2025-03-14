import { ComingSoonMessageProps } from "@/lib/interfaces";
import Image from "next/image";
import React from "react";

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
