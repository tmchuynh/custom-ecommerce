// Base API URL for DummyJSON
const API_BASE_URL = "https://dummyjson.com";

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  password: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  bank: {
    cardNumber: string;
    cardType: string;
    cardExpire: string;
    iban: string;
  };
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

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
