// lib/fetchProductData.ts

/**
 * Fetches product data from the API based on the provided parameters.
 *
 * @param gender - The gender category of the product.
 * @param category - The category of the product.
 * @param item - The specific item type.
 * @param slug - The unique slug identifier for the product.
 * @returns A promise that resolves to the product data.
 * @throws An error if the API request fails.
 */
export const fetchProductData = async (
  gender: string,
  category: string,
  slug: string
): Promise<any> => {
  const res = await fetch(`/api/shopping/${gender}/${category}/${slug}`);
  if (!res.ok) {
    throw new Error("Product data not found");
  }
  return res.json();
};
