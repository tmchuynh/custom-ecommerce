"use client";

const CustomerReviews = () => {
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
        "Disappointed with the material, it didn’t match what was shown in the photos.",
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
        "Perfect size and fit. Delivery was on time, and I’m very happy with the quality.",
      rating: 5,
      date: "February 19, 2023",
    },
    {
      name: "Michael Harris",
      review:
        "It’s a decent product, but the price is a bit high for what you get.",
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Customer Reviews
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        See what our customers are saying about us! We value their feedback and
        continuously strive to provide the best service possible.
      </p>

      {/* Reviews Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="text-lg font-semibold text-gray-800">
                {review.name}
              </div>
              <div className="ml-2 text-sm text-gray-500">({review.date})</div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">{review.review}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < review.rating ? "currentColor" : "none"}
                  viewBox="0 0 20 20"
                  className="h-5 w-5 text-yellow-400"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 15l-5.917 3.102 1.255-6.897L.5 6.797l6.863-.591L10 0l2.637 5.209 6.863.591-4.838 5.408 1.255 6.897L10 15z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
