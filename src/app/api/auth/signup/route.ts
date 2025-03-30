import { NextResponse } from "next/server";

/**
 * Handles POST requests for user signup.
 *
 * @param request - The incoming HTTP request containing user registration data
 * @returns A JSON response indicating success or failure
 *   - On success: Returns {success: true}
 *   - On error: Returns {error: string} with 500 status code
 *
 * @throws Will return a 500 error response if request parsing fails
 *
 * @example
 * // Request body format:
 * {
 *   username: string,
 *   email: string,
 *   password: string
 * }
 */

// Simulated in-memory user data
const users = new Map<string, { email: string; password: string }>();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (users.has(username)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    users.set(username, { email, password });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
