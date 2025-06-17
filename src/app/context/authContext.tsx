"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  email?: string;
  membershipTier: MembershipTier | null;
  membershipExpiry?: Date;
  membershipCancellationDate?: Date; // Date when membership was cancelled, still active until expiry
  joinedDate: Date;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  benefits: string[];
  discountPercentage: number;
  color: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  purchaseMembership: (
    tierName: string
  ) => Promise<{ success: boolean; message: string }>;
  cancelMembership: () => Promise<{ success: boolean; message: string }>;
  isLoggedIn: boolean;
  hasMembership: boolean;
  isMembershipCancelled: boolean;
  membershipDiscount: number;
}

export interface RegisterData {
  username: string;
  phoneNumber: string;
  password: string;
  email?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Predefined membership tiers
export const membershipTiers: MembershipTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    duration: 1,
    benefits: [
      "5% discount on all purchases",
      "Priority customer support",
      "Monthly newsletter",
    ],
    discountPercentage: 5,
    color: "bg-blue-500",
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    duration: 1,
    benefits: [
      "10% discount on all purchases",
      "Free next day shipping on orders",
      "Early access to new products",
      "Priority customer support",
      "Exclusive member events",
    ],
    discountPercentage: 10,
    color: "bg-purple-500",
  },
  {
    id: "vip",
    name: "VIP",
    price: 39.99,
    duration: 1,
    benefits: [
      "15% discount on all purchases",
      "Free overnight express on selected items",
      "Free next day shipping on all orders",
      "Early access to new products",
      "24/7 priority customer support",
      "Exclusive member events",
      "Personal shopping assistant",
      "Birthday gifts",
    ],
    discountPercentage: 15,
    color: "bg-amber-500",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Check if membership is still valid
        if (userData.membershipExpiry) {
          const expiryDate = new Date(userData.membershipExpiry);
          if (expiryDate < new Date()) {
            // Membership expired
            userData.membershipTier = null;
            userData.membershipExpiry = null;
          }
        }
        setUser(userData);
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const register = async (
    userData: RegisterData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if username already exists (simple simulation)
      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      if (existingUsers.find((u: any) => u.username === userData.username)) {
        return { success: false, message: "Username already exists" };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        membershipTier: null,
        joinedDate: new Date(),
      };

      // Save to "database" (localStorage)
      existingUsers.push({ ...userData, id: newUser.id });
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      setUser(newUser);
      return { success: true, message: "Registration successful!" };
    } catch (error) {
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // First check local registered users
      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const foundUser = existingUsers.find(
        (u: any) => u.username === username && u.password === password
      );

      if (foundUser) {
        // Local user found
        const loggedInUser: User = {
          id: foundUser.id,
          username: foundUser.username,
          phoneNumber: foundUser.phoneNumber,
          email: foundUser.email,
          membershipTier: foundUser.membershipTier || null,
          membershipExpiry: foundUser.membershipExpiry
            ? new Date(foundUser.membershipExpiry)
            : undefined,
          joinedDate: new Date(foundUser.joinedDate),
        };

        setUser(loggedInUser);
        return { success: true, message: "Login successful!" };
      }

      // If not found locally, try demo login with DummyJSON API
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (response.ok) {
          const demoUser = await response.json();

          // Create demo user object
          const loggedInUser: User = {
            id: `demo-${demoUser.id}`,
            username: demoUser.username,
            phoneNumber: demoUser.phone || "+1-555-0123",
            email: demoUser.email,
            membershipTier: null,
            joinedDate: new Date(),
          };

          setUser(loggedInUser);
          return {
            success: true,
            message: `Demo login successful! Welcome ${demoUser.firstName} ${demoUser.lastName}`,
          };
        }
      } catch (demoError) {
        console.error("Demo login failed:", demoError);
      }

      return { success: false, message: "Invalid username or password" };
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const purchaseMembership = async (
    tierName: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return {
        success: false,
        message: "Please log in to purchase a membership",
      };
    }

    const selectedTier = membershipTiers.find(
      (tier) => tier.name.toLowerCase() === tierName.toLowerCase()
    );
    if (!selectedTier) {
      return { success: false, message: "Invalid membership tier" };
    }

    try {
      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + selectedTier.duration);

      // Update user with new membership
      const updatedUser: User = {
        ...user,
        membershipTier: selectedTier,
        membershipExpiry: expiryDate,
      };

      // Update in "database"
      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = {
          ...existingUsers[userIndex],
          membershipTier: selectedTier,
          membershipExpiry: expiryDate,
        };
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      }

      setUser(updatedUser);
      return {
        success: true,
        message: `${selectedTier.name} membership purchased successfully!`,
      };
    } catch (error) {
      return { success: false, message: "Purchase failed. Please try again." };
    }
  };

  const cancelMembership = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (!user) {
      return {
        success: false,
        message: "Please log in to cancel membership",
      };
    }

    if (!hasMembership) {
      return {
        success: false,
        message: "No active membership to cancel",
      };
    }

    if (user.membershipCancellationDate) {
      return {
        success: false,
        message: "Membership is already cancelled",
      };
    }

    try {
      // Calculate the date when membership will end (21st of current month)
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // Set cancellation date to today
      const cancellationDate = new Date();

      // Set membership to end on the 21st of the current month
      // If today is after the 21st, it will end on the 21st of next month
      let endMonth = currentMonth;
      let endYear = currentYear;

      if (today.getDate() > 21) {
        endMonth += 1;
        if (endMonth > 11) {
          endMonth = 0;
          endYear += 1;
        }
      }

      const membershipEndDate = new Date(endYear, endMonth, 21, 23, 59, 59);

      // Update user with cancellation date and new expiry
      const updatedUser: User = {
        ...user,
        membershipCancellationDate: cancellationDate,
        membershipExpiry: membershipEndDate,
      };

      // Update in "database"
      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = {
          ...existingUsers[userIndex],
          membershipCancellationDate: cancellationDate,
          membershipExpiry: membershipEndDate,
        };
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      }

      setUser(updatedUser);

      const endDateString = membershipEndDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        success: true,
        message: `Membership cancelled successfully. Your benefits will remain active until ${endDateString}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: "Cancellation failed. Please try again.",
      };
    }
  };

  const isLoggedIn = !!user;
  const hasMembership = !!(
    user?.membershipTier &&
    user?.membershipExpiry &&
    new Date(user.membershipExpiry) > new Date()
  );
  const isMembershipCancelled = !!user?.membershipCancellationDate;
  const membershipDiscount = hasMembership
    ? user?.membershipTier?.discountPercentage || 0
    : 0;

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    purchaseMembership,
    cancelMembership,
    isLoggedIn,
    hasMembership,
    isMembershipCancelled,
    membershipDiscount,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
