// /api/shopping/[gender]/[category]/[item]/[slug]/route.ts
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

/**
 * @description This function handles the GET request for retrieving a specific product based on the provided parameters.
 * @param {Request} _request - The incoming request object (not used in the function).
 * @param {Object} props - An object containing the route parameters.
 * @param {Promise<{ gender: string; category: string; item: string; slug: string; }>} props.params - A promise that resolves to an object containing the gender, category, item, and slug parameters.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing either the product data or an error message.
 */
export async function GET(
  _request: Request,
  props: {
    params: Promise<{
      gender: string;
      category: string;
      item: string;
      slug: string;
    }>;
  }
): Promise<NextResponse> {
  const params = await props.params;
  const { gender, category, item, slug } = params;

  const productData = mockProductData[gender]?.[category]?.[item]?.[slug];

  if (!productData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productData);
}
