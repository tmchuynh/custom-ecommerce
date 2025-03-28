import { trendingProducts } from "@/lib/constants";
import { Button } from "./ui/button";
import Image from "next/image";

export default function TrendingProducts() {
  return (
    <section aria-labelledby="trending-heading">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 py-15">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-semibold mb-4">
            Trending products
          </h2>
          <Button>
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </Button>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {trendingProducts.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex w-64 flex-col text-center lg:w-auto"
                >
                  <div className="relative h-96 group rounded-2xl overflow-hidden">
                    <Image
                      width={1920}
                      height={1080}
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      objectFit="cover"
                      className="aspect-square w-full object-cover"
                    />
                    <div className="mt-6 pt-8 h-1/3 w-full absolute bottom-0 bg-gradient-to-t from-muted via-muted/80 to-muted/10 group-hover:opacity-75">
                      <p
                        className="text-sm uppercase font-semibold tracking-widest"
                        style={{
                          color: product.availableColors.at(0)?.colorBg,
                        }}
                      >
                        {product.color}
                      </p>
                      <h3 className="mt-1 font-semibold">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1">{product.price}</p>
                    </div>
                  </div>

                  <h4 className="sr-only">Available colors</h4>
                  <ul
                    role="list"
                    className="mt-auto flex items-center justify-center space-x-3 pt-6"
                  >
                    {product.availableColors.map((color) => (
                      <li
                        key={color.name}
                        style={{ backgroundColor: color.colorBg }}
                        className="size-4 rounded-full border"
                      >
                        <span className="sr-only">{color.name}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 px-4 sm:hidden">
          <Button>
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
