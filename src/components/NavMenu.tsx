"use client";

import { about, currencies, navigations } from "@/lib/constants";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ThemeToggle } from "./ThemeToggle";
import { useCurrency } from "@/app/context/CurrencyContext";
import { cn } from "@/lib/utils";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sortedCategories, setSortedCategories] = useState<
    {
      id: string;
      name: string;
      featured: any[];
      sections: {
        id: string;
        name: string;
        href: string;
        imageSrc: string;
        items: any[];
      }[];
    }[]
  >([]);

  useEffect(() => {
    const sorted = navigations.categories.map((category) => {
      // Sort sections inside each category based on the number of items in the section
      const sortedSections = category.sections.map((sectionArray) => {
        return sectionArray.map((section) => ({
          ...section,
          // Sort items in each section by the length of the item's name
          items: section.items.sort((a, b) => b.name.length - a.name.length),
        }));
      });

      const sortedCategory = {
        ...category,
        sections: sortedSections
          .flat()
          .sort((a, b) => b.items.length - a.items.length), // Sort sections by number of items
      };

      return sortedCategory;
    });

    setSortedCategories(sorted); // Update the state with sorted categories
  }, []);

  // Function to handle toggle of Popover
  const togglePopover = (name: string) => {
    setOpenPopovers((prevState: { [key: string]: boolean }) => {
      // If the clicked popover is already open, close it, otherwise open it
      return {
        // Close all other popovers
        ...Object.keys(prevState).reduce(
          (acc: { [key: string]: boolean }, key) => {
            acc[key] = false; // Set all popovers to false
            return acc;
          },
          {} as { [key: string]: boolean }
        ),
        // Open the clicked popover
        [name]: !prevState[name],
      };
    });
  };

  return (
    <div className="relative z-50 shadow-sm">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div>
                <TabList className="-mb-px flex space-x-8 px-4">
                  {sortedCategories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 px-1 py-4 text-base font-medium whitespace-nowrap"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {sortedCategories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <Image
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            width={500}
                            height={500}
                            className="aspect-square w-full rounded-md object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block text-sm font-medium"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1 text-sm">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 px-4 py-6">
              {navigations.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium">
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium">
                  Sign in
                </a>
              </div>
            </div>

            <div className="space-y-6 px-4 py-6">
              {/* Currency selector */}
              <form>
                <div className="-ml-2 inline-grid grid-cols-1">
                  <SelectGroup>
                    <Select
                      value={selectedCurrency}
                      onValueChange={setSelectedCurrency}
                    >
                      <SelectTrigger className="max-w-fit pr-7 pl-2 text-left text-base font-medium sm:text-sm/6 focus-visible:outline-none border-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>

                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            className="focus:bg-muted focus:text-muted-foreground"
                            key={currency}
                            value={currency}
                          >
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </SelectGroup>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <nav>
        {/* Top navigations */}
        <div className="bg-muted">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Currency selector */}
            <form>
              <div className="-ml-2 inline-grid grid-cols-1">
                <SelectGroup>
                  <Select
                    value={selectedCurrency}
                    onValueChange={setSelectedCurrency}
                  >
                    <SelectTrigger className="max-w-fit pr-7 pl-2 text-left text-base font-medium sm:text-sm/6 focus-visible:outline-none border-none focus-visible:ring-0">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>

                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          className="focus:bg-muted focus:text-muted-foreground"
                          key={currency}
                          value={currency}
                        >
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectGroup>
              </div>
            </form>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm font-medium">
                Sign in
              </a>
              <a href="#" className="text-sm font-medium">
                Create an account
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="shadow-sm">
          <div className="bg-background text-foreground shadow-md z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Image
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {sortedCategories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton
                              onClick={() => togglePopover(category.name)} // Toggle open state
                              className="relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none hover:underline underline-offset-4 gap-x-2"
                            >
                              {category.name}
                              {openPopovers[category.name] ? (
                                <ChevronUpIcon
                                  aria-hidden="true"
                                  className="h-5 w-5" // Use ChevronUpIcon when open
                                />
                              ) : (
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5" // Use ChevronDownIcon when closed
                                />
                              )}
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 -z-10 bg-background pt-16 ring-1 shadow-lg ring-gray-900/5 transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                          >
                            <div className="relative">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="grid grid-cols-2 grid-rows-1 gap-8 text-sm">
                                    {category.featured.map((item, itemIdx) => (
                                      <div
                                        key={item.name}
                                        className={cn(
                                          itemIdx === 0 ? "col-span-2" : "",
                                          "group relative overflow-hidden rounded-md bg-muted"
                                        )}
                                      >
                                        <Image
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          width={800}
                                          height={900}
                                          className={cn(
                                            itemIdx === 0
                                              ? "aspect-2/1"
                                              : "aspect-square",
                                            "w-full object-cover group-hover:opacity-75"
                                          )}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end">
                                          <div className="bg-white/60 p-4 text-sm">
                                            <a
                                              href={item.href}
                                              className="font-bold tracking-wider uppercase"
                                            >
                                              <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                              />
                                              {item.name}
                                            </a>
                                            <p
                                              aria-hidden="true"
                                              className="mt-0.5 sm:mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-3 gap-x-14 gap-y-10 text-sm">
                                    {category.sections.map(
                                      (section, columnIdx) => (
                                        <div
                                          key={columnIdx}
                                          className="space-y-15 grid-cols-2 grid-rows-2 h-full"
                                        >
                                          <div
                                            key={section.name}
                                            className="min-h-fit h-5/11"
                                          >
                                            <p
                                              id={`${category.id}-${section.id}-heading`}
                                              className="font-bold tracking-wider uppercase"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${category.id}-${section.id}-heading`}
                                              className="mt-4 space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:underline underline-offset-6"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}

                      <Popover className="inline-flex items-center gap-x-1">
                        <PopoverButton
                          onClick={() => togglePopover("Our Brand")}
                          className="relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none hover:underline underline-offset-4 gap-x-2"
                        >
                          Our Brand
                          {openPopovers["Our Brand"] ? (
                            <ChevronUpIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          ) : (
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          )}
                        </PopoverButton>
                        <PopoverPanel
                          transition
                          className="absolute inset-x-0 top-full -z-10 bg-background pt-16 ring-1 shadow-lg ring-gray-900/5 transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                          <div className="mx-auto max-w-7xl gap-x-8 gap-y-10 px-6 pb-10 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-8">
                              {about.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex py-2 text-sm font-semibold gap-x-4 p-4 rounded-2xl -ml-3 group items-center"
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className="size-7 flex-none group-hover:text-primary"
                                  />
                                  <div className="gap-y-3 flex flex-col">
                                    <p className="flex gap-x-4"> {item.name}</p>
                                    <p>{item.description}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>

                      {navigations.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium "
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <Button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="-ml-2 rounded-md bg-background text-foreground p-2"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </Button>

                  {/* Search */}
                  <a href="#" className="ml-2 p-2">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <Image
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  <a href="#" className="hidden text-sm font-medium lg:block">
                    Search
                  </a>

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <a href="#" className="p-2 lg:hidden">
                      <span className="sr-only">Help</span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-6"
                      />
                    </a>
                    <a href="#" className="hidden text-sm font-medium lg:block">
                      Help
                    </a>

                    {/* Wish List  */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <a
                        href="/wishlist_items"
                        className="group -m-2 flex items-center p-2"
                      >
                        <FaHeart
                          aria-hidden="true"
                          className="size-6 shrink-0 group-hover:text-primary"
                        />
                        <span className="ml-2 text-sm font-medium group-hover:text-secondary">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <a
                        href="/shopping_cart"
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 group-hover:text-primary"
                        />
                        <span className="ml-2 text-sm font-medium group-hover:text-secondary">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
