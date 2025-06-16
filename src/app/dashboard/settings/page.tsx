"use client";

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
  CreditCard,
  Lock,
  Shield,
  Trash2,
  User,
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
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
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

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      }));
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
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="gap-4 grid md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div className="gap-4 grid md:grid-cols-2">
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

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      placeholder="Enter phone number"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Address Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="gap-4 grid md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          placeholder="Enter state"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleInputChange("country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
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
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Payment Methods</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage your saved payment methods for faster checkout
                    </p>
                    <Button variant="outline">Add Payment Method</Button>
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
