import { DummyUser, DummyUsersResponse } from "@/lib/interfaces/user";
import { API_BASE_URL } from ".";

/**
 * Fetches a random user from the API.
 *
 * This function generates a random user ID between 1 and 100, then sends a request
 * to the API to retrieve the corresponding user data. If the request fails, an error
 * is thrown and logged to the console.
 *
 * @returns {Promise<DummyUser>} A promise that resolves to a `DummyUser` object.
 * @throws Will throw an error if the network request fails or the response is not OK.
 */
export async function fetchRandomUser(): Promise<DummyUser> {
  try {
    // Get a random user ID between 1 and 100
    const randomId = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`${API_BASE_URL}/users/${randomId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const user: DummyUser = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching random user:", error);
    throw error;
  }
}

/**
 * Fetches a list of users from the API with optional pagination.
 *
 * @param limit - The maximum number of users to retrieve. Defaults to 10.
 * @param skip - The number of users to skip for pagination. Defaults to 0.
 * @returns A promise that resolves to a `DummyUsersResponse` containing the users data.
 * @throws Will throw an error if the network request fails or the response is not OK.
 */
export async function fetchUsers(
  limit: number = 10,
  skip: number = 0
): Promise<DummyUsersResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data: DummyUsersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

/**
 * Fetches demo user credentials by retrieving a random user.
 *
 * @returns A promise that resolves to an object containing the username, password, and full name of the demo user.
 * @throws Will throw an error if fetching the random user fails.
 */
export async function fetchDemoCredentials(): Promise<{
  username: string;
  password: string;
  fullName: string;
}> {
  try {
    const user = await fetchRandomUser();
    return {
      username: user.username,
      password: user.password,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  } catch (error) {
    console.error("Error fetching demo credentials:", error);
    throw error;
  }
}

/**
 * Fetches a user by their unique ID from the API.
 *
 * @param userId - The unique identifier of the user to fetch.
 * @returns A promise that resolves to a `DummyUser` object containing the user's data.
 * @throws Will throw an error if the network request fails or the response is not OK.
 */
export async function fetchUserById(userId: number): Promise<DummyUser> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const user: DummyUser = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}
