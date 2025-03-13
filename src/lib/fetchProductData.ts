// lib/fetchProductData.ts

export const fetchProductData = async (
  gender: string,
  category: string,
  item: string,
  slug: string
) => {
  const res = await fetch(
    `/api/products/${gender}/${category}/${item}/${slug}`
  );
  if (!res.ok) {
    throw new Error("Product data not found");
  }
  return res.json();
};
