import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { encryptKey } from "@/lib/utils/encryption";

/**
 * Handles POST requests for user authentication and login.
 *
 * @param request - The incoming HTTP request containing username and password in JSON body
 * @returns A NextResponse object with:
 *          - Success response (200) with JWT token set in cookies if credentials are valid
 *          - Error response (401) for invalid credentials
 *          - Error response (500) for internal server errors
 * @throws Will throw an error if request body cannot be parsed or if JWT signing fails
 */
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Simulated user data
    const users = [
      { username: "demo", password: "demo" },
      { username: "admin", password: "admin123" },
    ];

    // Simulated authentication logic
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const token = sign({ username }, process.env.JWT_SECRET || "secret", {
        expiresIn: "24h",
      });

      const encryptedToken = await encryptKey(token);

      const cookieStore = await cookies();
      cookieStore.set("token", encryptedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
