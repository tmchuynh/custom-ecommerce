"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DiscountFormProps } from "@/lib/types";
import { Check, X } from "lucide-react";

const DiscountForm = ({
  discountCode,
  setDiscountCode,
  discountApplied,
  discountError,
  setDiscountError,
  handleApplyDiscount,
}: DiscountFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyDiscount();
          }}
        >
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              // Only clear errors when user starts typing a new code
              if (discountError && e.target.value.trim() !== "") {
                setDiscountError(false);
              }
            }}
            className={discountError ? "border-red-500" : ""}
          />
          <Button type="submit" variant="outline">
            Apply
          </Button>
        </form>

        {discountApplied ||
          (discountError && (
            <div className="mt-2 min-h-6">
              {discountApplied && (
                <div className="flex items-center text-green-600">
                  <Check size={16} className="mr-1" />
                  <span>Discount applied!</span>
                </div>
              )}
              {discountError && !discountApplied && (
                <div className="flex items-center text-red-500">
                  <X size={16} className="mr-1" />
                  <span>Invalid discount code</span>
                </div>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default DiscountForm;
