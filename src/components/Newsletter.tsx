"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const router = useRouter();
  const toggleForm = () => setShowForm(!showForm);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowForm(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-30 gap-y-6 md:gap-y-8 w-11/12 lg:w-10/12 2xl:w-9/12 py-10 mx-auto">
      <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
        <div className="mx-auto max-w-sm">
          <h3 className="text-lg font-medium mb-4">
            Sign up for our newsletter
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="mt-4 sm:mt-6 sm:flex">
            <input
              id="email-address"
              type="text"
              required
              autoComplete="email"
              aria-label="Email address"
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:shrink-0">
              <Button variant={"secondary"} type="submit">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative mt-6 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:mt-0">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            width={1920}
            height={1080}
            alt=""
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/footer-02-exclusive-sale.jpg"
            className="saturate-0 filter"
          />
          <div className="absolute inset-0 bg-indigo-600/90" />
        </div>
        <div className="relative mx-auto max-w-sm text-center">
          <h3 className="text-lg font-medium mb-4">Get early access</h3>
          <p className="mt-2 text-gray-200">
            Did you sign up to the newsletter? If so, use the keyword we sent
            you to get access.{" "}
            <Button
              variant={"ghost"}
              onClick={() => router.push("/early-access")}
            >
              Go now<span aria-hidden="true"> &rarr;</span>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
