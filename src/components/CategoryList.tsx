import { CategoryProps } from "@/lib/interfaces";
import Link from "next/link";

export default function CategoryList({
  section,
  index,
  category,
}: CategoryProps) {
  return (
    <div key={index} className="space-y-4">
      <div className="flex items-center justify-between">
        <p
          id={`${category.id}-${section.id}-heading`}
          className="font-bold tracking-wider uppercase"
        >
          {section.name}
        </p>
      </div>
      <ul
        role="list"
        aria-labelledby={`${category.id}-${section.id}-heading`}
        className="mt-4 space-y-4"
      >
        <li>
          <Link href={`/shopping/${category.id}/${section.id}`}>Shop All</Link>
        </li>
        {section.items.map((item) => (
          <li key={item.name} className="flex">
            <Link
              href={item.href}
              className="hover:underline underline-offset-6"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
