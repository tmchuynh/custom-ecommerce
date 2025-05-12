import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Example() {
  return (
    <div className="relative px-6 lg:px-0 py-24 sm:py-32 overflow-hidden lg:overflow-visible isolate">
      <div className="-z-10 absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          className="top-0 left-[max(50%,25rem)] absolute w-[128rem] h-[64rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="lg:items-start gap-x-8 gap-y-16 lg:gap-y-10 grid grid-cols-1 lg:grid-cols-2 mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
        <div className="lg:gap-x-8 lg:grid lg:grid-cols-2 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:px-8 lg:w-full lg:max-w-7xl">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="font-semibold text-base/7">Deploy faster</p>
              <h1 className="mb-8 font-extrabold text-4xl text-center">
                A better workflow
              </h1>
              <p className="mt-6 text-xl/8">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                id at vitae feugiat egestas.
              </p>
            </div>
          </div>
        </div>
        <Image
          alt="Dark project app screenshot"
          src="https://tailwindui.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
          width={912} // Adjust width as needed
          height={512} // Adjust height as needed
          className="bg-gray-900 shadow-xl rounded-xl ring-1 ring-gray-400/10 w-[48rem] sm:w-[57rem] max-w-none"
        />
      </div>
      <div className="lg:gap-x-8 lg:grid lg:grid-cols-2 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:px-8 lg:w-full lg:max-w-7xl">
        <div className="lg:pr-4">
          <div className="max-w-xl lg:max-w-lg text-base/7">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
            <ul role="list" className="space-y-8 mt-8">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="flex-none mt-1 size-5"
                />
                <span>
                  <strong className="font-semibold">Push to deploy.</strong>{" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="flex-none mt-1 size-5"
                />
                <span>
                  <strong className="font-semibold">SSL certificates.</strong>{" "}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="flex-none mt-1 size-5"
                />
                <span>
                  <strong className="font-semibold">Database backups.</strong>{" "}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
            <h2 className="mb-4 font-semibold text-2xl">
              No server? No problem.
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
