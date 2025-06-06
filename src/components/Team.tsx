import { people } from "@/lib/constants/constants";
import Image from "next/image";

export default function Team() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto grid grid-cols-1 gap-20 px-6 lg:px-8 w-full md:w-11/12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Meet our leadership</h2>
          <p className="mt-6 text-lg/8">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>

        <ul
          role="list"
          className="col-span-2 grid grid-cols-1 2xl:grid-cols-2 w-full gap-9"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-9">
                <Image
                  alt=""
                  src={person.imageUrl}
                  width={180}
                  height={180}
                  className="rounded-4xl object-cover object-center w-26 h-40"
                />
                <div>
                  <h3 className="text-lg font-medium mb-4">{person.name}</h3>
                  <p className="text-sm/6 font-semibold">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
