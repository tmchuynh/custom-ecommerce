// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.imageSrc}
        alt={product.imageAlt}
        width={400}
        height={400}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-xl font-bold text-gray-900">{product.price}</p>
        <Link
          href={`/shopping/${product.gender}/${product.category}/${product.item}/${product.slug}`}
          passHref
          legacyBehavior>
          <button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
