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
    return pathSegments.map((_segment, index) => {
      const href = `/${pathSegments
        .slice(0, index + 1)
        .join("/")
        .replaceAll("_", " ")}`;
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
              <BreadcrumbLink className="bg-muted px-3 py-2 rounded-lg cursor-default">
                {capitalizedSegment}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      );
    });
  }, [pathSegments]);

  return (
    <Breadcrumb className="w-10/12 mx-auto pt-16">
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
