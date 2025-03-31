"use client";
import { useCurrency } from "@/app/context/currencyContext";
import { currencyCountries } from "@/lib/constants/countriesConstant";
import { navigations } from "@/lib/constants/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@radix-ui/react-select";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function NavMobileMenu() {
  const [open, setOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  interface Category {
    id: string;
    name: string;
    featured: any[];
    sections: {
      id: string;
      name: string;
      href: string;
    }[];
  }

  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);

  return (
    <Dialog open={open} onClose={onOpenChange}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full lg:hidden"
        >
          <div className="flex px-4 pt-5 pb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2"
            >
              <span className="sr-only">Close menu</span>
              <FaX aria-hidden="true" className="size-6" />
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
                <TabPanel key={category.name} className="space-y-12 px-4 py-6">
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
                    value={selectedCurrency.code}
                    onValueChange={(value) =>
                      setSelectedCurrency(
                        currencyCountries.find(
                          (currency) => currency.code === value
                        )!
                      )
                    }
                  >
                    <SelectContent>
                      <SelectTrigger className="max-w-fit pr-7 pl-2 text-left text-base font-medium sm:text-sm/6 focus-visible:outline-none border-none focus-visible:ring-0">
                        {currencyCountries.map((currency) => (
                          <SelectItem
                            className="focus:bg-muted focus:text-muted-foreground"
                            key={currency.code}
                            value={currency.code}
                          >
                            {currency.name}
                          </SelectItem>
                        ))}
                      </SelectTrigger>
                    </SelectContent>
                  </Select>
                </SelectGroup>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
