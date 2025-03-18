// /api/categories/[gender].ts
import { mockProductData } from "@/lib/mockProductData";
import { Gender, GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

/**
 * @description This function handles the GET request for retrieving shopping categories based on gender.
 * @param {Request} _request - The incoming request object (not used in the function).
 * @param {object} props - An object containing the route parameters.
 * @param {Promise<{ gender: Gender }>} props.params - A promise that resolves to an object containing the gender parameter.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing either the categories or an error message.
 */
export async function GET(
  _request: Request,
  props: { params: Promise<{ gender: Gender }> }
) {
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
