import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ gender: string; category: string }> }
) {
  const params = await props.params;
  const { gender, category } = params;

  // Define types for the items object
  type Item = { name: string; slug: string; price: string };
  type Categories = { [key: string]: Item[] };
  type Items = { [key: string]: Categories };

  // Mock data for demonstration purposes

  const categoryData =
    (mockProductData as GenderCategories)[gender.toLowerCase()]?.[
      category.toLowerCase()
    ] || [];

  return NextResponse.json(categoryData);
}
