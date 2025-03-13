import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { gender: string; category: string } }
) {
  const { gender, category } = params;

  // Define types for the items object
  type Item = { name: string; slug: string; price: string };
  type Categories = { [key: string]: Item[] };
  type Items = { [key: string]: Categories };

  // Mock data for demonstration purposes
  const items: Items = {
    men: {
      shoes: [
        { name: "Sneakers", slug: "sneakers", price: "$50" },
        { name: "Boots", slug: "boots", price: "$120" },
      ],
      shirts: [
        { name: "Basic Shirt", slug: "basic-shirt", price: "$30" },
        { name: "Formal Shirt", slug: "formal-shirt", price: "$60" },
      ],
    },
    women: {
      shoes: [
        { name: "Heels", slug: "heels", price: "$80" },
        { name: "Flats", slug: "flats", price: "$40" },
      ],
      dresses: [
        { name: "Summer Dress", slug: "summer-dress", price: "$50" },
        { name: "Evening Dress", slug: "evening-dress", price: "$120" },
      ],
    },
    // Add categories for children...
  };

  const categoryData =
    items[gender.toLowerCase()]?.[category.toLowerCase()] || [];

  return NextResponse.json(categoryData);
}
