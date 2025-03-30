import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

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
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET || "secret");
    // TODO: Fetch user data from database using decoded token
    return NextResponse.json({
      user: decoded,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
