import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const wishlist = new Map<string, string[]>();

export async function DELETE(_request: Request, _context: unknown) {
  const { params } = _context as { params: Record<string, string> };
  try {
    const encryptedToken = (await cookies()).get("token")?.value;
    if (!encryptedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
