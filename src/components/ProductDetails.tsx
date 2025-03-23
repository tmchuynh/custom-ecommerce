import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Color, ProductDetailsProps, ProductType } from "@/lib/types";
import { capitalize, cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ProductDetails = ({ details }: ProductDetailsProps) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>

      <div className="divide-y divide-gray-200 border-t">
        <Accordion type="single" collapsible>
          {details.map((detail, index) => {
            const items = Object.values(detail.items);
            return (
              <AccordionItem key={index} value={`detail-${index}`}>
                <AccordionTrigger className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span className="text-lg font-medium group-data-open:">
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
                        className="list-disc space-y-1 pl-5 text-sm/6 marker:text-primary"
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
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-dynamic size-8 rounded-full border"
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
