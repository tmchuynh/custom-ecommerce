"use client";
import DynamicButton from "@/components/ui/button-dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

/**
 * NotFound component renders a 404 error page with a countdown timer that redirects to the home page.
 * It provides options to cancel the redirection, go back to the home page immediately, or contact support.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 *
 * @returns {JSX.Element} The rendered 404 error page component.
 *
 * @remarks
 * - The component uses a countdown timer to automatically redirect the user to the home page after 10 seconds.
 * - Users can cancel the redirection by clicking the "Cancel Redirection" button.
 * - The "Go back home" button redirects the user to the home page immediately.
 * - The "Contact support" button opens the default mail client to send an email to support.
 *
 * @dependencies
 * - `useRouter` from `next/router` for navigation.
 * - `useState` and `useEffect` from `react` for state management and side effects.
 * - `DynamicButton` component for rendering buttons with different styles and actions.
 * - `IoMdClose` and `FaPhoneAlt` icons from `react-icons` for button icons.
 */
const NotFound = (): JSX.Element => {
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
        <h1 className="text-4xl font-extrabold text-center mb-8">
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
