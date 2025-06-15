\
import Link from 'next/link';

const shoppingCategories = [
  { name: "Men's Clothing", href: "/shopping/men", description: "Explore our collection for men." },
  { name: "Women's Clothing", href: "/shopping/women", description: "Discover the latest trends for women." },
  { name: "Electronics", href: "/shopping/electronics", description: "Find the newest gadgets and electronics." },
  { name: "Jewelery", href: "/shopping/jewelery", description: "Browse our exquisite jewelery selection." },
  { name: "Children", href: "/shopping/children", description: "Shop for the little ones. (Note: Product data for this category is not currently available from our primary API.)" },
];

export default function ShoppingPage() {
  return (
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-8 font-bold text-3xl text-center">Shop by Category</h1>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {shoppingCategories.map((category) => (
          <Link href={category.href} key={category.name} legacyBehavior>
            <a className="block bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-shadow">
              <h2 className="mb-2 font-semibold text-xl">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
