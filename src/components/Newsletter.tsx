"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const toggleForm = () => setShowForm(!showForm);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle form submission logic here
      // You would typically send the email to your backend
      console.log("Submitted email:", email);

      setEmail("");
      setShowWelcomeAlert(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full border-t py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Stay Connected
        </h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 gap-y-8 w-full">
          <AlertDialog
            open={showWelcomeAlert}
            onOpenChange={setShowWelcomeAlert}
          >
            <AlertDialogContent className="">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold">
                  Welcome to Our Newsletter!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Thank you for subscribing! Use code{" "}
                  <span className="font-medium text-primary">WELCOME10</span>{" "}
                  for 10% off your first purchase.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowWelcomeAlert(false)}
                >
                  Got it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex items-center rounded-xl border border-muted-foreground/20 bg-card p-8 shadow-sm transition-all">
            <div className="w-full max-w-lg mx-auto">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Join Our Newsletter
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Subscribe to receive updates, exclusive offers, and the latest
                product news.
              </p>
              <form
                className="space-y-4 md:space-y-0 md:flex md:gap-4"
                onSubmit={handleSubmit}
              >
                <div className="flex-1">
                  <Input
                    id="email-address"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    required
                    autoComplete="email"
                    aria-label="Email address"
                    placeholder="Your email address"
                    className={`h-11 ${
                      emailError ? "border-red-500" : "border-input"
                    } focus:border-primary`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <Button
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white h-11 px-6"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-muted-foreground/20 shadow-sm h-[280px] md:h-auto mt-8 lg:mt-0">
            <div className="absolute inset-0">
              <Image
                width={1920}
                height={1080}
                alt="Exclusive promotions background"
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                className="object-cover w-full h-full brightness-75 filter"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            </div>
            <div className="relative flex items-center justify-center h-full p-8 md:p-12">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  Exclusive Benefits
                </h3>
                <p className="text-white/90 text-sm md:text-base mb-6">
                  Already subscribed? Use the exclusive code we've sent to
                  unlock special offers and early access.
                </p>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all"
                  onClick={() => router.push("/early-access")}
                >
                  Access Now{" "}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
