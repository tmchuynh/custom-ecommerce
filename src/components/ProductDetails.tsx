import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductDetailsProps } from "@/lib/types";
import { capitalize } from "@/lib/utils";

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
                  <span className="text-sm font-medium text-gray-900 group-data-open:text-indigo-600">
                    Details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ul
                    role="list"
                    className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                  >
                    {items?.map((item, idx) => {
                      // Assuming each item is an object with a single key-value pair
                      const key = Object.keys(item)[0];
                      const value = Object.values(item)[0];

                      return (
                        <li key={idx} className="pl-2">
                          <span className="underline underline-offset-4">
                            {capitalize(key)}
                          </span>
                          :{" "}
                          {typeof value === "string"
                            ? value
                            : Array.isArray(value)
                            ? value.map((val, i) => (
                                <span key={i}>
                                  {i > 0 && ", "}
                                  {val}
                                </span>
                              ))
                            : null}
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductDetails;
