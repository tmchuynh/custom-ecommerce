// /api/shopping/[gender]/[category]/[item]/[slug]/route.ts
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

// API Route for product details
export async function GET(
  request: Request,
  props: {
    params: Promise<{ gender: string; category: string; item: string; slug: string }>;
  }
) {
  const params = await props.params;
  const { gender, category, item, slug } = params;

  const productData = (mockProductData as GenderCategories)[gender]?.[
    category
  ]?.[item]?.[slug];

  if (!productData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productData);
}
