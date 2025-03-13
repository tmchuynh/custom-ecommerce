// /api/products/[gender]/[category]/[item]/[slug]/route.ts
import { GenderCategories } from "@/lib/types";
import { NextResponse } from "next/server";

// Sample mock product data (use your real data here)
const mockProductData: GenderCategories = {
  men: {
    clothing: {
      tops: {
        notebook: {
          name: "Notebook Shirt",
          price: "$25",
          description: "A comfortable shirt with notebook print",
        },
      },
    },
    shoes: {
      sneakers: {
        "blue-sneakers": {
          name: "Blue Sneakers",
          price: "$50",
          description: "Stylish blue sneakers",
        },
      },
    },
  },
  women: {
    clothing: {
      tops: {
        "floral-top": {
          name: "Floral Top",
          price: "$30",
          description: "A beautiful floral print top",
        },
      },
    },
    accessories: {
      handbag: {
        "leather-bag": {
          name: "Leather Handbag",
          price: "$120",
          description: "Elegant leather handbag",
        },
      },
    },
  },
  children: {
    shoes: {
      sneakers: {
        "green-sneakers": {
          name: "Green Sneakers",
          price: "$40",
          description: "Comfy green sneakers for kids",
        },
      },
    },
  },
};

// API Route for product details
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { gender: string; category: string; item: string; slug: string };
  }
) {
  const { gender, category, item, slug } = params;

  // Access the data using the parameters
  const productData = mockProductData[gender]?.[category]?.[item]?.[slug];

  if (!productData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productData);
}
