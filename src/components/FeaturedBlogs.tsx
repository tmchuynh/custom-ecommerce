import { blogPosts } from "@/lib/blog-constants";
import Image from "next/image";

export default function FeaturedBlogs() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          From the blog
        </h2>
        <p className="mt-2 text-lg/8">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
          >
            <Image
              alt=""
              src={post.imageUrl}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 -z-10"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
              <time dateTime={post.datetime} className="mr-8">
                {post.date}
              </time>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 size-0.5 flex-none fill-white/50"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="flex gap-x-2.5">
                  <Image
                    alt=""
                    src={post.author.imageUrl}
                    width={24}
                    height={24}
                    className="size-6 flex-none rounded-full bg-white/10"
                  />
                  {post.author.name}
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg/6 font-semibold text-white">
              <a href={post.href}>
                <span className="absolute inset-0" />
                {post.title}
              </a>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
