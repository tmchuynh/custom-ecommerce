"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reviews } from "@/lib/constants/constants";
import { cn } from "@/lib/utils";

import { JSX, useState } from "react";
import { FaFilter, FaSearch, FaThumbsUp } from "react-icons/fa";
import { FaMessage, FaSliders, FaStar } from "react-icons/fa6";

/**
 * CustomerReviews component displays a comprehensive review section for an e-commerce website.
 *
 * Features include:
 * - Display of average rating and rating distribution
 * - Filtering reviews by rating and search term
 * - Sorting reviews by newest, highest, or lowest rating
 * - Form for submitting new reviews
 * - Responsive grid layout of review cards
 *
 * @component
 * @example
 * ```tsx
 * <CustomerReviews />
 * ```
 *
 * @state {number} minRating - Minimum rating filter (0-5)
 * @state {string} searchTerm - Search term for filtering reviews
 * @state {string} sortOrder - Sort order ("newest" | "highest" | "lowest")
 * @state {boolean} showReviewForm - Controls visibility of review submission form
 * @state {Object} newReview - Contains new review data (name, email, rating, review)
 *
 * @returns {JSX.Element} A fully functional customer reviews section
 */
const CustomerReviews = (): JSX.Element => {
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

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handles the submission of a customer review form.
   * Prevents default form submission, processes the review data,
   * displays a confirmation message, resets the form fields,
   * and hides the review form.
   *
   * @param {React.FormEvent} e - The form submission event
   * @returns {void}
   */
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
  /**
   * Filters and sorts customer reviews based on specified criteria.
   *
   * @param reviews - Array of review objects to be filtered and sorted
   * @param minRating - Minimum rating threshold for filtering reviews
   * @param searchTerm - String to filter reviews by matching review text or customer name
   * @param sortOrder - Sort order parameter ("highest" | "lowest" | default to date)
   * @returns Filtered and sorted array of review objects based on:
   *  - Reviews with rating >= minRating
   *  - Reviews matching searchTerm in review text or customer name (case insensitive)
   *  - Sorted by:
   *    - rating (highest to lowest) if sortOrder is "highest"
   *    - rating (lowest to highest) if sortOrder is "lowest"
   *    - date (newest first) by default
   */
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
    <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Customer Reviews</h1>
          <p className="mx-auto max-w-2xl text-xl">
            See what our customers are saying about us! We value their feedback
            and continuously strive to provide the best service possible.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="shadow-md mb-8 rounded-xl">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-10 border rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold text-5xl">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-1 text-sm">{reviews.length} reviews</div>
            </div>

            <div className="col-span-2">
              {ratingCounts.map((ratingData) => (
                <div key={ratingData.rating} className="flex items-center mb-2">
                  <div className="w-12 font-medium text-sm">
                    {ratingData.rating} stars
                  </div>
                  <div className="flex-1 mx-3 border rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${ratingData.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm">{ratingData.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Sidebar for filters */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="flex items-center mb-4 font-bold text-xl">
                <FaFilter className="mr-2 w-5 h-5" />
                Filter Reviews
              </h2>

              <div className="mb-6">
                <Label
                  htmlFor="search-reviews"
                  className="block mb-1 font-medium text-sm"
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
                  <FaSearch className="top-1/2 left-3 absolute w-4 h-4 transform -translate-y-1/2" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="flex items-center mb-2 font-medium text-sm">
                  <FaSliders className="mr-2 w-4 h-4" />
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
                      className="w-4 h-4"
                    />
                    <Label htmlFor="sort-newest" className="ml-2 text-sm">
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
                      className="w-4 h-4"
                    />
                    <Label htmlFor="sort-highest" className="ml-2 text-sm">
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
                      className="w-4 h-4"
                    />
                    <Label htmlFor="sort-lowest" className="ml-2 text-sm">
                      Lowest Rating
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="flex items-center mb-2 font-medium text-sm">
                  <FaStar className="mr-2 w-4 h-4" />
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
                        className="flex items-center ml-2 text-sm"
                      >
                        {rating} {rating === 1 ? "Star" : "Stars"} & Up
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className={cn(`w-full ${buttonVariants()}`)}
                >
                  <FaMessage className="mr-2 w-4 h-4" />
                  Write a Review
                </AlertDialogTrigger>
                <AlertDialogContent className="border-4 min-w-11/12">
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                  <AlertDialogTitle />
                  <h2 className="mb-4 font-semibold text-xl">Write a Review</h2>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="gap-4">
                      <div>
                        <Label htmlFor="name" className="font-medium text-sm">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          value={newReview.name}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-medium text-sm">
                          Your Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newReview.email}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-medium text-sm">Your Rating</Label>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <FaStar
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
                      <Label htmlFor="review" className="font-medium text-sm">
                        Your Review
                      </Label>
                      <Textarea
                        id="review"
                        rows={4}
                        value={newReview.review}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            review: e.target.value,
                          })
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
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="space-y-8 lg:col-span-5">
            {/* Reviews Grid */}
            {filteredReviews.length === 0 ? (
              <div className="shadow-md p-8 rounded-xl text-center">
                <p className="text-lg">No reviews match your filters.</p>
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
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {filteredReviews.map((review, index) => (
                  <Card
                    key={index}
                    className="flex flex-col justify-between shadow-md hover:shadow-lg p-6 rounded-lg h-full transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                          <div className="font-semibold text-lg">
                            {review.name}
                          </div>
                          <div className="text-sm">{review.date}</div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
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

                      <p className="mb-4">{review.review}</p>

                      <div className="flex justify-between items-center mt-auto pt-3 border-t">
                        <Button variant="ghost" size="sm">
                          <FaThumbsUp className="mr-1 w-4 h-4" /> Helpful
                        </Button>
                        <div className="text-sm">Verified Purchase</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
