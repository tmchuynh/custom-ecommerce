"use client";
import Image from "next/image";
import { Button } from "./ui/button";

export default function SlantedHero() {
  return (
    <div className="relative pt-14">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-9 gap-8">
          <div className="lg:gap-8 lg:col-span-3 xl:col-span-5">
            <div className="flex flex-col gap-6 ">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance  sm:text-7xl md:col-span-3 lg:col-span-4 text-foreground">
                We’re changing the way people connect
              </h1>
              <p className="text-lg font-medium text-pretty text-foreground sm:text-xl/8">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt. Qui irure qui lorem cupidatat commodo.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-x-6">
              <Button>Get started</Button>
              <Button variant={"outline"}>
                Learn more <span aria-hidden="true">→</span>
              </Button>
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
      </div>
    </div>
  );
}
