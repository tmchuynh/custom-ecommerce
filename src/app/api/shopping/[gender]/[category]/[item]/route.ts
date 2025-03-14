import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ gender: string; category: string; item: string }> }
) {
  const params = await props.params;
  const { gender, category, item } = params;
  const categoryData = (mockProductData as GenderCategories)[gender]?.[
    category
  ]?.[item];

  if (!categoryData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(categoryData);
}
