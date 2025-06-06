import Image from "next/image";

export default function LogoCloud() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">
          Trusted by the world’s most innovative teams
        </h2>
        <Image
          alt="Transistor"
          src="https://tailwindui.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
          width={158}
          height={48}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        />
        <Image
          alt="Reform"
          src="https://tailwindui.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
          width={158}
          height={48}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        />
        <Image
          alt="Tuple"
          src="https://tailwindui.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
          width={158}
          height={48}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        />
        <Image
          alt="SavvyCal"
          src="https://tailwindui.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
          width={158}
          height={48}
          className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
        />
        <Image
          alt="Statamic"
          src="https://tailwindui.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
          width={158}
          height={48}
          className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
        />
      </div>
    </div>
  );
}
