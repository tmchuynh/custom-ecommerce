import { useAuth } from "@/app/context/authContext";
import { useWishlist } from "@/app/context/wishlistContext";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistIcon() {
  const { wishlistCount } = useWishlist();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Link href="/wishlist">
      <Button variant="ghost" size="sm" className="relative p-2">
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 min-w-[20px] h-5 text-white text-xs">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
        <span className="sr-only">Wishlist</span>
      </Button>
    </Link>
  );
}
