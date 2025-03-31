"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils/utils";
import { FaMessage, FaShirt } from "react-icons/fa6";
import { RiFootprintFill } from "react-icons/ri";
import { PiPantsFill } from "react-icons/pi";
import { TbRulerMeasure2 } from "react-icons/tb";
import { IoMdHelp } from "react-icons/io";
import { sizeGuideCategories } from "@/lib/constants/informationDetails";

/**
 * A comprehensive size guide component that displays sizing information for clothing and footwear.
 *
 * @component
 * @description Renders an interactive size guide with multiple collapsible sections for different clothing categories.
 * Includes detailed sizing tables for shirts, pants, and shoes for both men and women, along with measurement instructions.
 *
 * @example
 * ```tsx
 * <SizeGuide />
 * ```
 *
 * @features
 * - Interactive navigation sidebar with category links
 * - Collapsible accordion sections for each clothing category
 * - Detailed sizing tables with measurements in multiple units
 * - Visual measurement guides and instructions
 * - Mobile responsive design
 * - Customer support integration
 *
 * @sections
 * - Shirts & Tops: Sizing tables for men's and women's shirts with fit guide
 * - Pants & Bottoms: Comprehensive pants sizing for men and women
 * - Shoes & Footwear: Shoe size conversion charts and fitting tips
 * - How to Measure: Detailed measurement instructions and tools needed
 *
 * @state
 * - activeSection: Tracks which accordion section is currently expanded
 * - sectionRefs: Stores references to section elements for scroll functionality
 *
 * @hooks
 * - useState: Manages active section state
 * - useRef: Stores section element references
 *
 * @dependencies
 * - next/image
 * - lucide-react icons
 * - Custom PantsIcon SVG component
 */
