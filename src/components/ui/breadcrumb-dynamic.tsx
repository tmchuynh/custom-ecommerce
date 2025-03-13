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

    return pathSegments.map((_segment, index) => {
      const href = `/${pathSegments
        .slice(0, index + 1)
        .join("/")
        .replaceAll("_", " ")}`;
      if (href === "/") {
        return <div className="hidden" key={0}></div>;
      }
      const isLast = index === pathSegments.length - 1;
      const capitalizedSegment = capitalizedSegments[index];

      return (
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
  }, [pathSegments]);

  if (breadcrumbItems === null) {
    return null;
  }

  return (
    <Breadcrumb className="mx-auto pt-16 border z-30">
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
