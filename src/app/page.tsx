"use client";
import Categories from "@/components/category/Categories";
import TrendingProducts from "@/components/category/product/TrendingProducts";
import ShopByCollection from "@/components/category/ShopByCollection";
import Policies from "@/components/Policies";
import DynamicButton from "@/components/buttons/button-dynamic";
import { offers, testimonials } from "@/lib/constants/constants";
import Image from "next/image";
import { useState } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";

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
      <div className="flex min-h-full relative overflow-hidden justify-center">
        {/* Decorative image and overlay */}
        <Image
          alt=""
          width={1920}
          height={1080}
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          className="absolute inset-1.5 object-bottom w-full object-cover opacity-55"
        />

        <div className="relative mx-auto max-w-3xl flex-col z-10 p-9 mb-35 mt-28 bg-muted/60 rounded-2xl items-center px-6 text-center lg:px-0 lg:py-15">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <DynamicButton
            variant="outline"
            text="Shop New Arrivals"
            icon={FaShoppingCart}
            className="mt-9"
            iconClassName="group-hover:translate-x-15"
          />
        </div>
      </div>

      <main>
        <TrendingProducts />

        <ShopByCollection />

        {/* Testimonials */}
        <section
          aria-labelledby="testimonial-heading"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32">
              <div className="pb-20 sm:pb-24 xl:pb-0">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
                  <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                    <div className="relative aspect-2/1 h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                        className="absolute inset-0 size-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                      />
                    </div>
                  </div>
                  <div className="w-full relative max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                    <ImQuotesLeft className="absolute top-0 left-5 -z-10 size-24 md:size-40 lg:size-52 xl:size-72 text-muted" />
                    <figure className="relative isolate pt-6 sm:pt-12 z-10">
                      <blockquote className="text-xl/8 font-semibold sm:text-2xl/9">
                        <p>
                          Gravida quam mi erat tortor neque molestie. Auctor
                          aliquet at porttitor a enim nunc suscipit tincidunt
                          nunc. Et non lorem tortor posuere. Nunc eu scelerisque
                          interdum eget tellus non nibh scelerisque bibendum.
                        </p>
                      </blockquote>
                      <figcaption className="mt-8 text-base">
                        <div className="font-semibold">Judith Black</div>
                        <div className="mt-1">CEO of Workcation</div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Policies />

        <Categories />
      </main>
    </div>
  );
}
