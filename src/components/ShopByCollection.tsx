import { navigations } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function ShopByCollection() {
  return (
    <section
      aria-labelledby="collection-heading"
      className="mx-auto max-w-xl px-4 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8"
    >
      <h2 id="collection-heading" className="text-2xl font-semibold mb-4">
        Shop by Collection
      </h2>
      <p className="mt-4 text-base">
        Each season, we collaborate with world-class designers to create a
        collection inspired by the natural world.
      </p>

      <div className="mt-10 flow-root">
        <div className="-my-2">
          {navigations.categories.map((category, index) => {
            return (
              <div key={index}>
                <div className="flex items-center">
                  <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-4">
                      <Link
                        href={`/shopping/${category.name.toLowerCase()}`}
                        className="hover:underline underline-offset-2"
                      >
                        {category.name}
                      </Link>
                    </h2>
                    <div className="mt-10 space-y-12 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                      {category.collections.map((section, indexS) => {
                        return (
                          <a
                            key={indexS}
                            href={section.href}
                            className="relative flex h-96 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            >
                              <Image
                                width={1920}
                                height={1080}
                                alt=""
                                src={section.imageSrc}
                                className="size-full object-cover object-center"
                              />
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50"
                            />
                            <span className="relative mt-auto text-center text-xl text-background font-bold">
                              {section.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
