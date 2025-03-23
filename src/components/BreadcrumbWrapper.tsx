"use client";

import React, { useMemo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils";
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
import { ChevronDown } from "lucide-react";
import { Separator } from "./ui/separator";
import { mockProductData } from "@/lib/mockProductData";

const StaticBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Compute the path segments and their capitalized versions
  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  const capitalizedSegments = useMemo(
    () =>
      pathSegments.map((segment) =>
        capitalize(segment.replaceAll("_", " ").trim())
      ),
    [pathSegments]
  );

  // Fetch both parent and child categories
  useEffect(() => {
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

    const items = [
      <BreadcrumbItem key="home">
        <BreadcrumbLink
          href="/"
          className="bg-muted px-3 py-2 rounded-lg cursor-default"
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>,
    ];

    if (pathSegments.length > 2) {
      pathSegments.slice(1).forEach((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
        const capitalizedSegment = capitalizedSegments[index + 1];
        const isLast = index === pathSegments.length - 2;
        const isSecondToLast = index === pathSegments.length - 3;

        items.push(
          <div key={href} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLast ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                    >
                      {capitalizedSegment}
                      <ChevronDown className="ml-1 h-4 w-4" />
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
              ) : isSecondToLast ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                    >
                      {capitalizedSegment}
                      <ChevronDown className="ml-1 h-4 w-4" />
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
              ) : (
                <BreadcrumbLink
                  href={href}
                  className="bg-muted px-3 py-2 rounded-lg cursor-default"
                >
                  {capitalizedSegment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        );
      });
    }

    return items;
  }, [
    pathname,
    capitalizedSegments,
    pathSegments,
    router,
    categories,
    parentCategories,
    dropdownOpen,
  ]);

  if (!breadcrumbItems) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-row items-center gap-4 w-full md:w-11/12 md:mx-auto lg:w-10/12 mt-10 text-sm"
    >
      <ul className="text-sm w-full mx-auto flex flex-row items-center gap-4">
        {breadcrumbItems}
      </ul>
    </nav>
  );
};

export default StaticBreadcrumb;
