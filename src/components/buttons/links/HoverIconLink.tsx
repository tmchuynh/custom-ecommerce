import React, { ReactNode } from "react";
import "./HoverIconLink.css";
import { IconType } from "react-icons/lib";

interface HoverIconLinkProps {
  link: ReactNode; // The <a> element to be passed
  icon: IconType; // The icon to display on hover
}

const HoverIconLink = ({ link, icon: Icon }: HoverIconLinkProps) => {
  return (
    <div className="flex items-center justify-between w-full group">
      <span className="group-hover:underline underline-offset-2">{link}</span>
      <span className="icon">
        <Icon className="hidden group-hover:inline-flex" />
      </span>
    </div>
  );
};

export default HoverIconLink;
