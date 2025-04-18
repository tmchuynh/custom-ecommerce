"use client";
import { useCurrency } from "@/app/context/currencyContext";
import { ThemeToggle } from "../ThemeToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { currencyCountries } from "@/lib/constants/countriesConstant";

export default function NavTopMenu() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  return (
    <div className="flex h-10 items-center justify-between sticky top-0 z-10 w-full mx-auto py-4 bg-background">
      <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto">
        {/* Currency selector */}
        <form className="hidden md:block">
          <div className="-ml-2 inline-grid grid-cols-1">
            <SelectGroup>
              <Select
                value={selectedCurrency.code}
                onValueChange={(code) => {
                  const currency = currencyCountries.find(
                    (c) => c.code === code
                  );
                  if (currency) {
                    setSelectedCurrency(currency);
                  }
                }}
              >
                <SelectTrigger className="max-w-fit pr-7 pl-2 text-left text-base font-medium sm:text-sm/6 focus-visible:outline-none border-none focus-visible:ring-0 shadow-none">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyCountries.map((currency, index) => (
                    <SelectItem
                      className="focus:bg-muted focus:text-muted-foreground"
                      key={currency.code}
                      value={currency.code}
                    >
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SelectGroup>
          </div>
        </form>

        <div className="flex items-center space-x-6">
          <a href="/login" className="text-sm font-medium">
            Sign in
          </a>
          <a href="/registration" className="text-sm font-medium">
            Create an account
          </a>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
