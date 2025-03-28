"use client";
import { useProduct } from "@/app/context/productContext";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navigations } from "@/lib/constants";
import { ArrowRight, Filter, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * A page component that displays product categories based on the gender parameter.
 */
const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender is string | string[]
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [uniqueSubcategories, setUniqueSubcategories] = useState<string[]>([]);

  const { getProductsByCategory } = useProduct();

  useEffect(() => {
    /**
     * Fetches and processes category data based on the specified gender.
     */
    const fetchItemsData = async (): Promise<void> => {
      try {
        // Validate gender
        const validGender = typeof gender === "string" ? gender : "";
        if (!validGender || !["men", "women", "kids"].includes(validGender)) {
          setCategories([]);
          setLoading(false);
          return;
        }

        // Find the specific gender category in navigations
        const genderCategory = navigations.categories.find(
          (cat) => cat.id === validGender
        );

        if (!genderCategory) {
          setCategories([]);
          setLoading(false);
          return;
        }

        // Process the sections to get all top-level categories
        const processedCategories: any[] = [];

        // Each gender has an array of sections, and each section is an array of category objects
        genderCategory.sections.forEach((sectionGroup) => {
          sectionGroup.forEach((section) => {
            // Add this category to our processed list with proper metadata
            processedCategories.push({
              name: section.name,
              description: `Browse our ${section.name} collection`,
              imageSrc:
                section.imageSrc ||
                "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1411&auto=format&fit=crop",
              href: section.href,
              id: section.id,
              gender: validGender,
              category: section.id,
              subcategory: section.subcategory || "general",
            });
          });
        });

        // Extract unique subcategories for filtering
        const subcategories = [
          ...new Set(processedCategories.map((item) => item.subcategory)),
        ];
        setUniqueSubcategories(subcategories);

        setCategories(processedCategories);
      } catch (error) {
        console.error("Error fetching category data", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsData();
  }, [gender, getProductsByCategory]);

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((category) => category.subcategory === activeFilter);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (categories.length === 0) {
    return <CannotFind />;
  }

  const genderDisplay =
    typeof gender === "string"
      ? gender.charAt(0).toUpperCase() + gender.slice(1)
      : "";

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold mb-4">
            {genderDisplay} Collection
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our latest {genderDisplay.toLowerCase()} products crafted
            with quality and style.
          </p>
        </div>

        {/* Category Filters */}
        {uniqueSubcategories.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            <Button
              onClick={() => setActiveFilter("all")}
              variant={activeFilter === "all" ? "default" : "outline"}
              className={`capitalize ${activeFilter === "all" ? "" : ""}`}
            >
              <Filter className="h-4 w-4 mr-2" /> All Categories
            </Button>

            {uniqueSubcategories.map((subcategory) => (
              <Button
                key={subcategory}
                onClick={() => setActiveFilter(subcategory)}
                variant={activeFilter === subcategory ? "default" : "outline"}
                className={`capitalize ${
                  activeFilter === subcategory ? "" : ""
                }`}
              >
                {subcategory}
              </Button>
            ))}
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group rounded-xl border shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={category.imageSrc}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant={"secondary"}>{category.subcategory}</Badge>
                </div>

                {/* Shop Now Button - Appears on Hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button>
                    <ShoppingBag className="h-4 w-4 mr-2" /> Shop Now
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 group-hover:text-teritary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm line-clamp-2">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/shopping`}
            className="inline-flex items-center font-medium"
          >
            View All Collections
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderPage;
