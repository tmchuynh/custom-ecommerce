// /api/categories/[gender].ts
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

// Sample mock data (replace with your actual data)
type Gender = "men" | "women" | "children";

export async function GET(
  request: Request,
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
