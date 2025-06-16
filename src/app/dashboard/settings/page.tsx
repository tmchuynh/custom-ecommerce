"use client";

import { DummyUser, fetchUserById } from "@/api/users";
import { useAuth } from "@/app/context/authContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Bell,
  Check,
  CreditCard,
  Edit2,
  Lock,
  MapPin,
  Plus,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SettingsFormData {
  username: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  isFromAPI: boolean;
}

interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardType: string;
  cardExpire: string;
  cardHolderName: string;
  isDefault: boolean;
  isFromAPI: boolean;
}

interface NotificationSettings {
  emailMarketing: boolean;
  emailOrders: boolean;
  emailSecurity: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  dataSharing: boolean;
  analyticsTracking: boolean;
  personalizedAds: boolean;
}

export default function SettingsPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState<SettingsFormData>({
    username: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailMarketing: true,
    emailOrders: true,
    emailSecurity: true,
    pushNotifications: false,
    smsNotifications: false,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "private",
    dataSharing: false,
    analyticsTracking: true,
    personalizedAds: false,
  });

  const [userData, setUserData] = useState<DummyUser | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newAddress, setNewAddress] = useState<
    Omit<Address, "id" | "isDefault" | "isFromAPI">
  >({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });
  const [newPaymentMethod, setNewPaymentMethod] = useState<
    Omit<PaymentMethod, "id" | "isDefault" | "isFromAPI">
  >({
    cardNumber: "",
    cardType: "",
    cardExpire: "",
    cardHolderName: "",
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<string | null>(null);
  const [editAddressData, setEditAddressData] = useState<
    Omit<Address, "id" | "isDefault" | "isFromAPI">
  >({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });
  const [editPaymentData, setEditPaymentData] = useState<
    Omit<PaymentMethod, "id" | "isDefault" | "isFromAPI">
  >({
    cardNumber: "",
    cardType: "",
    cardExpire: "",
    cardHolderName: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (user) {
      // Extract the DummyJSON user ID from the user ID
      let apiUserId = 1; // default fallback

      if (user.id.startsWith("demo-")) {
        // Extract the original DummyJSON user ID
        const demoId = user.id.replace("demo-", "");
        apiUserId = parseInt(demoId) || 1;
      } else {
        // For local users, use a consistent ID based on username hash or default to 1
        apiUserId =
          (Math.abs(
            user.username.split("").reduce((a, b) => {
              a = (a << 5) - a + b.charCodeAt(0);
              return a & a;
            }, 0)
          ) %
            30) +
          1; // Use hash to get a number between 1-30
      }

      // Load user data from DummyJSON API for demo purposes
      fetchUserById(apiUserId)
        .then((apiUser: DummyUser) => {
          setUserData(apiUser);
          setFormData((prev) => ({
            ...prev,
            username: apiUser.username || user.username || "",
            email: apiUser.email || user.email || "",
            phoneNumber: apiUser.phone || user.phoneNumber || "",
            firstName: apiUser.firstName || "",
            lastName: apiUser.lastName || "",
            middleName: "", // Not provided by API
          }));

          // Set addresses from API
          if (apiUser.address) {
            setAddresses([
              {
                id: "1",
                address: apiUser.address.address,
                city: apiUser.address.city,
                state: apiUser.address.state,
                postalCode: apiUser.address.postalCode,
                country: apiUser.address.country,
                isDefault: true,
                isFromAPI: true,
              },
            ]);
          }

          // Set payment methods from API
          if (apiUser.bank) {
            setPaymentMethods([
              {
                id: "1",
                cardNumber: apiUser.bank.cardNumber,
                cardType: apiUser.bank.cardType,
                cardExpire: apiUser.bank.cardExpire,
                cardHolderName: `${apiUser.firstName} ${apiUser.lastName}`,
                isDefault: true,
                isFromAPI: true,
              },
            ]);
          }
        })
        .catch((error: Error) => {
          console.error("Failed to fetch user data:", error);
          // Fallback to just setting the basic user info
          setFormData((prev) => ({
            ...prev,
            username: user.username || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
          }));
        });
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center bg-background min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">Access Denied</h1>
          <p className="mb-4 text-muted-foreground">
            Please log in to access your settings.
          </p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof SettingsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings,
    value: boolean
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field: keyof PrivacySettings, value: any) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));
  };

  const validateAddress = (
    address: Omit<Address, "id" | "isDefault" | "isFromAPI">
  ) => {
    const errors: string[] = [];

    if (!address.address.trim()) errors.push("Street address is required");
    if (!address.city.trim()) errors.push("City is required");
    if (!address.state.trim()) errors.push("State/Province is required");
    if (!address.postalCode.trim()) errors.push("ZIP/Postal code is required");
    if (!address.country.trim()) errors.push("Country is required");

    // Additional validations
    if (address.address.length < 5)
      errors.push("Street address must be at least 5 characters");
    if (address.city.length < 2)
      errors.push("City must be at least 2 characters");
    if (address.postalCode.length < 3)
      errors.push("Postal code must be at least 3 characters");

    return errors;
  };

  const validatePaymentMethod = (
    payment: Omit<PaymentMethod, "id" | "isDefault" | "isFromAPI">
  ) => {
    const errors: string[] = [];

    if (!payment.cardHolderName.trim())
      errors.push("Cardholder name is required");
    if (!payment.cardNumber.trim()) errors.push("Card number is required");
    if (!payment.cardExpire.trim()) errors.push("Expiry date is required");

    // Additional validations
    if (payment.cardHolderName.length < 2)
      errors.push("Cardholder name must be at least 2 characters");

    const cardNumberClean = payment.cardNumber.replace(/\s+/g, "");
    if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      errors.push("Card number must be between 13-19 digits");
    }

    // Basic Luhn algorithm check
    if (cardNumberClean.length >= 13 && !isValidCreditCard(cardNumberClean)) {
      errors.push("Invalid card number");
    }

    // Expiry date validation (MM/YY format)
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(payment.cardExpire)) {
      errors.push("Expiry date must be in MM/YY format");
    } else {
      const [month, year] = payment.cardExpire.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      const expYear = parseInt(year);
      const expMonth = parseInt(month);

      if (
        expYear < currentYear ||
        (expYear === currentYear && expMonth < currentMonth)
      ) {
        errors.push("Card has expired");
      }
    }

    return errors;
  };

  const isValidCreditCard = (cardNumber: string): boolean => {
    // Simple Luhn algorithm implementation
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleAddAddress = async () => {
    const validationErrors = validateAddress(newAddress);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]); // Show first error
      return;
    }

    setIsLoading(true);
    try {
      const newAddressWithId: Address = {
        ...newAddress,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
        isFromAPI: false,
      };

      setAddresses((prev) => [...prev, newAddressWithId]);
      setNewAddress({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
      });
      setShowAddAddress(false);
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("Failed to add address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    const validationErrors = validatePaymentMethod(newPaymentMethod);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]); // Show first error
      return;
    }

    setIsLoading(true);
    try {
      const newPaymentWithId: PaymentMethod = {
        ...newPaymentMethod,
        id: Date.now().toString(),
        isDefault: paymentMethods.length === 0,
        cardType:
          newPaymentMethod.cardType ||
          detectCardType(newPaymentMethod.cardNumber),
        isFromAPI: false,
      };

      setPaymentMethods((prev) => [...prev, newPaymentWithId]);
      setNewPaymentMethod({
        cardNumber: "",
        cardType: "",
        cardExpire: "",
        cardHolderName: "",
      });
      setShowAddPayment(false);
      toast.success("Payment method added successfully!");
    } catch (error) {
      toast.error("Failed to add payment method. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAddress = async (addressId: string) => {
    const address = addresses.find((a) => a.id === addressId);
    if (address?.isFromAPI) {
      toast.error("Cannot remove address from API");
      return;
    }

    setIsLoading(true);
    try {
      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
      toast.success("Address removed successfully!");
    } catch (error) {
      toast.error("Failed to remove address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePaymentMethod = async (paymentId: string) => {
    const payment = paymentMethods.find((p) => p.id === paymentId);
    if (payment?.isFromAPI) {
      toast.error("Cannot remove payment method from API");
      return;
    }

    setIsLoading(true);
    try {
      setPaymentMethods((prev) => prev.filter((p) => p.id !== paymentId));
      toast.success("Payment method removed successfully!");
    } catch (error) {
      toast.error("Failed to remove payment method. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    if (address.isFromAPI) {
      toast.error("Cannot edit address from API");
      return;
    }

    setEditingAddress(address.id);
    setEditAddressData({
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    });
  };

  const handleSaveEditAddress = async () => {
    if (!editingAddress) return;

    const validationErrors = validateAddress(editAddressData);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    setIsLoading(true);
    try {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress ? { ...addr, ...editAddressData } : addr
        )
      );

      setEditingAddress(null);
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPayment = (payment: PaymentMethod) => {
    if (payment.isFromAPI) {
      toast.error("Cannot edit payment method from API");
      return;
    }

    setEditingPayment(payment.id);
    setEditPaymentData({
      cardNumber: payment.cardNumber,
      cardType: payment.cardType,
      cardExpire: payment.cardExpire,
      cardHolderName: payment.cardHolderName,
    });
  };

  const handleSaveEditPayment = async () => {
    if (!editingPayment) return;

    const validationErrors = validatePaymentMethod(editPaymentData);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    setIsLoading(true);
    try {
      setPaymentMethods((prev) =>
        prev.map((payment) =>
          payment.id === editingPayment
            ? {
                ...payment,
                ...editPaymentData,
                cardType:
                  editPaymentData.cardType ||
                  detectCardType(editPaymentData.cardNumber),
              }
            : payment
        )
      );

      setEditingPayment(null);
      toast.success("Payment method updated successfully!");
    } catch (error) {
      toast.error("Failed to update payment method. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    setEditingPayment(null);
    setEditAddressData({
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    });
    setEditPaymentData({
      cardNumber: "",
      cardType: "",
      cardExpire: "",
      cardHolderName: "",
    });
  };

  const detectCardType = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (cleaned.startsWith("4")) return "Visa";
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "Mastercard";
    if (cleaned.startsWith("3")) return "American Express";
    if (cleaned.startsWith("6")) return "Discover";
    return "Unknown";
  };

  const formatCardNumber = (number: string): string => {
    const cleaned = number.replace(/\s+/g, "");
    const masked = "•••• •••• •••• " + cleaned.slice(-4);
    return masked;
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Notification preferences saved!");
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Privacy settings saved!");
    } catch (error) {
      toast.error("Failed to save privacy settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logout();
      router.push("/");
      toast.success("Account deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile & Personal Info", icon: User },
    { id: "security", label: "Security & Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Data", icon: Shield },
    { id: "billing", label: "Billing & Payment", icon: CreditCard },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="font-bold text-3xl">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <div className="gap-8 grid lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile & Personal Information
                  </CardTitle>
                  {userData && (
                    <p className="text-muted-foreground text-sm">
                      All personal information (username, email, phone, address,
                      payment methods) is from the same DummyJSON API user (ID:{" "}
                      {userData.id}) - {userData.firstName} {userData.lastName}.
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Read-only user info from auth */}
                  <div className="gap-4 grid md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username (Read-only)</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        readOnly
                        className="bg-muted"
                        placeholder="Username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Read-only)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        readOnly
                        className="bg-muted"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number (Read-only)
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      readOnly
                      className="bg-muted"
                      placeholder="Phone number"
                    />
                  </div>

                  <Separator />

                  {/* Editable name fields */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Personal Information
                    </h3>
                    <div className="gap-4 grid md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          value={formData.middleName}
                          onChange={(e) =>
                            handleInputChange("middleName", e.target.value)
                          }
                          placeholder="Enter middle name (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Management */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Saved Addresses
                        </h3>
                        {userData && (
                          <p className="text-muted-foreground text-sm">
                            Address belongs to {userData.firstName}{" "}
                            {userData.lastName}. Existing addresses cannot be
                            edited or removed.
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddAddress(true)}
                      >
                        <Plus className="mr-2 w-4 h-4" />
                        Add Address
                      </Button>
                    </div>

                    {addresses.length > 0 ? (
                      <div className="space-y-3">
                        {addresses.map((address) => (
                          <Card key={address.id} className="p-4">
                            {editingAddress === address.id ? (
                              // Edit mode
                              <div className="space-y-4">
                                <h4 className="font-medium">Edit Address</h4>
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <Label htmlFor="editAddress">
                                      Street Address
                                    </Label>
                                    <Input
                                      id="editAddress"
                                      value={editAddressData.address}
                                      onChange={(e) =>
                                        setEditAddressData((prev) => ({
                                          ...prev,
                                          address: e.target.value,
                                        }))
                                      }
                                      placeholder="Enter street address"
                                    />
                                  </div>
                                  <div className="gap-4 grid md:grid-cols-3">
                                    <div className="space-y-2">
                                      <Label htmlFor="editCity">City</Label>
                                      <Input
                                        id="editCity"
                                        value={editAddressData.city}
                                        onChange={(e) =>
                                          setEditAddressData((prev) => ({
                                            ...prev,
                                            city: e.target.value,
                                          }))
                                        }
                                        placeholder="Enter city"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editState">
                                        State/Province
                                      </Label>
                                      <Input
                                        id="editState"
                                        value={editAddressData.state}
                                        onChange={(e) =>
                                          setEditAddressData((prev) => ({
                                            ...prev,
                                            state: e.target.value,
                                          }))
                                        }
                                        placeholder="Enter state"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editZipCode">
                                        ZIP/Postal Code
                                      </Label>
                                      <Input
                                        id="editZipCode"
                                        value={editAddressData.postalCode}
                                        onChange={(e) =>
                                          setEditAddressData((prev) => ({
                                            ...prev,
                                            postalCode: e.target.value,
                                          }))
                                        }
                                        placeholder="Enter ZIP code"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editCountry">Country</Label>
                                    <Select
                                      value={editAddressData.country}
                                      onValueChange={(value) =>
                                        setEditAddressData((prev) => ({
                                          ...prev,
                                          country: value,
                                        }))
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="US">
                                          United States
                                        </SelectItem>
                                        <SelectItem value="CA">
                                          Canada
                                        </SelectItem>
                                        <SelectItem value="GB">
                                          United Kingdom
                                        </SelectItem>
                                        <SelectItem value="AU">
                                          Australia
                                        </SelectItem>
                                        <SelectItem value="DE">
                                          Germany
                                        </SelectItem>
                                        <SelectItem value="FR">
                                          France
                                        </SelectItem>
                                        <SelectItem value="JP">
                                          Japan
                                        </SelectItem>
                                        <SelectItem value="CN">
                                          China
                                        </SelectItem>
                                        <SelectItem value="IN">
                                          India
                                        </SelectItem>
                                        <SelectItem value="BR">
                                          Brazil
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={handleSaveEditAddress}
                                    disabled={isLoading}
                                    size="sm"
                                  >
                                    <Check className="mr-2 w-4 h-4" />
                                    {isLoading ? "Saving..." : "Save"}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="mr-2 w-4 h-4" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              // View mode
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium">
                                      {address.isDefault && (
                                        <span className="bg-primary mr-2 px-2 py-1 rounded text-primary-foreground text-xs">
                                          Default
                                        </span>
                                      )}
                                      {address.isFromAPI && (
                                        <span className="bg-blue-500 mr-2 px-2 py-1 rounded text-white text-xs">
                                          API
                                        </span>
                                      )}
                                      Address
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground text-sm">
                                    {address.address}
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    {address.city}, {address.state}{" "}
                                    {address.postalCode}
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    {address.country}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {address.isFromAPI ? (
                                    <span className="text-muted-foreground text-xs">
                                      Cannot be edited or removed
                                    </span>
                                  ) : (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleEditAddress(address)
                                        }
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                          handleRemoveAddress(address.id)
                                        }
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No saved addresses
                      </p>
                    )}

                    {/* Add New Address Form */}
                    {showAddAddress && (
                      <Card className="p-4 border-dashed">
                        <div className="space-y-4">
                          <h4 className="font-medium">Add New Address</h4>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="newAddress">Street Address</Label>
                              <Input
                                id="newAddress"
                                value={newAddress.address}
                                onChange={(e) =>
                                  setNewAddress((prev) => ({
                                    ...prev,
                                    address: e.target.value,
                                  }))
                                }
                                placeholder="Enter street address"
                              />
                            </div>
                            <div className="gap-4 grid md:grid-cols-3">
                              <div className="space-y-2">
                                <Label htmlFor="newCity">City</Label>
                                <Input
                                  id="newCity"
                                  value={newAddress.city}
                                  onChange={(e) =>
                                    setNewAddress((prev) => ({
                                      ...prev,
                                      city: e.target.value,
                                    }))
                                  }
                                  placeholder="Enter city"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="newState">State/Province</Label>
                                <Input
                                  id="newState"
                                  value={newAddress.state}
                                  onChange={(e) =>
                                    setNewAddress((prev) => ({
                                      ...prev,
                                      state: e.target.value,
                                    }))
                                  }
                                  placeholder="Enter state"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="newZipCode">
                                  ZIP/Postal Code
                                </Label>
                                <Input
                                  id="newZipCode"
                                  value={newAddress.postalCode}
                                  onChange={(e) =>
                                    setNewAddress((prev) => ({
                                      ...prev,
                                      postalCode: e.target.value,
                                    }))
                                  }
                                  placeholder="Enter ZIP code"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newCountry">Country</Label>
                              <Select
                                value={newAddress.country}
                                onValueChange={(value) =>
                                  setNewAddress((prev) => ({
                                    ...prev,
                                    country: value,
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="US">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="CA">Canada</SelectItem>
                                  <SelectItem value="GB">
                                    United Kingdom
                                  </SelectItem>
                                  <SelectItem value="AU">Australia</SelectItem>
                                  <SelectItem value="DE">Germany</SelectItem>
                                  <SelectItem value="FR">France</SelectItem>
                                  <SelectItem value="JP">Japan</SelectItem>
                                  <SelectItem value="CN">China</SelectItem>
                                  <SelectItem value="IN">India</SelectItem>
                                  <SelectItem value="BR">Brazil</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleAddAddress}
                              disabled={isLoading}
                              size="sm"
                            >
                              {isLoading ? "Adding..." : "Add Address"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAddAddress(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Saving..." : "Save Profile"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security & Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          handleInputChange("currentPassword", e.target.value)
                        }
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          handleInputChange("newPassword", e.target.value)
                        }
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button onClick={handleChangePassword} disabled={isLoading}>
                      {isLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Active Sessions</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage and monitor your active sessions across different
                      devices.
                    </p>
                    <Button variant="outline">View Active Sessions</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="emailOrders">Order Updates</Label>
                          <p className="text-muted-foreground text-sm">
                            Receive emails about your order status and shipping
                            updates
                          </p>
                        </div>
                        <Switch
                          id="emailOrders"
                          checked={notifications.emailOrders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("emailOrders", checked)
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="emailMarketing">
                            Marketing & Promotions
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            Receive emails about sales, new products, and
                            special offers
                          </p>
                        </div>
                        <Switch
                          id="emailMarketing"
                          checked={notifications.emailMarketing}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("emailMarketing", checked)
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="emailSecurity">Security Alerts</Label>
                          <p className="text-muted-foreground text-sm">
                            Receive emails about account security and login
                            activity
                          </p>
                        </div>
                        <Switch
                          id="emailSecurity"
                          checked={notifications.emailSecurity}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("emailSecurity", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Push Notifications
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="pushNotifications">
                          Browser Notifications
                        </Label>
                        <p className="text-muted-foreground text-sm">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("pushNotifications", checked)
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">SMS Notifications</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="smsNotifications">Text Messages</Label>
                        <p className="text-muted-foreground text-sm">
                          Receive important updates via SMS
                        </p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("smsNotifications", checked)
                        }
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Saving..." : "Save Notification Preferences"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Data Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Profile Visibility
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">
                        Who can see your profile?
                      </Label>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(
                          value: "public" | "private" | "friends"
                        ) => handlePrivacyChange("profileVisibility", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Data & Analytics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="dataSharing">Data Sharing</Label>
                          <p className="text-muted-foreground text-sm">
                            Allow sharing of anonymized data with partners
                          </p>
                        </div>
                        <Switch
                          id="dataSharing"
                          checked={privacy.dataSharing}
                          onCheckedChange={(checked) =>
                            handlePrivacyChange("dataSharing", checked)
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="analyticsTracking">
                            Analytics Tracking
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            Help us improve our service by allowing analytics
                            tracking
                          </p>
                        </div>
                        <Switch
                          id="analyticsTracking"
                          checked={privacy.analyticsTracking}
                          onCheckedChange={(checked) =>
                            handlePrivacyChange("analyticsTracking", checked)
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="personalizedAds">
                            Personalized Advertising
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            Show ads based on your interests and activity
                          </p>
                        </div>
                        <Switch
                          id="personalizedAds"
                          checked={privacy.personalizedAds}
                          onCheckedChange={(checked) =>
                            handlePrivacyChange("personalizedAds", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Data Export & Deletion
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Manage your personal data and account
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">Export My Data</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 w-4 h-4" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              disabled={isLoading}
                            >
                              {isLoading ? "Deleting..." : "Delete Account"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <Button
                    onClick={handleSavePrivacy}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Saving..." : "Save Privacy Settings"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Billing & Payment Methods
                  </CardTitle>
                  {userData && (
                    <p className="text-muted-foreground text-sm">
                      Payment information belongs to {userData.firstName}{" "}
                      {userData.lastName} (User ID: {userData.id}). Existing
                      methods cannot be edited or removed, but you can add new
                      ones.
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Payment Methods</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddPayment(true)}
                      >
                        <Plus className="mr-2 w-4 h-4" />
                        Add Payment Method
                      </Button>
                    </div>

                    {paymentMethods.length > 0 ? (
                      <div className="space-y-3">
                        {paymentMethods.map((payment) => (
                          <Card key={payment.id} className="p-4">
                            {editingPayment === payment.id ? (
                              // Edit mode
                              <div className="space-y-4">
                                <h4 className="font-medium">
                                  Edit Payment Method
                                </h4>
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <Label htmlFor="editCardHolderName">
                                      Cardholder Name
                                    </Label>
                                    <Input
                                      id="editCardHolderName"
                                      value={editPaymentData.cardHolderName}
                                      onChange={(e) =>
                                        setEditPaymentData((prev) => ({
                                          ...prev,
                                          cardHolderName: e.target.value,
                                        }))
                                      }
                                      placeholder="Enter cardholder name"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editCardNumber">
                                      Card Number
                                    </Label>
                                    <Input
                                      id="editCardNumber"
                                      value={editPaymentData.cardNumber}
                                      onChange={(e) =>
                                        setEditPaymentData((prev) => ({
                                          ...prev,
                                          cardNumber: e.target.value,
                                        }))
                                      }
                                      placeholder="1234 5678 9012 3456"
                                      maxLength={19}
                                    />
                                  </div>
                                  <div className="gap-4 grid md:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="editCardExpire">
                                        Expiry Date
                                      </Label>
                                      <Input
                                        id="editCardExpire"
                                        value={editPaymentData.cardExpire}
                                        onChange={(e) =>
                                          setEditPaymentData((prev) => ({
                                            ...prev,
                                            cardExpire: e.target.value,
                                          }))
                                        }
                                        placeholder="MM/YY"
                                        maxLength={5}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editCardType">
                                        Card Type
                                      </Label>
                                      <Select
                                        value={editPaymentData.cardType}
                                        onValueChange={(value) =>
                                          setEditPaymentData((prev) => ({
                                            ...prev,
                                            cardType: value,
                                          }))
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select card type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Visa">
                                            Visa
                                          </SelectItem>
                                          <SelectItem value="Mastercard">
                                            Mastercard
                                          </SelectItem>
                                          <SelectItem value="American Express">
                                            American Express
                                          </SelectItem>
                                          <SelectItem value="Discover">
                                            Discover
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={handleSaveEditPayment}
                                    disabled={isLoading}
                                    size="sm"
                                  >
                                    <Check className="mr-2 w-4 h-4" />
                                    {isLoading ? "Saving..." : "Save"}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="mr-2 w-4 h-4" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              // View mode
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    <span className="font-medium">
                                      {payment.isDefault && (
                                        <span className="bg-primary mr-2 px-2 py-1 rounded text-primary-foreground text-xs">
                                          Default
                                        </span>
                                      )}
                                      {payment.isFromAPI && (
                                        <span className="bg-blue-500 mr-2 px-2 py-1 rounded text-white text-xs">
                                          API
                                        </span>
                                      )}
                                      {payment.cardType}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground text-sm">
                                    {formatCardNumber(payment.cardNumber)}
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    Expires: {payment.cardExpire}
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    {payment.cardHolderName}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {payment.isFromAPI ? (
                                    <span className="text-muted-foreground text-xs">
                                      Cannot be edited or removed
                                    </span>
                                  ) : (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleEditPayment(payment)
                                        }
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                          handleRemovePaymentMethod(payment.id)
                                        }
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No saved payment methods
                      </p>
                    )}

                    {/* Add New Payment Method Form */}
                    {showAddPayment && (
                      <Card className="p-4 border-dashed">
                        <div className="space-y-4">
                          <h4 className="font-medium">
                            Add New Payment Method
                          </h4>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="cardHolderName">
                                Cardholder Name
                              </Label>
                              <Input
                                id="cardHolderName"
                                value={newPaymentMethod.cardHolderName}
                                onChange={(e) =>
                                  setNewPaymentMethod((prev) => ({
                                    ...prev,
                                    cardHolderName: e.target.value,
                                  }))
                                }
                                placeholder="Enter cardholder name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                value={newPaymentMethod.cardNumber}
                                onChange={(e) =>
                                  setNewPaymentMethod((prev) => ({
                                    ...prev,
                                    cardNumber: e.target.value,
                                  }))
                                }
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>
                            <div className="gap-4 grid md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="cardExpire">Expiry Date</Label>
                                <Input
                                  id="cardExpire"
                                  value={newPaymentMethod.cardExpire}
                                  onChange={(e) =>
                                    setNewPaymentMethod((prev) => ({
                                      ...prev,
                                      cardExpire: e.target.value,
                                    }))
                                  }
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cardType">Card Type</Label>
                                <Select
                                  value={newPaymentMethod.cardType}
                                  onValueChange={(value) =>
                                    setNewPaymentMethod((prev) => ({
                                      ...prev,
                                      cardType: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select card type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Visa">Visa</SelectItem>
                                    <SelectItem value="Mastercard">
                                      Mastercard
                                    </SelectItem>
                                    <SelectItem value="American Express">
                                      American Express
                                    </SelectItem>
                                    <SelectItem value="Discover">
                                      Discover
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleAddPaymentMethod}
                              disabled={isLoading}
                              size="sm"
                            >
                              {isLoading ? "Adding..." : "Add Payment Method"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAddPayment(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Billing History</h3>
                    <p className="text-muted-foreground text-sm">
                      View and download your past invoices and receipts
                    </p>
                    <Button variant="outline">View Billing History</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Membership</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage your membership subscription and benefits
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link href="/membership">View Membership</Link>
                      </Button>
                      {user.membershipTier && (
                        <Button variant="outline">Cancel Membership</Button>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Tax Information</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage your tax settings and download tax documents
                    </p>
                    <Button variant="outline">Tax Settings</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
