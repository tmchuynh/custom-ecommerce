import Image from "next/image";
/**
 * A component that displays a cloud of logo images.
 *
 * This component showcases a collection of logos from various companies,
 * demonstrating the wide adoption of the company's tools. It includes
 * responsive grid layouts for different screen sizes and a call-to-action
 * link to customer stories.
 *
 * @returns {JSX.Element} A React element representing the logo cloud.
 */
export default function LogoCloud() {
  return (
    <div className="relative isolate -z-10 mt-28 py-12 border-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-2">
        <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            alt="Transistor"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="Reform"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="Tuple"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="SavvyCal"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <Image
            alt="Statamic"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
        <div className="mt-16 flex justify-center">
          <p className="relative rounded-full px-4 py-1.5 text-sm/6 ring-1 ring-gray-900/5 ring-inset">
            <span className="hidden md:inline">
              Over 2500 companies use our tools to better their business.
            </span>
            <a href="#" className="font-semibold inline-flex items-center">
              <span aria-hidden="true" className="absolute inset-0" /> Read our
              customer stories <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
