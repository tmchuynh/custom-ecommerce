"use client";
import {
  navigations,
  offers,
  perks,
  policies,
  testimonials,
  trendingProducts,
} from "@/lib/constants";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav aria-label="Offers" className="order-last lg:order-first">
        <div className="mx-auto lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          >
            {offers.map((offer) => (
              <li key={offer.name} className="flex flex-col">
                <a
                  href={offer.href}
                  className="relative flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
                >
                  <p className="text-sm text-gray-500">{offer.name}</p>
                  <p className="font-semibold text-gray-900">
                    {offer.description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            width={1920}
            height={1080}
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            objectFit="cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </a>
        </div>
      </div>

      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="sm:pt-20 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8">
                {navigations.categories.map((category) => {
                  if (category.name === "Women") {
                    return category.sections.map((section) =>
                      section.map((section) => {
                        if (section.id !== "shop-collection") {
                          return (
                            <a
                              key={section.name}
                              href={section.href}
                              className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
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
                                  objectFit="cover"
                                />
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50"
                              />
                              <span className="relative mt-auto text-center text-xl font-bold text-white">
                                {section.name}
                              </span>
                            </a>
                          );
                        }
                      })
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8"
        >
          <h2
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Collection
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Each season, we collaborate with world-class designers to create a
            collection inspired by the natural world.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-8">
            {navigations.categories.map((category) => {
              if (category.name === "Women") {
                return category.sections.map((section) =>
                  section.map((section) => {
                    if (section.id === "shop-collection") {
                      return section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                        >
                          <span aria-hidden="true" className="absolute inset-0">
                            <Image
                              alt=""
                              width={1920}
                              height={1080}
                              src={item.imageSrc}
                              objectFit="cover"
                              className="size-full object-cover"
                            />
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50"
                          />
                          <span className="relative mt-auto text-center text-xl font-bold text-white">
                            {item.name}
                          </span>
                        </a>
                      ));
                    }
                  })
                );
              }
            })}
          </div>
        </section>

        {/* Policies section */}
        <section
          aria-labelledby="policy-heading"
          className="mt-16 lg:mt-24 border-t border-gray-200 bg-gray-50"
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
                  <h3 className="mt-6 text-base font-medium text-gray-900">
                    {policy.name}
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending products */}
        <section aria-labelledby="trending-heading" className="bg-white">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 py-15">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="relative mt-8">
              <div className="relative w-full overflow-x-auto">
                <ul
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                >
                  {trendingProducts.map((product) => (
                    <li
                      key={product.id}
                      className="inline-flex w-64 flex-col text-center lg:w-auto"
                    >
                      <div className="relative h-96 group rounded-2xl overflow-hidden">
                        <Image
                          width={1920}
                          height={1080}
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          objectFit="cover"
                          className="aspect-square w-full bg-gray-200 object-cover"
                        />
                        <div className="mt-6 pt-8 h-1/3 w-full absolute bottom-0 bg-gradient-to-t from-muted via-muted/80 to-muted/10 group-hover:opacity-75">
                          <p
                            className="text-sm uppercase font-semibold tracking-widest"
                            style={{
                              color: product.availableColors.at(0)?.colorBg,
                            }}
                          >
                            {product.color}
                          </p>
                          <h3 className="mt-1 font-semibold text-gray-900">
                            <a href={product.href}>
                              <span className="absolute inset-0" />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-gray-900">{product.price}</p>
                        </div>
                      </div>

                      <h4 className="sr-only">Available colors</h4>
                      <ul
                        role="list"
                        className="mt-auto flex items-center justify-center space-x-3 pt-6"
                      >
                        {product.availableColors.map((color) => (
                          <li
                            key={color.name}
                            style={{ backgroundColor: color.colorBg }}
                            className="size-4 rounded-full border border-black/10"
                          >
                            <span className="sr-only">{color.name}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 px-4 sm:hidden">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Sale section */}
        <div className="relative">
          {/* Decorative background image and gradient */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 mx-auto">
              <Image
                width={1920}
                height={1080}
                alt=""
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 bg-white/75" />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white" />
          </div>

          {/* Sale */}
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                Get 25% off during our one-time sale
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                Most of our products are limited releases that won't come back.
                Get your favorite items while they're in stock.
              </p>
            </div>
            <a
              href="#"
              className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
            >
              Get access to our one-time sale
            </a>
          </section>

          {/* Testimonials */}
          <section
            aria-labelledby="testimonial-heading"
            className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="testimonial-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                What are people saying?
              </h2>

              <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="sm:flex lg:block">
                    <svg
                      width={24}
                      height={18}
                      viewBox="0 0 24 18"
                      aria-hidden="true"
                      className="shrink-0 text-gray-300"
                    >
                      <path
                        d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                      <p className="text-lg text-gray-600">
                        {testimonial.quote}
                      </p>
                      <cite className="mt-4 block font-semibold text-gray-900 not-italic">
                        {testimonial.attribution}
                      </cite>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
