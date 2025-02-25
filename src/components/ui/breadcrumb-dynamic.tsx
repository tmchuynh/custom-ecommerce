"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useSmallScreen from "@/lib/useSmallScreen";
import { capitalize } from "@/lib/utils";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const isSmallScreen = useSmallScreen();

  return (
    <Breadcrumb className={isSmallScreen ? "hidden" : "my-4"}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="bg-muted px-3 py-2 rounded-lg cursor-default">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="bg-muted px-3 py-2 rounded-lg cursor-default">
                    {capitalize(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="bg-muted px-3 py-2 rounded-lg cursor-default">
                    {capitalize(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
