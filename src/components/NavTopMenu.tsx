"use client";

import { useCurrency } from "@/app/context/CurrencyContext";
import { currencies } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function NavTopMenu() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  return (
    <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Currency selector */}
      <form className="hidden md:block">
        <div className="-ml-2 inline-grid grid-cols-1">
          <SelectGroup>
            <Select
              value={selectedCurrency.code}
              onValueChange={(code) =>
                setSelectedCurrency(currencies.find((c) => c.code === code)!)
              }
            >
              <SelectTrigger className="max-w-fit pr-7 pl-2 text-left text-base font-medium sm:text-sm/6 focus-visible:outline-none border-none focus-visible:ring-0">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency, index) => (
                  <SelectItem
                    className="focus:bg-muted focus:text-muted-foreground"
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.name}
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
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
