import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { gender: string; category: string; item: string } }
) {
  const { gender, category, item } = params;

  // Mock data for demonstration purposes
  const itemDetails: {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          name: string;
          description: string;
          price: string;
        };
      };
    };
  } = {
    men: {
      shoes: {
        sneakers: {
          name: "Sneakers",
          description: "Comfortable sneakers for sports",
          price: "$50",
        },
        boots: {
          name: "Boots",
          description: "Durable boots for hiking",
          price: "$120",
        },
      },
    },
    women: {
      shoes: {
        heels: {
          name: "Heels",
          description: "Elegant heels for parties",
          price: "$80",
        },
        flats: {
          name: "Flats",
          description: "Casual flats for everyday use",
          price: "$40",
        },
      },
    },
    // Add more items for children...
  };

  const categoryData =
    itemDetails[gender.toLowerCase()]?.[category.toLowerCase()];
  const itemData = categoryData?.[item.toLowerCase()];

  if (!itemData) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(itemData);
}
