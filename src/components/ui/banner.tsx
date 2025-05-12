import { FaX } from "react-icons/fa6";

export default function Banner() {
  return (
    <div className="relative flex sm:before:flex-1 items-center gap-x-6 px-6 sm:px-3.5 py-2.5 overflow-hidden isolate">
      <div
        aria-hidden="true"
        className="top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 absolute blur-2xl transform-gpu -translate-y-1/2"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.0625rem] aspect-577/310"
        />
      </div>
      <div
        aria-hidden="true"
        className="top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 absolute blur-2xl transform-gpu -translate-y-1/2"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.0625rem] aspect-577/310"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6">
          <strong className="font-semibold">GeneriCon 2023</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="inline mx-2 size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          Join us in Denver from June 7 – 9 to see what’s coming next.
        </p>
        <a
          href="#"
          className="flex-none bg-gray-900 hover:bg-gray-700 shadow-2xs px-3.5 py-1 rounded-full font-semibold text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <FaX aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
