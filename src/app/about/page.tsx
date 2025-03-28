"use client";

import { useState, useRef } from "react";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import LogoCloud from "@/components/LogoCloud";
import Team from "@/components/Team";
import { stats, values } from "@/lib/constants";
import Image from "next/image";
import { BookOpen, Users, Award, Briefcase, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (activeSection !== sectionId) {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "values",
      title: "Our Values",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: "team",
      title: "Our Team",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "partners",
      title: "Our Partners",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: "blog",
      title: "Featured Articles",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  return (
    <main className="isolate min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero section with background */}
      <div className="relative isolate -z-10">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
            className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>

        {/* Hero content */}
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
                About Us
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're changing the way people connect through innovative
                products and exceptional experiences.
              </p>
            </div>

            <div className="mx-auto max-w-7xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                <p className="mt-8 text-lg font-medium text-pretty sm:max-w-md sm:text-xl/8 lg:max-w-none text-gray-700">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit. Et labore commodo nulla
                  aliqua proident mollit ullamco exercitation tempor. Sint
                  aliqua anim nulla sunt mollit id pariatur in voluptate cillum.
                  Eu voluptate tempor esse minim amet fugiat veniam occaecat
                  aliqua.
                </p>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <Image
                  alt="Team collaborating"
                  src="https://images.unsplash.com/photo-1472148083604-64f1084980b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={352}
                  height={528}
                  className="aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                />
                <Image
                  alt="Customer experience"
                  src="https://images.unsplash.com/photo-1513171920216-2640b288471b?q=80&w=1709&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={352}
                  height={528}
                  className="aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                />
                <Image
                  alt="Community connection"
                  src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={352}
                  height={528}
                  className="aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with accordions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">About Us</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {section.icon}
                      <span className="ml-2 text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Join Our Team
                </h3>
                <p className="text-sm text-gray-700">
                  We're always looking for talented individuals to join our
                  growing team.
                </p>
                <div className="mt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Careers
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Mission Section */}
            <div
              ref={(el) => {
                sectionRefs.current["mission"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("mission")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Our Mission
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "mission" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "mission" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="mt-6 flex flex-col gap-x-8 gap-y-10 lg:flex-row">
                    <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                      <p className="text-xl/8 text-gray-700">
                        Aliquet nec orci mattis amet quisque ullamcorper neque,
                        nibh sem. At arcu, sit dui mi, nibh dui, diam eget
                        aliquam. Quisque id at vitae feugiat egestas ac. Diam
                        nulla orci at in viverra scelerisque eget. Eleifend
                        egestas fringilla sapien.
                      </p>
                      <p className="mt-6 text-base/7 text-gray-600">
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed
                        eget risus enim. Mattis mauris semper sed amet vitae sed
                        turpis id. Id dolor praesent donec est. Odio penatibus
                        risus viverra tellus varius sit neque erat velit.
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed
                        eget risus enim. Mattis mauris semper sed amet vitae sed
                        turpis id.
                      </p>
                    </div>
                    <div className="lg:flex lg:flex-auto lg:justify-center">
                      <dl className="w-64 space-y-8 xl:w-80">
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex flex-col-reverse gap-y-4"
                          >
                            <dt className="text-base/7 text-gray-600">
                              {stat.label}
                            </dt>
                            <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                              {stat.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Image
                      alt="Team collaboration"
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                      width={2832}
                      height={1132}
                      className="aspect-5/2 w-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Values Section */}
            <div
              ref={(el) => {
                sectionRefs.current["values"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("values")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Our Values
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "values" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "values" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="mt-6 text-lg/8 text-gray-700">
                    Lorem ipsum dolor sit amet consect adipisicing elit.
                    Possimus magnam voluptatum cupiditate veritatis in accusamus
                    quisquam.
                  </p>
                  <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
                    {values.map((value) => (
                      <div
                        key={value.name}
                        className="flex flex-col gap-5 bg-gray-50 p-6 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <value.Icon className="h-10 w-10 text-blue-600" />
                          <dt className="font-bold uppercase text-blue-700 text-lg">
                            {value.name}
                          </dt>
                        </div>
                        <dd className="text-gray-600 text-base">
                          {value.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Team Section */}
            <div
              ref={(el) => {
                sectionRefs.current["team"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("team")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Our Team
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "team" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "team" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="mt-4 text-lg/8 text-gray-700 mb-8">
                    Our dedicated team of professionals is passionate about
                    delivering exceptional products and experiences to our
                    customers.
                  </p>
                  <Team />
                </div>
              )}
            </div>

            {/* Partners Section */}
            <div
              ref={(el) => {
                sectionRefs.current["partners"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("partners")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Our Partners
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "partners" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "partners" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="mt-4 text-lg/8 text-gray-700 mb-8">
                    We collaborate with industry-leading partners to provide the
                    best solutions and experiences for our customers.
                  </p>
                  <LogoCloud />
                </div>
              )}
            </div>

            {/* Blog Section */}
            <div
              ref={(el) => {
                sectionRefs.current["blog"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("blog")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Featured Articles
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "blog" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "blog" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="mt-4 text-lg/8 text-gray-700 mb-8">
                    Explore our latest articles and insights about our company,
                    products, and industry trends.
                  </p>
                  <FeaturedBlogs />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Want to learn more about our company and mission?
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
}
