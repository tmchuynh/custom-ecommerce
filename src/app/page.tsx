"use client";
import Image from "next/image";
import { ImQuotesLeft } from "react-icons/im";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative flex justify-center min-h-full overflow-hidden">
        {/* Decorative image and overlay */}
        <Image
          alt=""
          width={1920}
          height={1080}
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          className="object-bottom absolute inset-1.5 opacity-55 w-full object-cover"
        />

        <div className="relative z-10 flex-col items-center bg-muted/60 mx-auto mt-28 mb-35 px-6 lg:px-0 lg:py-15 p-9 rounded-2xl max-w-3xl text-center">
          <h1 className="mb-8 font-extrabold text-4xl text-center">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
        </div>
      </div>

      <main>
        {/* Testimonials */}
        <section
          aria-labelledby="testimonial-heading"
          className="relative mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 max-w-7xl"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 xl:pb-32">
              <div className="pb-20 sm:pb-24 xl:pb-0">
                <div className="flex xl:flex-row flex-col items-center xl:items-stretch gap-x-8 gap-y-10 sm:gap-y-8 mx-auto px-6 lg:px-8 max-w-7xl">
                  <div className="xl:flex-none -mt-8 xl:-mb-8 w-full xl:w-96 max-w-2xl">
                    <div className="relative md:-mx-8 xl:mx-0 h-full aspect-2/1 xl:aspect-auto">
                      <Image
                        alt="Testimonial portrait"
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                        className="absolute inset-0 bg-gray-800 shadow-2xl rounded-2xl size-full object-cover"
                        width={2102}
                        height={1400}
                      />
                    </div>
                  </div>
                  <div className="relative xl:flex-auto xl:px-16 xl:py-24 w-full max-w-2xl xl:max-w-none">
                    <ImQuotesLeft className="top-0 left-5 -z-10 absolute text-muted size-24 md:size-40 lg:size-52 xl:size-72" />
                    <figure className="relative z-10 pt-6 sm:pt-12 isolate">
                      <blockquote className="font-semibold text-xl/8 sm:text-2xl/9">
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
      </main>
    </div>
  );
}
