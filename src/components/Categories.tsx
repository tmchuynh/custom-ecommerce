import { navigations } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Categories() {
  return (
    <section
      aria-labelledby="category-heading"
      className="sm:pt-20 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 id="category-heading" className="text-2xl font-semibold mb-4">
          Shop by Category
        </h2>
        <Button>
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </Button>
      </div>

      <div className="mt-4 flow-root">
        <div className="-my-2 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {navigations.categories.map((category, index) => {
            return (
              <div className="flex items-center" key={index}>
                <div className="mt-10 w-full">
                  <h2 className="text-2xl font-semibold mb-4">
                    <Link
                      href={`/shopping/${category.name.toLowerCase()}`}
                      className="hover:underline underline-offset-2"
                    >
                      {category.name}
                    </Link>
                  </h2>
                  {category.sections.map((section, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        <div className="flex flex-col">
                          {section.map((section) => {
                            if (section.id !== "shop-collection") {
                              return (
                                <a
                                  key={section.name}
                                  href={section.href}
                                  className="relative flex h-60 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto my-5"
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
                                    {category.name}'s {section.name}
                                  </span>
                                </a>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Button>
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </Button>
      </div>
    </section>
  );
}
