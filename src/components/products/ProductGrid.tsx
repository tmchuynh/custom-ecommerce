import { ProductItem } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/app/context/currencyContext"; // Added import

interface ProductGridProps {
  products: ProductItem[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { formatPrice } = useCurrency(); // Added hook usage

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
        >
          <div className="bg-gray-200 group-hover:opacity-75 rounded-md aspect-w-1 w-full aspect-h-1 lg:h-80 overflow-hidden lg:aspect-none">
            <Image
              src={
                product.images?.[0] ||
                product.thumbnail ||
                "/placeholder-image.jpg"
              }
              alt={product.title}
              width={300}
              height={400}
              className="w-full lg:w-full h-full lg:h-full object-cover object-center"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-gray-700 text-sm dark:text-gray-300">
                <Link href={`/shopping/${product.category}/${product.id}`} legacyBehavior>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                {product.category}
              </p>
            </div>
            <p className="font-medium text-gray-900 text-sm dark:text-white">
              {formatPrice(product.price)} {/* Updated price display */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
