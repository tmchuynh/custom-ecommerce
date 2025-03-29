"use client";
import { useCart } from "@/app/context/cartContext";
import { about, navigations } from "@/lib/constants";
import { FeaturedDetails, SectionDetails } from "@/lib/types";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import CategoryList from "./CategoryList";
import FeaturedCategory from "./FeaturedCategory";
import NavMobileMenu from "./NavMobileMenu";
import { Button } from "./ui/button";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sortedCategories, setSortedCategories] = useState<
    {
      id: string;
      name: string;
      featured: FeaturedDetails[];
      sections: SectionDetails[];
    }[]
  >([]);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const sorted = navigations.categories.map((category) => {
      /**
       * Sorts the items within each section of the category by the length of the item's name in descending order.
       *
       * @remarks
       * This function maps over the sections of a category, then maps over each section array to sort the items.
       * The items are sorted based on the length of their names, with the longest names appearing first.
       *
       * @param category The category object containing sections with items to be sorted.
       * @returns A new array of sections with items sorted by name length.
       */
      const sortedSections = category.sections.map((sectionArray) => {
        return sectionArray.map((section) => ({
          ...section,
          // Sort items in each section by the length of the item's name
          items: section.items.sort((a, b) => b.name.length - a.name.length),
        }));
      });

      /**
       * Represents a category with its sections sorted by the number of items in descending order.
       *
       * The `sections` property is a flattened array of sections, where each section is sorted based on the number of items it contains.
       * This allows for easy access to the most popular sections within the category.
       */
      const sortedCategory = {
        ...category,
        sections: sortedSections
          .flat()
          .sort((a, b) => a.name.localeCompare(b.name)), // Sort sections by number of items
      };

      return sortedCategory;
    });

    setSortedCategories(sorted); // Update the state with sorted categories
  }, []);

  /**
   * Toggles the visibility of a popover menu.
   * It closes all other popovers and toggles the state of the clicked popover.
   *
   * @param {string} name - The name of the popover to toggle. This name should correspond to a key in the `openPopovers` state.
   */
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

  /**
   * Closes all open popovers.
   * Used when navigating to a new page to ensure clean UI state.
   */
  const closeAllPopovers = () => {
    setOpenPopovers(
      Object.keys(openPopovers).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  };

  return (
    <div className="relative z-20">
      <div className="relative z-40 lg:hidden">
        <NavMobileMenu />
      </div>

      <nav>
        <div className="">
          <div className="bg-background text-foreground z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Image
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    width={32}
                    height={32}
                    className="h-8 aspect-square w-auto"
                  />
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      <Link
                        href={"/"}
                        className="flex items-center text-sm font-medium hover:underline underline-offset-4"
                      >
                        Home
                      </Link>
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
                                      <FeaturedCategory
                                        key={item.name}
                                        item={item}
                                        index={itemIdx}
                                        closePopovers={closeAllPopovers}
                                      />
                                    ))}
                                  </div>

                                  <div>
                                    <div className="py-4">
                                      <a
                                        href={`/shopping/${category.name.toLowerCase()}`}
                                        className="p-0 my-0 text-foreground text-sm hover:underline underline-offset-4"
                                        onClick={() => {
                                          togglePopover(category.name);
                                        }}
                                      >
                                        Shop All {category.name}
                                      </a>
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-14 gap-y-10 text-sm">
                                      {category.sections.map(
                                        (section, columnIdx) => (
                                          <CategoryList
                                            category={category}
                                            section={section}
                                            index={columnIdx}
                                            key={columnIdx}
                                            closePopovers={closeAllPopovers}
                                          />
                                        )
                                      )}
                                    </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-4">
                              {about.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex text-sm font-semibold gap-x-4 p-4 rounded-2xl -ml-3 group items-center hover:bg-muted"
                                  onClick={closeAllPopovers}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className="size-10 flex-none bg-muted group-hover:bg-accent p-2 rounded-lg"
                                  />
                                  <div className="gap-y-3 flex flex-col">
                                    <p className="flex gap-x-4 group-hover:underline underline-offset-4">
                                      {item.name}
                                    </p>
                                    <p>{item.description}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>

                      {navigations.pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium hover:underline underline-offset-4"
                          onClick={closeAllPopovers}
                        >
                          {page.name}
                        </Link>
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
                    className="h-8 aspect-square w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
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
                        <span className="sr-only">
                          items in wishlist, view wishlist
                        </span>
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
                          {getTotalItems() || 0}
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
