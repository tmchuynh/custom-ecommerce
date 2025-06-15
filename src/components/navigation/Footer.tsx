import { navigationSections } from "@/lib/constants/constants";
import Newsletter from "./Newsletter";

export default function Footer() {
  // Create an array of navigation sections for easier iteration

  return (
    <>
      <Newsletter />
      <footer aria-labelledby="footer-heading" className="border-t">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navigationSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-medium mb-4 uppercase tracking-widest">
                  {section.title}
                </h3>
                <ul role="list" className="space-y-4">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="text-sm hover:underline underline-offset-4"
                    >
                      <a href={item.href}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t py-8">
            <p className="text-sm">
              Copyright &copy; {new Date().getFullYear()} Your Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
