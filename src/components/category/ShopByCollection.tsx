import { navigations } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DynamicButton from "../ui/button-dynamic";

export default function ShopByCollection() {
  return (
    <section aria-labelledby="collection-heading" className=" py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="collection-heading" className="text-3xl font-extrabold mb-4">
            Shop by Collection
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Each season, we collaborate with world-class designers to create a
            collection inspired by the natural world.
          </p>
        </div>

        <div className="space-y-16">
          {navigations.categories.map((category, index) => (
            <div key={index} className="relative">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  <Link
                    href={`/shopping/${category.name.toLowerCase()}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                </h2>
                <div className="ml-4 flex-grow border-t"></div>
                <Link
                  href={`/shopping/${category.name.toLowerCase()}`}
                  className="ml-4"
                >
                  <DynamicButton
                    text="View All"
                    className="w-full"
                    variant="outline"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.collections.map((section, indexS) => (
                  <Link
                    key={indexS}
                    href={section.href}
                    className="group relative h-80 overflow-hidden rounded-xl shadow-md transition transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    <Image
                      width={500}
                      height={600}
                      src={section.imageSrc}
                      alt={section.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {section.name}
                      </h3>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-white/80 font-medium">
                          Shop Now
                        </span>
                        <ArrowRight className="h-4 w-4 ml-1 text-white/80" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
