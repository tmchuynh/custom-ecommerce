"use client";

import React, { useMemo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { mockProductData } from "@/lib/constants/mockProductData";
import { capitalize } from "@/lib/utils/format";
import { FaChevronDown } from "react-icons/fa";

const StaticBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [genders, setGenders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Compute the path segments and their capitalized versions
  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  const capitalizedSegments = useMemo(
    () => pathSegments.map((segment) => capitalize(segment)),
    [pathSegments]
  );

  // Fetch both parent and child categories
  useEffect(() => {
    if (pathSegments[0] !== "shopping") return; // Only fetch for /shopping paths

    // Get all available genders
    const availableGenders = Object.keys(mockProductData).map((gender) => ({
      name: capitalize(gender),
      href: `/shopping/${gender}`,
    }));
    setGenders(availableGenders);

    const fetchItemsData = async (): Promise<void> => {
      if (pathSegments.length >= 3) {
        try {
          const gender = pathSegments[1]?.toLowerCase();
          const category = pathSegments[2]?.toLowerCase();

          // Get parent categories (for the gender segment)
          if (gender && gender in mockProductData) {
            const parentOptions = Object.keys(
              mockProductData[gender as keyof typeof mockProductData]
            ).map((cat) => ({
              name: capitalize(cat),
              href: `/shopping/${gender}/${cat}`,
            }));
            setParentCategories(parentOptions);
          }

          // Get subcategories (for the category segment)
          const categoryData =
            gender && gender in mockProductData && category
              ? (
                  mockProductData[
                    gender as keyof typeof mockProductData
                  ] as Record<string, any>
                )?.[category]
              : undefined;
          if (categoryData) {
            const subpages = Object.entries(categoryData).map(
              ([itemType, _]) => ({
                name: capitalize(itemType),
                href: `/shopping/${gender}/${category}/${itemType}`,
              })
            );
            setCategories(subpages);
          } else {
            console.error("Product data not found");
          }
        } catch (error) {
          console.error("Error fetching product data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItemsData();
  }, [pathSegments]);

  // Compute breadcrumb items without side effects
  const breadcrumbItems = useMemo(() => {
    if (pathname === "/") return null;

    const items = [];

    // Home link
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink
          href="/"
          className="bg-muted px-3 py-2 rounded-lg cursor-default"
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    // Handle dynamic paths
    pathSegments.forEach((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const capitalizedSegment = capitalizedSegments[index];

      items.push(<BreadcrumbSeparator key={`sep-${href}`} />);

      // Add dropdown for "shopping" path
      if (index === 0 && segment === "shopping") {
        items.push(
          <BreadcrumbItem key={href}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                >
                  {capitalizedSegment}
                  <FaChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {genders.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      onClick={() => router.push(item.href)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        );
      } else if (index === 1 && pathSegments[0] === "shopping") {
        // Add dropdown for gender segment
        items.push(
          <BreadcrumbItem key={href}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                >
                  {capitalizedSegment}
                  <FaChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {parentCategories.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      onClick={() => router.push(item.href)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        );
      } else if (index === 2 && pathSegments[0] === "shopping") {
        // Add dropdown for category segment
        items.push(
          <BreadcrumbItem key={href}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                >
                  {capitalizedSegment}
                  <FaChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {categories.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      onClick={() => router.push(item.href)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        );
      } else {
        // Regular breadcrumb link for non-shopping paths or other segments
        items.push(
          <BreadcrumbItem key={href}>
            <BreadcrumbLink
              href={href}
              className="bg-muted px-3 py-2 rounded-lg cursor-default"
            >
              {capitalizedSegment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }
    });

    return items;
  }, [
    pathname,
    capitalizedSegments,
    pathSegments,
    router,
    categories,
    parentCategories,
    genders,
  ]);

  if (!breadcrumbItems) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-row items-center gap-4 w-full border-t text-sm"
    >
      <ul className="text-sm w-full mx-auto py-9 flex flex-row items-center gap-4 md:w-11/12 md:mx-auto lg:w-10/12 ">
        {breadcrumbItems}
      </ul>
    </nav>
  );
};

export default StaticBreadcrumb;
