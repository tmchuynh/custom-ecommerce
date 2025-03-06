"use client";
import Image from "next/image";

export default function SlantedHero() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-9 gap-8">
            <div className="lg:gap-8 lg:col-span-3 xl:col-span-5">
              <div className="flex flex-col gap-6 ">
                <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl md:col-span-3 lg:col-span-4">
                  We’re changing the way people connect
                </h1>
                <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non
                  deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-6 w-full max-w-3xl mx-auto lg:mt-0 lg:col-span-2 xl:col-span-4">
              <Image
                alt=""
                src="/images/yosemite.jpg"
                width={1280}
                height={800}
                className="mt-10 aspect-6/5 w-full rounded-2xl object-cover sm:mt-16 lg:mt-0"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
        </div>
      </div>
    </div>
  );
}
