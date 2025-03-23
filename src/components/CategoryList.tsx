import { CategoryProps } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

export default function CategoryList({
  section,
  index,
  category,
  closePopovers,
}: CategoryProps) {
  const router = useRouter();
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
        {section.name !== "Shop by Collection" && (
          <li>
            <a
              href={`/shopping/${category.id}/${section.id}`}
              className="p-0 my-0 text-foreground hover:underline underline-offset-4"
              onClick={() => {
                closePopovers?.();
                router.push(`/shopping/${category.id}/${section.id}`);
              }}
            >
              Shop All {section.name}
            </a>
          </li>
        )}
        {section.items.map((item) => (
          <li key={item.name} className="">
            <a
              href={item.href}
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
