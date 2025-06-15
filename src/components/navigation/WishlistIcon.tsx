import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/app/context/wishlistContext";
import { useAuth } from "@/app/context/authContext";

export default function WishlistIcon() {
  const { wishlistCount } = useWishlist();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Link href="/wishlist">
      <Button variant="ghost" size="sm" className="relative p-2">
        <Heart className="h-5 w-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
        <span className="sr-only">Wishlist</span>
      </Button>
    </Link>
  );
}
