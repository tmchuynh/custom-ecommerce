"use client";

import { currencies, useCurrency } from "@/app/context/currencyContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navbarItems } from "@/lib/constants/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaDollarSign } from "react-icons/fa";
import { ThemeToggle } from "../buttons/ThemeToggle";
import CurrencyStatus from "../currency/CurrencyStatus";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import WishlistIcon from "./WishlistIcon";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { currentCurrency, setCurrency, isLoading } = useCurrency();

  return (
    <header className="top-0 z-50 fixed inset-x-0 bg-background shadow-sm backdrop-blur-sm w-full">
      {/* Top bar */}
      <div className="bg-black px-4 py-2 border-b text-white">
        <div className="flex justify-between items-center mx-auto max-w-7xl text-sm">
          <div className="flex items-center space-x-4">
            <span>Your Passport to Unforgettable Stories</span>
            <CurrencyStatus />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={"link"}
              size={"sm"}
              className="flex items-center gap-1 m-0 p-0 h-fit text-white text-xs hover:text-sky-300 transition-colors"
              onClick={() => router.push("/contact")}
            >
              <Phone className="w-4 h-4" />
              <span className="sm:inline hidden">Support</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 m-0 p-0 h-fit text-white text-xs hover:text-sky-300 uppercase transition-colors">
                <FaDollarSign className="w-4 h-4" />
                <span className="sm:inline hidden">
                  {isLoading ? "Loading..." : currentCurrency.code}
                </span>
                <FaChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[200px] max-h-[15em] overflow-y-auto"
              >
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => setCurrency(currency)}
                    className={`cursor-pointer ${
                      currentCurrency.code === currency.code
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>
                        {currency.code} - {currency.name}
                      </span>
                      <span className="text-tertiary">{currency.symbol}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Main navigation */}
      <nav
        aria-label="Global"
        className="flex justify-between items-center lg:px-8 p-4 border-b"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="flex items-center gap-2">
              <span className="sr-only">Fynix</span>
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-lg text-white">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl">Fynix</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <WishlistIcon />
          <CartIcon />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex justify-center items-center -m-2.5 p-2.5 rounded-md"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* Desktop Navbar */}
        <div className="lg:flex items-center lg:gap-x-8 hidden">
          {navbarItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-1 font-medium text-sm hover:text-primary transition-colors"
                    type="button"
                  >
                    {item.label}
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[200px]">
                  {item.dropdown.map((sub) => (
                    <DropdownMenuItem asChild key={sub.label}>
                      <Link href={sub.href} className="block px-4 py-2 text-sm">
                        {sub.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-2 ml-8">
            <WishlistIcon />
            <CartIcon />
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      {/* Mobile Navbar */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="z-50 fixed inset-0 bg-black/25" />
        <DialogPanel className="right-0 z-50 fixed inset-y-0 bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 w-full sm:max-w-sm overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-lg">
                <GlobeAltIcon className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-800 text-lg">Fynix</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 rounded-md"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navbarItems.map((item) =>
                  item.dropdown ? (
                    <div key={item.label}>
                      <details>
                        <summary className="flex justify-between items-center hover:bg-gray-50 -mx-3 px-3 py-3 rounded-lg font-medium text-base text-primary cursor-pointer">
                          {item.label}
                          <ChevronDownIcon className="inline ml-2 w-4 h-4" />
                        </summary>
                        <div className="space-y-1 mt-2 pl-4">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg text-gray-600 text-sm"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block hover:bg-gray-50 -mx-3 px-3 py-3 rounded-lg font-medium text-base text-primary"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
