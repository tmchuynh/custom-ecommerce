import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { gender: string } }
) {
  const { gender } = params;

  // Mock data for demonstration purposes
  const categories = {
    men: ["Shirts", "Pants", "Shoes", "Accessories"],
    women: ["Dresses", "Tops", "Shoes", "Handbags"],
    children: ["Toys", "Clothing", "Footwear", "Accessories"],
  };

  const availableCategories =
    categories[gender.toLowerCase() as keyof typeof categories] || [];

  return NextResponse.json(availableCategories);
}
