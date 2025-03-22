import { ProductType } from "@/lib/types";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  return (
    <section
      aria-labelledby="related-heading"
      className="mt-10 px-4 py-16 sm:px-0"
    >
      <h3 id="related-heading" className="text-lg font-medium mb-4">
        Customers also bought
      </h3>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProducts.map((product, prodIndex) => (
          <ProductCard
            product={product}
            index={prodIndex}
            page={true}
            key={prodIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