const SizeGuide = () => {
  const [activeSection, setActiveSection] = useState<string | null>("shirts");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, sectionRefs, setActiveSection);
  };

  const toggleSection = (sectionId: string) => {
    toggleAccordionSection(
      sectionId,
      activeSection,
      setActiveSection,
      sectionRefs.current[sectionId]
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Size Guide</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Use our size guide to find your perfect fit! Whether you're shopping
            for tops, bottoms, or shoes, we have the measurements and visuals to
            help you make the right choice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 border rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 ">Content</h2>
              <ul className="space-y-2">
                {sizeGuideCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleScrollToSection(category.id)}
                      className={`flex items-center w-full text-center px-3 py-2 rounded-lg transition-colors ${
                        activeSection === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <category..icon className="h-6 w-6" />
                      <span className="ml-2 text-sm font-medium">
                        {category.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-lg bg-muted space-y-2">
                <h3 className="font-medium flex items-center">
                  <IoMdHelp className="h-4 w-4 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm">
                  Not sure which size to choose? Our customer service team is
                  ready to assist you.
                </p>
                <div className="mt-4">
                  <Link href="/customer_service" className="w-full">
                    <Button className="w-full">
                      <FaMessage className="h-4 w-4 mr-2" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Shirts Section */}
            <div
              ref={(el) => {
                sectionRefs.current["shirts"] = el;
              }}
              className="rounded-xl border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shirts")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <FaShirt className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3 ">
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
                <div className="p-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[60rem]">
                    <div>
                      <div>
                        <h3 className="text-lg font-medium mb-4 ">
                          Men's Shirt Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Size
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Chest (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Length (inches)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  S
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  34–36
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  28
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  M
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  38–40
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  29
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  L
                                </td>
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
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Women's Shirt Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Size
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Bust (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Length (inches)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
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
                                <td className="px-4 py-3 whitespace-nowrap">
                                  S
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  33–35
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  26
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  M
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  36–38
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  27
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  L
                                </td>
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

                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Shirt Fit Guide
                        </h3>
                        <table className="min-w-full divide-y border rounded-lg">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Fit Type
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Regular Fit
                              </td>
                              <td className="px-4 py-2">
                                Standard fit with room in the chest and waist.
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Slim Fit
                              </td>
                              <td className="px-4 py-2">
                                Tailored closer to the body with a narrower
                                waist.
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Relaxed Fit
                              </td>
                              <td className="px-4 py-2">
                                Looser fit with extra room throughout for
                                comfort.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className=" p-4 rounded-lg border">
                        <h3 className="font-medium  mb-2">
                          How to measure chest/bust:
                        </h3>
                        <p className="text-sm mb-4">
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
              className="rounded-xl border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("pants")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <PiPantsFill className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3 ">
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
                <div className="p-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60rem] gap-8">
                    <div>
                      <div>
                        <h3 className="text-lg font-medium mb-4 ">
                          Men's Pants Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Size
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Waist (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Inseam (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Hip (inches)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
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
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Women's Pants Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Size
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Waist (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Hip (inches)
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Inseam (inches)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
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
                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Pants Fit Guide
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Fit Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  Skinny
                                </td>
                                <td className="px-4 py-2">
                                  Very close-fitting throughout the leg with a
                                  narrow ankle opening.
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  Slim
                                </td>
                                <td className="px-4 py-2">
                                  Close-fitting through the thigh with a
                                  slightly wider leg opening.
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  Regular
                                </td>
                                <td className="px-4 py-2">
                                  Traditional fit with straight legs from hip to
                                  ankle.
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  Relaxed
                                </td>
                                <td className="px-4 py-2">
                                  Loose and comfortable throughout with extra
                                  room in the thigh.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className=" p-4 rounded-lg border">
                        <h3 className="font-medium  mb-2">
                          How to measure waist & hips:
                        </h3>
                        <p className="text-sm mb-4">
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
              className="rounded-xl border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shoes")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <RiFootprintFill className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3 ">
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
                <div className="p-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60rem] gap-8">
                    <div>
                      <div>
                        <h3 className="text-lg font-medium mb-4 ">
                          Men's Shoe Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  US
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  EU
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  UK
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Inches
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  CM
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  7
                                </td>
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
                                <td className="px-4 py-3 whitespace-nowrap">
                                  8
                                </td>
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
                                <td className="px-4 py-3 whitespace-nowrap">
                                  9
                                </td>
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
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Women's Shoe Sizing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y border rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  US
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  EU
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  UK
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  Inches
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                  CM
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-center">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  5
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  35-36
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  3
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  8.5"
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  21.6
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  6
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  36-37
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  4
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  8.8"
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  22.2
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  7
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  37-38
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  5
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  9.1"
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  23.2
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  8
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  38-39
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  6
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  9.4"
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  23.9
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  9
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  39-40
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  7
                                </td>
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
                                <td className="px-4 py-3 whitespace-nowrap">
                                  8
                                </td>
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

                      <div>
                        <h3 className="text-lg font-medium mb-4 mt-8 ">
                          Shoe Fitting Tips
                        </h3>
                        <table className="min-w-full divide-y border rounded-lg">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Tip
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Best Time to Measure
                              </td>
                              <td className="px-4 py-2">
                                Measure your feet in the evening when they are
                                at their largest.
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Both Feet
                              </td>
                              <td className="px-4 py-2">
                                Measure both feet as they can be different
                                sizes.
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Width
                              </td>
                              <td className="px-4 py-2">
                                If you have wide feet, look for shoes marked
                                with "W" or "Wide".
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                Space
                              </td>
                              <td className="px-4 py-2">
                                There should be about 3/8" to 1/2" of space
                                between your longest toe and the end of the
                                shoe.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <div className=" p-4 rounded-lg border">
                        <h3 className="font-medium  mb-2">
                          How to measure your foot:
                        </h3>
                        <p className="text-sm mb-4">
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
              className="rounded-xl border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("measuring")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <TbRulerMeasure2 className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3 ">
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
                <div className="p-6 border-t">
                  <p className="mb-6">
                    To ensure the best fit, follow these guidelines when
                    measuring yourself:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2min-h-[60rem] gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-8">
                        <div className="border rounded-lg p-5">
                          <h3 className="text-lg font-medium mb-4">
                            Tools You'll Need
                          </h3>
                          <ul className="list-disc list-outside mx-5 space-y-2 ml-2">
                            <li>A soft measuring tape</li>
                            <li>
                              A piece of paper and pencil to record measurements
                            </li>
                            <li>
                              A friend to help (for more accurate measurements)
                            </li>
                          </ul>
                        </div>

                        <div className="border rounded-lg p-5">
                          <h3 className="text-lg font-medium mb-4">
                            General Tips
                          </h3>
                          <ul className="list-disc list-outside mx-5 space-y-2 ml-2">
                            <li>
                              Wear minimal clothing or undergarments for most
                              accurate measurements
                            </li>
                            <li>
                              Stand naturally, don't hold your breath or tense
                              up
                            </li>
                            <li>Keep the measuring tape snug but not tight</li>
                            <li>Measure twice to confirm your results</li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-lg border">
                          <h3 className="text-lg font-medium mb-2 ">
                            Still Unsure?
                          </h3>
                          <p className="mb-4">
                            If you're between sizes or unsure about your
                            measurements, we recommend sizing up. You can also
                            contact our customer service team for personalized
                            sizing advice.
                          </p>
                          <Link href="/customer_service">
                            <Button>Get Sizing Help</Button>
                          </Link>
                        </div>
                      </div>

                      <div>
                        <Image
                          src="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1000&auto=format&fit=crop"
                          alt="Measurement guide"
                          width={800}
                          height={400}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                    </div>

                    <div className="p-5 rounded-lg border space-y-4">
                      <h3 className="text-lg font-medium">
                        Specific Measurements
                      </h3>

                      <div>
                        <h4 className="font-medium ">Chest/Bust</h4>
                        <p className="text-sm">
                          Measure around the fullest part of your chest/bust,
                          keeping the tape horizontal.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium ">Waist</h4>
                        <p className="text-sm">
                          Measure around your natural waistline, which is the
                          narrowest part of your torso.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium ">Hips</h4>
                        <p className="text-sm">
                          Measure around the fullest part of your hips, about
                          7-9 inches below your waistline.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium ">Inseam</h4>
                        <p className="text-sm">
                          Measure from the crotch of your pants to the bottom of
                          your ankle.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium ">Shoulders</h4>
                        <p className="text-sm">
                          Measure from the edge of one shoulder across to the
                          other shoulder.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
