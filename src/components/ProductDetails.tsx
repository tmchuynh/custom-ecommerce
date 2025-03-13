import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Defining the types for the details and items
type DetailItem = {
  name: string;
  items: string[];
};

type ProductDetailsProps = {
  details: DetailItem[];
};

const ProductDetails = ({ details }: ProductDetailsProps) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>

      <div className="divide-y divide-gray-200 border-t">
        <Accordion type="single" collapsible>
          {details.map((detail, index) => (
            <AccordionItem key={detail.name} value={`detail-${index}`}>
              <h3>
                <AccordionTrigger className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span className="text-sm font-medium text-gray-900 group-data-open:text-indigo-600">
                    {detail.name}
                  </span>
                </AccordionTrigger>
              </h3>
              <AccordionContent className="pb-6">
                <ul
                  role="list"
                  className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                >
                  {detail.items.map((item, idx) => (
                    <li key={idx} className="pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductDetails;
