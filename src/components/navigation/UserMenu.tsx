"use client";

import { useAuth } from "@/app/context/authContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Crown,
  Heart,
  LogIn,
  LogOut,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, isLoggedIn, logout, hasMembership } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">
            <LogIn className="mr-2 w-4 h-4" />
            Sign In
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">
            <UserPlus className="mr-2 w-4 h-4" />
            Register
          </Link>
        </Button>
      </div>
    );
  }

  const userInitials = user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full w-8 h-8">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="font-medium text-sm leading-none">{user?.username}</p>
          <p className="text-muted-foreground text-xs leading-none">
            {user?.email || user?.phoneNumber}
          </p>
          {hasMembership && user?.membershipTier && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Crown className="mr-1 w-3 h-3" />
                {user.membershipTier.name}
              </Badge>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <User className="mr-2 w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/wishlist" className="cursor-pointer">
            <Heart className="mr-2 w-4 h-4" />
            <span>Wishlist</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/membership" className="cursor-pointer">
            <Crown className="mr-2 w-4 h-4" />
            <span>Membership</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 w-4 h-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 w-4 h-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
