import { mockProductData } from "@/lib/constants/mockProductData";
import { NextResponse } from "next/server";

/**
 * @description This function handles the GET request for retrieving items based on gender and category.
 * @param {Request} _request - The incoming request object (not used in this function).
 * @param {object} props - An object containing the route parameters.
 * @param {Promise<{ gender: string; category: string }>} props.params - A promise that resolves to an object containing the gender and category.
 * @returns {NextResponse} A JSON response containing the items for the specified gender and category.
 */
export async function GET(
  _request: Request,
  props: { params: Promise<{ gender: string; category: string }> }
): Promise<NextResponse> {
  const params = await props.params;
  const { gender, category } = params;

  // Define types for the items object
  type Item = { name: string; slug: string; price: string };
  type Categories = { [key: string]: Item[] };
  type Items = { [key: string]: Categories };

  // Mock data for demonstration purposes

  const categoryData =
    (mockProductData as any)[gender.toLowerCase()]?.[category.toLowerCase()] ||
    [];

  return NextResponse.json(categoryData);
}
