"use client";
import Categories from "@/components/Categories";
import Policies from "@/components/Policies";
import ShopByCollection from "@/components/ShopByCollection";
import TrendingProducts from "@/components/TrendingProducts";
import { offers, testimonials } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav aria-label="Offers" className="order-last border-t lg:order-first">
        <div className="mx-auto lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          >
            {offers.map((offer) => (
              <li key={offer.name} className="flex flex-col">
                <a
                  href={offer.href}
                  className="relative flex flex-1 flex-col justify-center px-4 py-6 text-center focus:z-10"
                >
                  <p className="text-sm">{offer.name}</p>
                  <p className="font-semibold">{offer.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero section */}
      <div className="relative">
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
        <div aria-hidden="true" className="absolute inset-0 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent px-8 py-3 text-base font-medium"
          >
            Shop New Arrivals
          </a>
        </div>
      </div>

      <main>
        {/* Testimonials */}
        <section
          aria-labelledby="testimonial-heading"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2
              id="testimonial-heading"
              className="text-2xl font-semibold mb-4"
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
                    className="shrink-0"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                    <p className="text-lg">{testimonial.quote}</p>
                    <cite className="mt-4 block font-semibold not-italic">
                      {testimonial.attribution}
                    </cite>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <ShopByCollection />

        <Policies />

        <TrendingProducts />

        <Categories />
      </main>
    </div>
  );
}
