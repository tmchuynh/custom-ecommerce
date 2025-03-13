"use client";

import React, { useMemo } from "react";
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

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

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

    // Always add the first segment (Home)
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

  return (
    <Breadcrumb className="mx-auto pt-9 z-30">
      {/* On small screens, show only the first and last breadcrumb item */}
      <BreadcrumbList className="md:hidden flex w-10/12 mx-auto">
        <BreadcrumbSeparator />
        {breadcrumbItems[0]} {/* First item (Home) */}
        <BreadcrumbSeparator />
        {pathSegments.length > 2 && (
          <BreadcrumbItem className="text-gray-500">
            <span className="bg-muted px-3 py-2 rounded-lg cursor-default">
              ...
            </span>
          </BreadcrumbItem>
        )}
        {breadcrumbItems[breadcrumbItems.length - 1]}{" "}
        {/* Last item (current page) */}
      </BreadcrumbList>

      {/* On larger screens, show the full breadcrumb */}
      <BreadcrumbList className="hidden md:flex w-10/12 2xl:w-11/12 mx-auto">
        <BreadcrumbSeparator />
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
