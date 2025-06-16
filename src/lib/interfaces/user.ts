export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  password: string;
  image: string;
  role: string; // Added from DummyJSON /auth/me
  birthDate: string;
  gender: string;
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
  university: string;
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}