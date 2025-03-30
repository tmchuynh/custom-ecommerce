import { Star } from "lucide-react";
import { JSX, useMemo } from "react";

const ProductRate = ({ page }: { page: boolean }): JSX.Element => {
  const { averageRating, reviewCount } = useMemo(() => {
    // Use a consistent storage key
    const storageKey = "product-ratings";

    // Try to get existing ratings from localStorage
    const savedRatings = localStorage.getItem(storageKey);

    if (savedRatings) {
      // If ratings exist, parse and return them
      const { averageRating, reviewCount } = JSON.parse(savedRatings);
      return { averageRating, reviewCount };
    }

    // Generate new random ratings if none exist
    const randomRating = Math.random() * 4 + 1; // Random rating between 1 and 5
    const randomReviewCount = Math.floor(Math.random() * 1000) + 1; // Random review count between 1 and 1000

    const newRatings = {
      averageRating: randomRating.toFixed(1), // Round to 1 decimal place
      reviewCount: randomReviewCount,
    };

    // Save the new ratings to localStorage
    localStorage.setItem(storageKey, JSON.stringify(newRatings));

    return newRatings;
  }, []);

  return (
    <>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= parseFloat(averageRating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm font-medium px-2">{averageRating}</p>
      {page && <p className="text-sm font-medium">({reviewCount})</p>}
    </>
  );
};

export default ProductRate;
