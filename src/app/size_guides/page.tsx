"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Ruler,
  Shirt,
  MessageSquare,
  Footprints,
  Info,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

const SizeGuide = () => {
  const [activeSection, setActiveSection] = useState<string | null>("shirts");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (activeSection !== sectionId) {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Create a custom PantsIcon since it doesn't exist in lucide-react
  const PantsIcon = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 2v20M16 2v20M3 2h18M4 7h4M16 7h4M4 14h4M16 14h4M3 22h18" />
    </svg>
  );

  const sizeGuideCategories = [
    {
      id: "shirts",
      title: "Shirts & Tops",
      icon: <Shirt className="h-5 w-5" />,
    },
    {
      id: "pants",
      title: "Pants & Bottoms",
      icon: <PantsIcon className="h-5 w-5" />,
    },
    {
      id: "shoes",
      title: "Shoes & Footwear",
      icon: <Footprints className="h-5 w-5" />,
    },
    {
      id: "measuring",
      title: "How to Measure",
      icon: <Footprints className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Size Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use our size guide to find your perfect fit! Whether you're shopping
            for tops, bottoms, or shoes, we have the measurements and visuals to
            help you make the right choice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Categories
              </h2>
              <ul className="space-y-2">
                {sizeGuideCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => scrollToSection(category.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.icon}
                      <span className="ml-2 text-sm font-medium">
                        {category.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-700">
                  Not sure which size to choose? Our customer service team is
                  ready to assist you.
                </p>
                <div className="mt-4">
                  <Link href="/customer_service">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Shirts Section */}
            <div
              ref={(el) => {
                sectionRefs.current["shirts"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shirts")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Shirt className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Shirts & Tops
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "shirts" ? "rotate-180" : ""
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
              {activeSection === "shirts" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-800">
                        Men's Shirt Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chest (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Length (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">S</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                34–36
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">M</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                38–40
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                29
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">L</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                42–44
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                XL
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                46–48
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                31
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                XXL
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                50–52
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                32
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-medium mb-4 mt-8 text-gray-800">
                        Women's Shirt Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bust (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Length (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                XS
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30–32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                25
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">S</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                33–35
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                26
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">M</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                36–38
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                27
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">L</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                39–41
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                XL
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                42–44
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                29
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">
                          How to measure chest/bust:
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          Measure around the fullest part of your chest/bust,
                          keeping the tape measure horizontal.
                        </p>
                        <Image
                          src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1000&auto=format&fit=crop"
                          alt="Shirt sizing guide"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">
                          Shirt Fit Guide
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="font-medium mr-2">
                              Regular Fit:
                            </span>{" "}
                            Standard fit with room in the chest and waist.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Slim Fit:</span>{" "}
                            Tailored closer to the body with a narrower waist.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">
                              Relaxed Fit:
                            </span>{" "}
                            Looser fit with extra room throughout for comfort.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pants Section */}
            <div
              ref={(el) => {
                sectionRefs.current["pants"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("pants")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <PantsIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Pants & Bottoms
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "pants" ? "rotate-180" : ""
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
              {activeSection === "pants" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-800">
                        Men's Pants Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Waist (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inseam (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hip (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                35
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                37
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                39
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                41
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                36
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                36
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                43
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                38
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                38
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-34
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                45
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-medium mb-4 mt-8 text-gray-800">
                        Women's Pants Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Waist (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hip (inches)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inseam (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                00 (XS)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                24-25
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                34-35
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                0 (XS)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                25-26
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                35-36
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                2 (S)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                26-27
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                36-37
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                4 (S)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                27-28
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                37-38
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                6 (M)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28-29
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                38-39
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                8 (M)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                29-30
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                39-40
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10 (L)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30-31
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                40-41
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                12 (L)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                31-32
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                41-42
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                30
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">
                          How to measure waist & hips:
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          For waist, measure around the narrowest part of your
                          natural waistline. For hips, measure around the
                          fullest part of your hips.
                        </p>
                        <Image
                          src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop"
                          alt="Pants measuring guide"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">
                          Pants Fit Guide
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Skinny:</span>{" "}
                            Very close-fitting throughout the leg with a narrow
                            ankle opening.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Slim:</span>{" "}
                            Close-fitting through the thigh with a slightly
                            wider leg opening.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Regular:</span>{" "}
                            Traditional fit with straight legs from hip to
                            ankle.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Relaxed:</span>{" "}
                            Loose and comfortable throughout with extra room in
                            the thigh.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shoes Section */}
            <div
              ref={(el) => {
                sectionRefs.current["shoes"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shoes")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Footprints className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Shoes & Footwear
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "shoes" ? "rotate-180" : ""
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
              {activeSection === "shoes" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-800">
                        Men's Shoe Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                US
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EU
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                UK
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inches
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                CM
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">7</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                40
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                6.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.6"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                24.4
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">8</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                41
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                7.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.9"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                25.1
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">9</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                42
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                8.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10.2"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                25.9
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                43
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10.5"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                26.7
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                11
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                44
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10.8"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                27.5
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                12
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                45
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                11.5
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                11.2"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                28.3
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-medium mb-4 mt-8 text-gray-800">
                        Women's Shoe Sizing
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                US
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EU
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                UK
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inches
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                CM
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">5</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                35-36
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">3</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                8.5"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                21.6
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">6</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                36-37
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">4</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                8.8"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                22.2
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">7</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                37-38
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">5</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.1"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                23.2
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">8</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                38-39
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">6</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.4"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                23.9
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">9</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                39-40
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">7</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                9.8"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                24.9
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                40-41
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">8</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                10.1"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                25.7
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">
                          How to measure your foot:
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          Place your foot on a piece of paper and trace around
                          it. Measure the length from the longest toe to the
                          heel.
                        </p>
                        <Image
                          src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000&auto=format&fit=crop"
                          alt="Shoe sizing guide"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">
                          Shoe Fitting Tips
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="font-medium mr-2">
                              Best Time to Measure:
                            </span>{" "}
                            Measure your feet in the evening when they are at
                            their largest.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Both Feet:</span>{" "}
                            Measure both feet as they can be different sizes.
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Width:</span> If
                            you have wide feet, look for shoes marked with "W"
                            or "Wide".
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Space:</span>{" "}
                            There should be about 3/8" to 1/2" of space between
                            your longest toe and the end of the shoe.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* How to Measure Section */}
            <div
              ref={(el) => {
                sectionRefs.current["measuring"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("measuring")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Ruler className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    How to Measure
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "measuring" ? "rotate-180" : ""
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
              {activeSection === "measuring" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="text-gray-700 mb-6">
                    To ensure the best fit, follow these guidelines when
                    measuring yourself:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-800">
                        Tools You'll Need
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                        <li>A soft measuring tape</li>
                        <li>
                          A piece of paper and pencil to record measurements
                        </li>
                        <li>
                          A friend to help (for more accurate measurements)
                        </li>
                      </ul>

                      <h3 className="text-lg font-medium mb-4 mt-8 text-gray-800">
                        General Tips
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                        <li>
                          Wear minimal clothing or undergarments for most
                          accurate measurements
                        </li>
                        <li>
                          Stand naturally, don't hold your breath or tense up
                        </li>
                        <li>Keep the measuring tape snug but not tight</li>
                        <li>Measure twice to confirm your results</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-lg space-y-4">
                      <h3 className="text-lg font-medium text-blue-800">
                        Specific Measurements
                      </h3>

                      <div>
                        <h4 className="font-medium text-gray-800">
                          Chest/Bust
                        </h4>
                        <p className="text-sm text-gray-700">
                          Measure around the fullest part of your chest/bust,
                          keeping the tape horizontal.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800">Waist</h4>
                        <p className="text-sm text-gray-700">
                          Measure around your natural waistline, which is the
                          narrowest part of your torso.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800">Hips</h4>
                        <p className="text-sm text-gray-700">
                          Measure around the fullest part of your hips, about
                          7-9 inches below your waistline.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800">Inseam</h4>
                        <p className="text-sm text-gray-700">
                          Measure from the crotch of your pants to the bottom of
                          your ankle.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800">Shoulders</h4>
                        <p className="text-sm text-gray-700">
                          Measure from the edge of one shoulder across to the
                          other shoulder.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Image
                      src="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1000&auto=format&fit=crop"
                      alt="Measurement guide"
                      width={800}
                      height={400}
                      className="rounded-lg shadow-md mx-auto"
                    />
                  </div>

                  <div className="mt-6 bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-gray-800">
                      Still Unsure?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      If you're between sizes or unsure about your measurements,
                      we recommend sizing up. You can also contact our customer
                      service team for personalized sizing advice.
                    </p>
                    <Link href="/customer_service">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get Sizing Help
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Need help finding your size? We're here to assist you.
          </p>
          <div className="flex space-x-3">
            <a
              href="mailto:support@yourcompany.com"
              className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              <Mail className="h-4 w-4 mr-2" /> Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Phone className="h-4 w-4 mr-2" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
