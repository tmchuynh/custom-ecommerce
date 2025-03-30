import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptKey } from "@/lib/utils";

const wishlist = new Map<string, string[]>();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const encryptedToken = (await cookies()).get("token")?.value;
    if (!encryptedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = await decryptKey(
      encryptedToken,
      process.env.JWT_SECRET || "secret"
    );

    // Simulated token decoding to get username
    const username = "demo"; // Replace with actual decoding logic if needed

    const userWishlist = wishlist.get(username) || [];
    const updatedWishlist = userWishlist.filter((item) => item !== params.id);
    wishlist.set(username, updatedWishlist);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
