"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Filter,
  Mail,
  MessageSquare,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useRef, useState } from "react";

const CustomerReviews = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
  });
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const reviews = [
    {
      name: "John Doe",
      review:
        "Great product! I absolutely love it. The quality exceeded my expectations.",
      rating: 5,
      date: "March 15, 2023",
    },
    {
      name: "Jane Smith",
      review:
        "Good quality but took longer to arrive than expected. Still satisfied.",
      rating: 4,
      date: "March 12, 2023",
    },
    {
      name: "Samuel Lee",
      review:
        "The product is okay, but I had issues with the sizing. Will exchange for a different size.",
      rating: 3,
      date: "March 10, 2023",
    },
    {
      name: "Alex Johnson",
      review:
        "Awesome service! The team was very responsive and helped with my order.",
      rating: 5,
      date: "March 9, 2023",
    },
    {
      name: "Maria Gonzales",
      review:
        "Love the design, but the material could be better. Otherwise, very happy with the purchase.",
      rating: 4,
      date: "March 5, 2023",
    },
    {
      name: "Chris Wong",
      review:
        "Good value for the price. Shipping was quick and the product is as described.",
      rating: 4,
      date: "March 3, 2023",
    },
    {
      name: "Sophia Miller",
      review:
        "The product quality is exceptional! I will definitely be purchasing from here again.",
      rating: 5,
      date: "March 1, 2023",
    },
    {
      name: "David Kim",
      review:
        "Disappointed with the material, it didn't match what was shown in the photos.",
      rating: 2,
      date: "February 28, 2023",
    },
    {
      name: "Emily Davis",
      review:
        "Amazing fit and color. Will recommend this product to my friends.",
      rating: 5,
      date: "February 25, 2023",
    },
    {
      name: "Ryan O'Connor",
      review:
        "Not as good as expected. The product was fine but not as comfortable as advertised.",
      rating: 3,
      date: "February 22, 2023",
    },
    {
      name: "Olivia Robinson",
      review:
        "Perfect size and fit. Delivery was on time, and I'm very happy with the quality.",
      rating: 5,
      date: "February 19, 2023",
    },
    {
      name: "Michael Harris",
      review:
        "It's a decent product, but the price is a bit high for what you get.",
      rating: 3,
      date: "February 17, 2023",
    },
    {
      name: "Isabella Green",
      review:
        "Absolutely fantastic! It arrived in perfect condition, and I am very impressed.",
      rating: 5,
      date: "February 15, 2023",
    },
    {
      name: "Liam Patel",
      review:
        "The product didn't fit right, and I had to return it. Customer service was helpful though.",
      rating: 2,
      date: "February 10, 2023",
    },
    {
      name: "Charlotte Walker",
      review:
        "Really loved it! The fit is perfect, and the fabric feels premium. Will buy more.",
      rating: 5,
      date: "February 8, 2023",
    },
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (activeSection !== sectionId) {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend
    alert("Thank you for your review! It has been submitted.");
    setNewReview({
      name: "",
      email: "",
      rating: 5,
      review: "",
    });
    setShowReviewForm(false);
  };

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => review.rating >= minRating)
    .filter(
      (review) =>
        searchTerm === "" ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;

      // Default to newest
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Count reviews by rating
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: Math.round(
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
        100
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about us! We value their feedback
            and continuously strive to provide the best service possible.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {reviews.length} reviews
              </div>
            </div>

            <div className="col-span-2">
              {ratingCounts.map((ratingData) => (
                <div key={ratingData.rating} className="flex items-center mb-2">
                  <div className="w-12 text-sm text-gray-600 font-medium">
                    {ratingData.rating} stars
                  </div>
                  <div className="flex-1 mx-3 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${ratingData.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600">
                    {ratingData.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar for filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Reviews
              </h2>

              <div className="mb-6">
                <Label
                  htmlFor="search-reviews"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Search Reviews
                </Label>
                <div className="relative">
                  <Input
                    id="search-reviews"
                    type="text"
                    placeholder="Search by keyword"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort By
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-newest"
                      name="sort"
                      checked={sortOrder === "newest"}
                      onChange={() => handleSortChange("newest")}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label
                      htmlFor="sort-newest"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Newest First
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-highest"
                      name="sort"
                      checked={sortOrder === "highest"}
                      onChange={() => handleSortChange("highest")}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label
                      htmlFor="sort-highest"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Highest Rating
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-lowest"
                      name="sort"
                      checked={sortOrder === "lowest"}
                      onChange={() => handleSortChange("lowest")}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label
                      htmlFor="sort-lowest"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Lowest Rating
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Filter by Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating <= rating}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm text-gray-600 flex items-center"
                      >
                        {rating} {rating === 1 ? "Star" : "Stars"} & Up
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Write a Review
                </h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview({ ...newReview, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newReview.email}
                        onChange={(e) =>
                          setNewReview({ ...newReview, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Your Rating
                    </Label>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-8 w-8 cursor-pointer ${
                            rating <= newReview.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleStarClick(rating)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="review"
                      className="text-sm font-medium text-gray-700"
                    >
                      Your Review
                    </Label>
                    <Textarea
                      id="review"
                      rows={4}
                      value={newReview.review}
                      onChange={(e) =>
                        setNewReview({ ...newReview, review: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Review</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews Grid */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">
                  No reviews match your filters.
                </p>
                <Button
                  onClick={() => {
                    setMinRating(0);
                    setSearchTerm("");
                  }}
                  variant="link"
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReviews.map((review, index) => (
                  <Card
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between h-full transition-shadow hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                          <div className="text-lg font-semibold text-gray-800">
                            {review.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{review.review}</p>

                      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-600"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
                        </Button>
                        <div className="text-sm text-gray-400">
                          Verified Purchase
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Have a question about one of our products?
          </p>
          <div className="flex space-x-3">
            <a
              href="mailto:support@yourcompany.com"
              className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              <Mail className="h-4 w-4 mr-2" /> Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Phone className="h-4 w-4 mr-2" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
