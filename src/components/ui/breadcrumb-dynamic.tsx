"use client";

import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Separator } from "./separator";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const breadcrumbItems = useMemo(() => {
    if (pathname === "/") {
      return null; // Do not render breadcrumb on the homepage
    }

    const items = [];
    const firstSegment = capitalizedSegments[0];
    const lastSegment = capitalizedSegments[capitalizedSegments.length - 1];

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

    if (firstSegment === lastSegment) {
      items.push(
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem key={lastSegment}>
            <BreadcrumbLink
              href="/"
              className="bg-muted px-3 py-2 rounded-lg cursor-default"
            >
              {lastSegment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    }

    // On larger screens, add the full breadcrumb trail
    if (pathSegments.length > 1) {
      pathSegments.slice(1).forEach((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
        const capitalizedSegment = capitalizedSegments[index + 1];
        const isLast = index === pathSegments.length - 2;
        items.push(
          <React.Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="bg-muted px-3 py-2 rounded-lg cursor-default">
                  {capitalizedSegment}
                </BreadcrumbPage>
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
    }

    return items;
  }, [pathname, capitalizedSegments, pathSegments]);

  if (breadcrumbItems === null) {
    return null;
  }

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Breadcrumb className="mx-auto pt-9 z-30">
      {/* On small screens, show only the first and last breadcrumb item */}

      {/* On small screens, show the dropdown for pages in between */}
      <BreadcrumbList className="md:hidden flex items-center w-11/12 mx-auto">
        <BreadcrumbSeparator />
        {breadcrumbItems[0]} {/* Home */}
        <BreadcrumbSeparator />
        {pathSegments.length > 2 && (
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-muted px-3 py-2 rounded-lg cursor-pointer flex items-center"
            >
              <span className="text-gray-500">...</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-background rounded-md shadow-lg mt-2 z-10 -right-20 w-48">
                <ul className="text-sm">
                  {pathSegments
                    .slice(1, pathSegments.length - 1)
                    .map((_segment, index) => {
                      const href = `/${pathSegments
                        .slice(0, index + 2)
                        .join("/")}`;
                      const capitalizedSegment = capitalizedSegments[index + 1];
                      return (
                        <>
                          {index !== 0 && <Separator className="my-1" />}
                          <li key={href}>
                            <BreadcrumbItem>
                              <BreadcrumbLink
                                href={href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                {capitalizedSegment}
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        )}
        {breadcrumbItems[breadcrumbItems.length - 1]}{" "}
        {/* Last item (current page) */}
      </BreadcrumbList>

      {/* On larger screens, show the full breadcrumb */}
      <BreadcrumbList className="hidden md:flex w-10/12 lg:w-11/12 mx-auto">
        <BreadcrumbSeparator />
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
