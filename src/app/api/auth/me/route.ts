import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { decryptKey } from "@/lib/utils/encryption";

/**
 * Handles HTTP GET requests for user authentication.
 * Retrieves user data based on JWT token stored in cookies.
 *
 * @async
 * @returns {Promise<NextResponse>} JSON response containing either:
 *   - On success: User data from decoded JWT token
 *   - On missing token: 401 Unauthorized error
 *   - On error: 500 Internal server error
 * @throws {JsonWebTokenError} When token verification fails
 */
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

    const decoded = verify(token, process.env.JWT_SECRET || "secret") as {
      username: string;
    };
    // Simulated user data
    const user = { username: decoded.username, email: "demo@example.com" };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
