import { mockProductData } from "@/lib/mockProductData";
import { NextResponse } from "next/server";

/**
 * @description This function handles GET requests for specific items within a category, filtered by gender.
 * It retrieves item details based on the provided gender, category, and item parameters.
 * @param {Request} _request - The incoming request object (not used in the function).
 * @param {object} props - An object containing the route parameters.
 * @param {Promise<{ gender: string; category: string; item: string }>} props.params - A promise that resolves to an object containing the gender, category, and item parameters.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * If the item is found, it returns the item's data as a JSON response.
 * If the item is not found, it returns a 404 error with a "Product not found" message.
 */
export async function GET(
  _request: Request,
  props: { params: Promise<{ gender: string; category: string; item: string }> }
): Promise<NextResponse> {
  const params = await props.params;
  const { gender, category, item } = params;
  const categoryData = (mockProductData as any)[gender as string]?.[
    category as string
  ]?.[item as string];

  if (!categoryData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(categoryData);
}
