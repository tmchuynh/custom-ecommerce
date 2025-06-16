import { DummyUser, DummyUsersResponse } from "@/lib/interfaces/user";
import { API_BASE_URL } from ".";

/**
 * Fetches a random user from DummyJSON API for demo purposes
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
 * Fetches multiple users from DummyJSON API
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
 * Fetches demo login credentials for testing purposes
 * Returns a user with username and password for demo login
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
 * Fetches a specific user by ID from DummyJSON API
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
