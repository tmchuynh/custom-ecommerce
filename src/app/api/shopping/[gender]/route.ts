// /api/categories/[gender].ts
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

// Sample mock data (replace with your actual data)
type Gender = "men" | "women" | "children";

const mockCategoryData: Record<
  Gender,
  { slug: string; name: string; description: string; imageSrc: string }[]
> = {
  men: [
    {
      slug: "clothing",
      name: "Clothing",
      description: "Fashionable clothing for men",
      imageSrc: "image-url",
    },
    {
      slug: "shoes",
      name: "Shoes",
      description: "Stylish shoes for men",
      imageSrc: "image-url",
    },
    {
      slug: "accessories",
      name: "Accessories",
      description: "Accessories for men",
      imageSrc: "image-url",
    },
  ],
  women: [
    {
      slug: "clothing",
      name: "Clothing",
      description: "Trendy clothing for women",
      imageSrc: "image-url",
    },
    {
      slug: "shoes",
      name: "Shoes",
      description: "Elegant shoes for women",
      imageSrc: "image-url",
    },
    {
      slug: "accessories",
      name: "Accessories",
      description: "Accessories for women",
      imageSrc: "image-url",
    },
  ],
  children: [
    {
      slug: "shoes",
      name: "Shoes",
      description: "Comfortable shoes for children",
      imageSrc: "image-url",
    },
    {
      slug: "clothing",
      name: "Clothing",
      description: "Clothing for kids",
      imageSrc: "image-url",
    },
  ],
};
export async function GET(request: Request, props: { params: Promise<{ gender: Gender }> }) {
  const params = await props.params;
  const { gender } = params;

  // Fetch category data based on gender
  const categories = (mockProductData as GenderCategories)[gender];

  if (!categories) {
    return NextResponse.json(
      { message: "No categories found" },
      { status: 404 }
    );
  }

  return NextResponse.json(categories);
}
