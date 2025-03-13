"use client"; // Ensure this component is rendered on the client side

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const CategoryPage = () => {
  const [isClient, setIsClient] = useState(false); // Track if component is client-side
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { gender, category, item } = useParams(); // We will get params dynamically from this

  useEffect(() => {
    setIsClient(true); // Set isClient to true after the component has mounted
  }, []);

  useEffect(() => {
    if (gender && category && item) {
      const fetchProductData = async () => {
        try {
          // Ensure URL construction matches API
          const response = await fetch(
            `/api/shopping/${gender}/${category}/${item}`
          );
          const data = await response.json();

          if (response.ok) {
            setProducts(data); // Set products when data is fetched
          } else {
            console.error("Product data not found");
          }
        } catch (error) {
          console.error("Error fetching product data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [gender, category, item]);

  if (!isClient || loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {gender && (
            <>
              {typeof gender === "string" &&
                gender.charAt(0).toUpperCase() + gender.slice(1)}{" "}
              / {category} / {item}
              Categories
            </>
          )}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{product.price}</p>
              <button className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
