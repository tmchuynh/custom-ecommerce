import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptKey } from "@/lib/utils/encryption";

/**
 * Retrieves the user's wishlist items.
 *
 * @async
 * @returns {Promise<NextResponse>} A promise that resolves to:
 *  - Success: JSON response with an array of wishlist items
 *  - Error 401: If no authentication token is found in cookies
 *  - Error 500: If an internal server error occurs
 * @throws {Error} When there's an issue accessing cookies or processing the request
 */
const wishlist = new Map<string, string[]>();

export async function GET(): Promise<NextResponse> {
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
    return NextResponse.json({ items: userWishlist });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
/**
 * Handles POST requests to add items to a user's wishlist.
 *
 * @param request - The incoming HTTP request containing the product ID in the request body
 * @returns A JSON response indicating success or error
 * @throws {401} If no authentication token is present in cookies
 * @throws {500} If an internal server error occurs during processing
 *
 * @example
 * // Request body format:
 * {
 *   "productId": string
 * }
 *
 * // Success response:
 * {
 *   "success": true
 * }
 */
export async function POST(request: Request) {
  try {
    const encryptedToken = (await cookies()).get("token")?.value;
    if (!encryptedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = await decryptKey(
      encryptedToken,
      process.env.JWT_SECRET || "secret"
    );

    const { productId } = await request.json();

    // Simulated token decoding to get username
    const username = "demo"; // Replace with actual decoding logic if needed

    const userWishlist = wishlist.get(username) || [];
    userWishlist.push(productId);
    wishlist.set(username, userWishlist);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
