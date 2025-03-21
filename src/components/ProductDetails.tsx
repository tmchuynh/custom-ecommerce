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

export default ProductDetails;
