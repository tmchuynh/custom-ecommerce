import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Color, ProductDetailsProps, ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { capitalize } from "@/lib/utils/format";
import { Radio, RadioGroup } from "@headlessui/react";
import { JSX } from "react";

/**
 * A component that renders product details in an accordion format.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Detail>} [props.details=[]] - Array of product details to display
 * 
 * interface Detail {
 *    items: Object;
 * }

 * @returns {JSX.Element} A section containing an accordion of product details
 *
 * @example
 * const details = [{
 *   items: {
 *     detail1: { key1: "value1" },
 *     detail2: { key2: ["value2", "value3"] }
 *   }
 * }];
 *
 * <ProductDetails details={details} />
 */
const ProductDetails = ({ details = [] }: ProductDetailsProps): JSX.Element => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>

      <div className="border-t divide-y divide-gray-200">
        <Accordion type="single" collapsible>
          {details?.map((detail, index) => {
            const items = Object.values(detail?.items || {});
            return (
              <AccordionItem key={index} value={`detail-${index}`}>
                <AccordionTrigger className="group relative flex justify-between items-center py-6 w-full text-left">
                  <span className="group-data-open: font-medium text-lg">
                    Additional details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {items?.map((item, idx) => {
                    // Assuming each item is an object with a single key-value pair
                    const key = Object.keys(item);
                    const value = Object.values(item);

                    return (
                      <ul
                        key={idx}
                        role="list"
                        className="space-y-1 pl-5 text-sm/6 marker:text-primary list-disc"
                      >
                        {value.map((v, i) => {
                          return (
                            <li key={i} className="pl-2">
                              <p>
                                {capitalize(key[i]).toUpperCase()}:{" "}
                                <span>
                                  {typeof v === "string"
                                    ? v
                                    : v.map((val, idx) => {
                                        return (
                                          <span key={idx}>
                                            {val}
                                            {idx < v.length - 1 && ", "}
                                            {idx === v.length - 2 && "and "}
                                          </span>
                                        );
                                      })}
                                </span>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

const ProductColors = ({
  product,
  selectedColor,
  page,
  setSelectedColor,
}: {
  product: ProductType;
  page?: boolean;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
  selectedColor: Color;
}) => {
  return (
    <div>
      {product.colors.length > 0 && (
        <div className={cn("", { "mt-6": page })}>
          <h3
            className={cn("text-md font-medium mb-4", {
              hidden: page,
            })}
          >
            Color
          </h3>
          <fieldset aria-label="Choose a color">
            <RadioGroup
              value={selectedColor}
              onChange={(value: Color) => setSelectedColor(value)}
              className="flex flex-wrap items-center gap-3"
            >
              {product.colors.map((color: Color, index: number) => (
                <div key={index} className="flex flex-col items-start">
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Radio
                          key={index}
                          value={color}
                          aria-label={color.name}
                          className="relative flex justify-center items-center focus:outline-hidden -m-0.5 p-0.5 rounded-full data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1 cursor-pointer"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-dynamic border rounded-full size-8"
                            style={
                              {
                                "--bg-color": color.bgColor,
                              } as React.CSSProperties
                            }
                          />
                        </Radio>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{color.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
      )}
    </div>
  );
};

const components = { ProductDetails, ProductColors };
export default components;
