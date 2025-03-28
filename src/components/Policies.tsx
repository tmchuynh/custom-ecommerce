import { policies } from "@/lib/constants";
import Image from "next/image";

export default function Policies() {
  return (
    <section
      aria-labelledby="policy-heading"
      className="mt-16 lg:mt-24 border-t"
    >
      <h2 id="policy-heading" className="sr-only">
        Our policies
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {policies.map((policy) => (
            <div key={policy.name}>
              <Image
                alt=""
                src={policy.imageSrc}
                className="h-24 w-auto"
                width={96}
                height={96}
              />
              <h3 className="mt-6 text-base font-medium">{policy.name}</h3>
              <p className="mt-3 text-base">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
