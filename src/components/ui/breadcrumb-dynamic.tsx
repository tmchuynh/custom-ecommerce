"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { mockProductData } from "@/lib/mockProductData";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const pathSegments = useMemo(
    () => pathname.split("/").filter((segment) => segment),
    [pathname]
  );

  const capitalizedSegments = useMemo(
    () =>
      pathSegments.map((segment) =>
        capitalize(segment.replaceAll("_", " ").trim())
      ),
    [pathSegments]
  );

  useEffect(() => {
    const fetchItemsData = async () => {
      if (pathSegments.length > 2) {
        try {
          const gender = pathSegments[1]?.toLowerCase();
          const category = pathSegments[2]?.toLowerCase();
          const categoryData = (mockProductData as any)[gender]?.[category];

          if (categoryData) {
            const subpages: any[] = [];

            // Extract subpages from the category data
            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                subpages.push({
                  name: capitalize(itemType),
                  href: `/${gender}/${category}/${itemType}`,
                });
              }
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

  const breadcrumbItems = useMemo(() => {
    if (pathname === "/") {
      return null; // Do not render breadcrumb on the homepage
    }

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

    pathSegments.forEach((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const capitalizedSegment = capitalizedSegments[index];
      const isLast = index === pathSegments.length - 1;

      items.push(
        <React.Fragment key={href}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLast ? (
              // Render dropdown on the last segment
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
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
            ) : (
              <BreadcrumbLink
                href={href}
                className="bg-muted px-3 py-2 rounded-lg cursor-default"
              >
                {capitalizedSegment}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      );
    });

    return items;
  }, [pathname, capitalizedSegments, pathSegments, categories, router]);

  if (breadcrumbItems === null) {
    return null;
  }

  return (
    <Breadcrumb className="mx-auto pt-9 z-30 w-full flex flex-row md:w-11/12">
      <BreadcrumbList className="flex flex-row items-center w-11/12 mx-auto">
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
