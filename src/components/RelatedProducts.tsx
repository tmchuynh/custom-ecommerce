import { ProductType } from "@/lib/types";
import { JSX } from "react";
import ProductCard from "./ProductCard";

/**
 * A React functional component that displays a list of related products
 * in a grid layout. This component is typically used to showcase products
 * that customers might also be interested in purchasing.
 *
 * @param {Object} props - The props object.
 * @param {ProductType[]} props.relatedProducts - An array of related product
 * objects to be displayed. Each product is rendered using the `ProductCard` component.
 *
 * @returns {JSX.Element} A section containing a heading and a grid of related products.
 */
const RelatedProducts = ({
  gender,
  category,
  toggleWishlist,
  wishlist,
  relatedProducts,
}: {
  gender: string;
  category: string;
  toggleWishlist: () => void;
  wishlist: Set<string>;
  relatedProducts: ProductType[];
}): JSX.Element => {
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
            category={category}
            gender={gender}
            product={product}
            key={prodIndex}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
