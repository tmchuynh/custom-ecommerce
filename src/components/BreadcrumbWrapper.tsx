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
  const [genders, setGenders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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

    // Add "Shopping" link after Home if we're on a shopping path
    if (pathSegments[0] === "shopping") {
      items.push(<BreadcrumbSeparator key="shopping-separator" />);

      // Make Shopping a dropdown
      items.push(
        <BreadcrumbItem key="shopping">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
              >
                Shopping
                <ChevronDown className="ml-1 h-4 w-4" />
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

      // Process gender segment if it exists
      if (pathSegments.length > 1) {
        const gender = pathSegments[1];
        const genderPath = `/shopping/${gender}`;

        items.push(<BreadcrumbSeparator key={`sep-gender`} />);

        items.push(
          <BreadcrumbItem key={genderPath}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-muted px-3 py-2 rounded-lg cursor-default border-none"
                >
                  {capitalize(gender)}
                  <ChevronDown className="ml-1 h-4 w-4" />
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
      }

      // Process category segment if it exists
      if (pathSegments.length > 2) {
        const category = pathSegments[2];
        const categoryPath = `/shopping/${pathSegments[1]}/${category}`;

        items.push(<BreadcrumbSeparator key={`sep-category`} />);

        items.push(
          <BreadcrumbItem key={categoryPath}>
            <BreadcrumbLink
              href={categoryPath}
              className="bg-muted px-3 py-2 rounded-lg cursor-default"
            >
              {capitalize(category)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }

      // Process any remaining segments as regular links
      if (pathSegments.length > 3) {
        for (let i = 3; i < pathSegments.length; i++) {
          const segment = pathSegments[i];
          const href = `/${pathSegments.slice(0, i + 1).join("/")}`;

          items.push(<BreadcrumbSeparator key={`sep-${href}`} />);

          items.push(
            <BreadcrumbItem key={href}>
              <BreadcrumbLink
                href={href}
                className="bg-muted px-3 py-2 rounded-lg cursor-default"
              >
                {capitalize(segment)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        }
      }
    } else {
      // Handle non-shopping paths (original logic for other paths)
      if (pathSegments.length > 0) {
        pathSegments.forEach((segment, index) => {
          if (index === 0) return; // Skip the first segment as it's already handled
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const capitalizedSegment = capitalizedSegments[index];

          items.push(<BreadcrumbSeparator key={`sep-${href}`} />);

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
        });
      }
    }

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
