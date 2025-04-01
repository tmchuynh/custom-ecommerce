import React, { ReactNode } from "react";
import "./HoverIconLink.css";
import { IconType } from "react-icons/lib";

interface HoverIconLinkProps {
  link: ReactNode; // The <a> element to be passed
  icon: IconType; // The icon to display on hover
}

const HoverIconLink = ({ link, icon: Icon }: HoverIconLinkProps) => {
  return (
    <div className="hover-icon-link flex items-center justify-between w-full">
      {link}
      <span className="icon">
        <Icon />
      </span>
    </div>
  );
};

export default HoverIconLink;
