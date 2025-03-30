import {
  Color,
  DetailItem,
  ProductDetailsProps,
  ProductType,
} from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Button, buttonVariants } from "./ui/button";
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
import { mockProductData } from "@/lib/mockProductData";
import { useParams, usePathname } from "next/navigation";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import components from "./ProductDetails";
import { Eye, Heart } from "lucide-react";

/**
 * A React functional component that renders two buttons: "Quick Look" and "Add to Favorites".
 * The component dynamically adjusts its styles based on the current theme and accessibility requirements.
 *
 * @param {Object} props - The props object.
 * @param {boolean} [props.page=true] - Determines the layout of the component. If `true`, the component
 * will have a wider layout; otherwise, it will adjust to a smaller layout.
 *
 * @returns {JSX.Element} The rendered JSX element containing the buttons.
 *
 * @remarks
 * - The "Quick Look" button is conditionally hidden based on the `page` prop.
 * - The "Add to Favorites" button dynamically adjusts its background and text colors to ensure
 *   accessibility compliance using the `getAccessibleColor` utility.
 * - The component listens to the `theme` context and updates the background color accordingly.
 *
 * @example
 * ```tsx
 * <QuickLookAndFavoriteButtons page={true} />
 * ```
 */
const QuickLookAndFavoriteButtons = ({
  product,
  page = true,
  toggleWishlist,
  wishlist,
}: {
  page?: boolean;
  product: ProductType;
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
  wishlist: Set<string>;
}): JSX.Element => {
  const { gender, category, item, slug } = useParams();

  const pathname = usePathname();
  const segments = window.location.pathname.split("/");
  const selectedGender = segments[2];
  const selectedCategory = segments[3];
  const selectedItem = segments[4];
  const [selectedColor, setSelectedColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });
  const [backgroundColor, setBackgroundColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });
  const accessibleColor = getAccessibleColor(
    `${backgroundColor.bgColor}`,
    "AAA",
    true
  );

  const { theme } = useTheme();

  useEffect(() => {
    // Only update when theme has a defined value
    if (theme !== undefined) {
      if (theme === "dark") {
        setBackgroundColor({
          bgColor: "#070707",
          name: "Black",
        });
      } else {
        setBackgroundColor({
          bgColor: "#fff",
          name: "White",
        });
      }
    }
  }, [theme]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between mx-2 gap-1 p-2 mt-4 w-11/12",
        {
          "w-full": page,
        }
      )}
    >
      <AlertDialog>
        <AlertDialogTrigger className="p-2 rounded-full shadow-md transition-colors">
          <span className="sr-only"> Quick look </span>
          <Eye className="h-5 w-5 text-gray-600" />
        </AlertDialogTrigger>
        <AlertDialogContent className="border-4 min-w-11/12">
          <AlertDialogFooter className="">
            <AlertDialogCancel className="">Cancel</AlertDialogCancel>
            <AlertDialogAction className="">Continue</AlertDialogAction>
          </AlertDialogFooter>
          <AlertDialogTitle />
          <div className="mx-auto">
            {/* Product Section */}
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 relative py-10">
              <ProductGallery
                product={product}
                page={false}
                selectedColor={selectedColor}
              />
              <div className="relative">
                <ProductInfo
                  titleSize="text-4xl"
                  product={product}
                  page={false}
                  relatedProduct={false}
                />

                <div>
                  <components.ProductColors
                    product={product}
                    selectedColor={selectedColor}
                    page={false}
                    setSelectedColor={setSelectedColor}
                  />
                </div>

                <components.ProductDetails details={product.details} />
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={(e) => toggleWishlist(product.name, e)}
        className="p-2 rounded-full shadow-md transition-colors"
      >
        <Heart
          className={`h-5 w-5 ${
            wishlist.has(product.name)
              ? "fill-red-500 text-red-500"
              : "text-gray-600"
          }`}
        />
        <span className="sr-only">Add to Wishlist</span>
      </Button>
    </div>
  );
};

export default QuickLookAndFavoriteButtons;
