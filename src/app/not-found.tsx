"use client";
import DynamicButton from "@/components/ui/button-dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const NotFound = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [redirect, setRedirect] = useState(true);

  useEffect(() => {
    if (!redirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push(`/`);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router, redirect]);

  return (
    <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
      <div className="text-center">
        <h1 className="my-4 text-balance uppercase font-Luckiest tracking-wider lg:text-4xl text-lg text-primary font-extrabold text-center">
          404 Page not found
        </h1>
        <div className="mt-6 text-pretty text-lg font-medium sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
          {redirect && (
            <p>
              Redirecting you to the home page in{" "}
              <span className="font-bold">{countdown}</span> seconds.
            </p>
          )}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
          <DynamicButton
            text="Go back home"
            onClick={() => {
              router.push(`/`);
            }}
          />
          {redirect && (
            <DynamicButton
              variant="outline"
              icon={IoMdClose}
              text="Cancel Redirection"
              onClick={() => {
                setRedirect(false);
                setCountdown(0);
              }}
              iconClassName="group-hover:rotate-90"
            />
          )}
          <DynamicButton
            variant="outline"
            text="Contact support"
            onClick={() => router.push(`mailto:tina@iacafterschools.com`)}
            icon={FaPhoneAlt}
            iconClassName="group-hover:-rotate-90"
          />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
