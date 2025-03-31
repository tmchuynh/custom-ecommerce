import { CategoryProps } from "@/lib/interfaces";
import { formatURL } from "@/lib/utils/format";
import { useRouter } from "next/navigation";
import { JSX } from "react";

/**
 * A React component that renders a list of categories and their respective sections.
 * Each section contains a heading and a list of items, with links for navigation.
 *
 * @param {CategoryProps} props - The props for the `CategoryList` component.
 * @param {Object} props.section - The section object containing details about the category section.
 * @param {number} props.index - The index of the current section in the list.
 * @param {Object} props.category - The category object containing details about the category.
 * @param {Function} [props.closePopovers] - An optional callback function to close any open popovers.
 *
 * @returns {JSX.Element} The rendered `CategoryList` component.
 *
 * @remarks
 * - The component uses `useRouter` from Next.js for navigation.
 * - If the section name is not "Shop by Collection", a "Shop All" link is displayed.
 * - Each item in the section is rendered as a list item with a link.
 * - Accessibility is considered by using `aria-labelledby` for the list and unique IDs for headings.
 *
 * @example
 * ```tsx
 * <CategoryList
 *   section={{
 *     id: "section1",
 *     name: "Electronics",
 *     items: [{ name: "Laptops", href: "/laptops" }],
 *   }}
 *   index={0}
 *   category={{ id: "cat1" }}
 *   closePopovers={() => console.log("Popover closed")}
 * />
 * ```
 */
export default function CategoryList({
  section,
  index,
  category,
  closePopovers,
}: CategoryProps): JSX.Element {
  const router = useRouter();
  return (
    <div key={index} className="space-y-4">
      <div className="flex items-center justify-between">
        <p
          id={`${category.id}-heading`}
          className="font-bold tracking-wider uppercase"
        >
          {section.name}
        </p>
      </div>
      <ul
        role="list"
        aria-labelledby={`${category.id}-heading`}
        className="mt-4 space-y-4"
      >
        {section.name !== "Shop by Collection" && (
          <li>
            <a
              href={`/shopping/${category.id}/${formatURL(section.name)}`}
              className="p-0 my-0 text-foreground hover:underline underline-offset-4"
              onClick={() => {
                closePopovers?.();
                router.push(`/shopping/${category.id}`);
              }}
            >
              Shop All {section.name}
            </a>
          </li>
        )}
        {section.items.map((item) => (
          <li key={item.name}>
            <a
              href={`/shopping/${category.id}/${formatURL(
                section.name
              )}?filter=${formatURL(item.name)}`}
              className="p-0 my-0 text-foreground hover:underline underline-offset-4"
              onClick={closePopovers}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
