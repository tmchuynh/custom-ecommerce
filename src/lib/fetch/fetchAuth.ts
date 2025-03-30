/**
 * Logs in a user by sending their credentials to the API.
 *
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to a success status.
 * @throws An error if the API request fails.
 */
export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Failed to log in");
  }
};

/**
 * Fetches the authenticated user's data from the API.
 *
 * @returns A promise that resolves to the user's data.
 * @throws An error if the API request fails.
 */
export const fetchUserData = async (): Promise<{
  username: string;
  email: string;
}> => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

/**
 * Signs up a new user by sending their registration data to the API.
 *
 * @param username - The username of the new user.
 * @param email - The email of the new user.
 * @param password - The password of the new user.
 * @returns A promise that resolves to a success status.
 * @throws An error if the API request fails.
 */
export const signup = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    throw new Error("Failed to sign up");
  }
};
