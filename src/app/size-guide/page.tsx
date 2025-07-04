"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Info, Ruler, Shirt, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SizeGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [selectedGarment, setSelectedGarment] = useState("tops");

  const categories = [
    { value: "women", label: "Women's", icon: "👩" },
    { value: "men", label: "Men's", icon: "👨" },
    { value: "kids", label: "Kids", icon: "👶" },
  ];

  const garmentTypes = {
    women: [
      { value: "tops", label: "Tops & Blouses" },
      { value: "dresses", label: "Dresses" },
      { value: "bottoms", label: "Pants & Skirts" },
      { value: "outerwear", label: "Jackets & Coats" },
      { value: "intimates", label: "Intimates" },
      { value: "shoes", label: "Shoes" },
    ],
    men: [
      { value: "shirts", label: "Shirts" },
      { value: "pants", label: "Pants" },
      { value: "suits", label: "Suits & Blazers" },
      { value: "outerwear", label: "Jackets & Coats" },
      { value: "shoes", label: "Shoes" },
    ],
    kids: [
      { value: "tops", label: "Tops" },
      { value: "bottoms", label: "Bottoms" },
      { value: "dresses", label: "Dresses" },
      { value: "outerwear", label: "Outerwear" },
      { value: "shoes", label: "Shoes" },
    ],
  };

  const sizingData = {
    women: {
      tops: {
        headers: ["Size", "Bust", "Waist", "Hips", "Length"],
        rows: [
          ["XS", '32-34"', '24-26"', '34-36"', '24"'],
          ["S", '34-36"', '26-28"', '36-38"', '25"'],
          ["M", '36-38"', '28-30"', '38-40"', '26"'],
          ["L", '38-40"', '30-32"', '40-42"', '27"'],
          ["XL", '40-42"', '32-34"', '42-44"', '28"'],
          ["XXL", '42-44"', '34-36"', '44-46"', '29"'],
        ],
      },
      dresses: {
        headers: ["Size", "Bust", "Waist", "Hips", "Length"],
        rows: [
          ["XS", '32-34"', '24-26"', '34-36"', '35"'],
          ["S", '34-36"', '26-28"', '36-38"', '36"'],
          ["M", '36-38"', '28-30"', '38-40"', '37"'],
          ["L", '38-40"', '30-32"', '40-42"', '38"'],
          ["XL", '40-42"', '32-34"', '42-44"', '39"'],
          ["XXL", '42-44"', '34-36"', '44-46"', '40"'],
        ],
      },
      bottoms: {
        headers: ["Size", "Waist", "Hips", "Inseam"],
        rows: [
          ["XS", '24-26"', '34-36"', '30"'],
          ["S", '26-28"', '36-38"', '30"'],
          ["M", '28-30"', '38-40"', '31"'],
          ["L", '30-32"', '40-42"', '31"'],
          ["XL", '32-34"', '42-44"', '32"'],
          ["XXL", '34-36"', '44-46"', '32"'],
        ],
      },
      shoes: {
        headers: ["US Size", "EU Size", "UK Size", "Length (inches)"],
        rows: [
          ["5", "35", "2.5", '8.5"'],
          ["5.5", "35.5", "3", '8.75"'],
          ["6", "36", "3.5", '9"'],
          ["6.5", "37", "4", '9.25"'],
          ["7", "37.5", "4.5", '9.5"'],
          ["7.5", "38", "5", '9.75"'],
          ["8", "38.5", "5.5", '10"'],
          ["8.5", "39", "6", '10.25"'],
          ["9", "40", "6.5", '10.5"'],
          ["9.5", "40.5", "7", '10.75"'],
          ["10", "41", "7.5", '11"'],
        ],
      },
    },
    men: {
      shirts: {
        headers: ["Size", "Chest", "Waist", "Neck", "Sleeve"],
        rows: [
          ["XS", '34-36"', '28-30"', '14-14.5"', '32-33"'],
          ["S", '36-38"', '30-32"', '14.5-15"', '33-34"'],
          ["M", '38-40"', '32-34"', '15-15.5"', '34-35"'],
          ["L", '40-42"', '34-36"', '15.5-16"', '35-36"'],
          ["XL", '42-44"', '36-38"', '16-16.5"', '36-37"'],
          ["XXL", '44-46"', '38-40"', '16.5-17"', '37-38"'],
        ],
      },
      pants: {
        headers: ["Size", "Waist", "Hips", "Inseam"],
        rows: [
          ["28", '28"', '36"', '30-34"'],
          ["30", '30"', '38"', '30-34"'],
          ["32", '32"', '40"', '30-34"'],
          ["34", '34"', '42"', '30-34"'],
          ["36", '36"', '44"', '30-34"'],
          ["38", '38"', '46"', '30-34"'],
          ["40", '40"', '48"', '30-34"'],
        ],
      },
      shoes: {
        headers: ["US Size", "EU Size", "UK Size", "Length (inches)"],
        rows: [
          ["7", "40", "6", '10"'],
          ["7.5", "40.5", "6.5", '10.25"'],
          ["8", "41", "7", '10.5"'],
          ["8.5", "42", "7.5", '10.75"'],
          ["9", "42.5", "8", '11"'],
          ["9.5", "43", "8.5", '11.25"'],
          ["10", "44", "9", '11.5"'],
          ["10.5", "44.5", "9.5", '11.75"'],
          ["11", "45", "10", '12"'],
          ["11.5", "45.5", "10.5", '12.25"'],
          ["12", "46", "11", '12.5"'],
        ],
      },
    },
  };

  const measurementTips = [
    {
      title: "Chest/Bust",
      description:
        "Measure around the fullest part of your chest/bust, keeping the tape measure parallel to the floor.",
      icon: <Ruler className="w-5 h-5" />,
    },
    {
      title: "Waist",
      description:
        "Measure around your natural waistline, which is typically the narrowest part of your torso.",
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      title: "Hips",
      description:
        "Measure around the fullest part of your hips, about 7-9 inches below your waistline.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Inseam",
      description:
        "Measure from the top of your inner thigh down to your ankle bone.",
      icon: <Shirt className="w-5 h-5" />,
    },
  ];

  const fitTips = [
    {
      title: "Know Your Measurements",
      content:
        "Use a soft measuring tape and have someone help you for the most accurate measurements. Measure over your undergarments.",
    },
    {
      title: "Consider the Fit Type",
      content:
        "Different styles fit differently. A slim-fit shirt will be more snug than a regular fit in the same size.",
    },
    {
      title: "Check the Size Chart",
      content:
        "Sizes can vary between brands and even between different items from the same brand. Always check the specific size chart.",
    },
    {
      title: "When in Doubt, Size Up",
      content:
        "If you're between sizes or unsure, it's often better to go with the larger size. You can always exchange if needed.",
    },
    {
      title: "Read Reviews",
      content:
        "Other customers often mention if items run large, small, or true to size in their reviews.",
    },
  ];

  const getCurrentSizeData = () => {
    const categoryData =
      sizingData[selectedCategory as keyof typeof sizingData];
    if (!categoryData) return null;

    return categoryData[selectedGarment as keyof typeof categoryData] || null;
  };

  const currentSizeData = getCurrentSizeData();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="mb-4 font-bold text-4xl md:text-5xl">Size Guide</h1>
            <p className="opacity-90 text-lg">
              Find your perfect fit with our comprehensive sizing charts and
              measurement guide for all our products.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl">
        {/* Size Selection */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-bold text-3xl">Choose Your Category</h2>
            <p className="text-lg">
              Select the category and garment type for accurate sizing
            </p>
          </div>

          <div className="gap-6 grid md:grid-cols-2 mx-auto mb-8 max-w-2xl">
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Garment Type</label>
              <Select
                value={selectedGarment}
                onValueChange={setSelectedGarment}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {garmentTypes[
                    selectedCategory as keyof typeof garmentTypes
                  ]?.map((garment) => (
                    <SelectItem key={garment.value} value={garment.value}>
                      {garment.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Size Chart */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Size Chart -{" "}
                {
                  categories.find((c) => c.value === selectedCategory)?.label
                }{" "}
                {
                  garmentTypes[
                    selectedCategory as keyof typeof garmentTypes
                  ]?.find((g) => g.value === selectedGarment)?.label
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentSizeData ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        {currentSizeData.headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-3 font-semibold text-left"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentSizeData.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="hover:bg-muted/50 border-b"
                        >
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3">
                              {cellIndex === 0 ? (
                                <Badge variant="outline">{cell}</Badge>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="">
                    Size chart not available for this combination.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Measurement Tips */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-bold text-3xl">How to Measure</h2>
            <p className="text-lg">
              Follow these tips for the most accurate measurements
            </p>
          </div>
          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-4">
            {measurementTips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Badge className="flex justify-center items-center mx-auto mb-4 rounded-full w-10 h-10">
                    <div> {tip.icon}</div>
                  </Badge>
                  <h3 className="mb-3 font-semibold text-center">
                    {tip.title}
                  </h3>
                  <p className="text-center">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fit Tips */}
        <section className="mb-16">
          <div className="gap-8 grid lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-bold text-3xl">Perfect Fit Tips</h2>
              <div className="space-y-4">
                {fitTips.map((tip, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">{tip.title}</h3>
                      <p className="">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="mt-0.5 w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Need Help?</h4>
                  </div>
                  <p className="mb-4">
                    Still unsure about sizing? Our customer service team is here
                    to help!
                  </p>
                  <Button variant="modern" size="sm" className="w-full" asChild>
                    <Link href="/contact-us">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4>Exchange Policy</h4>
                  <p className="my-4">
                    Not happy with the fit? We offer free exchanges within 30
                    days of purchase for unworn items with tags attached.
                  </p>
                  <Button
                    variant="classic"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/returns-&-exchanges">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4>Size Converter</h4>
                  <p className="my-4">
                    Shopping from another country? Use our international size
                    converter to find your local size equivalent.
                  </p>
                  <Button variant="classic" size="sm" className="w-full">
                    Open Converter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-6 grid md:grid-cols-3">
                <div className="xl:w-1/2">
                  <h4 className="mb-3 font-semibold">Women's General Sizing</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>XS:</span>
                      <span>0-2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>S:</span>
                      <span>4-6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>M:</span>
                      <span>8-10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>L:</span>
                      <span>12-14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XL:</span>
                      <span>16-18</span>
                    </div>
                  </div>
                </div>
                <div className="xl:w-1/2">
                  <h4 className="mb-3 font-semibold">Men's General Sizing</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>XS:</span>
                      <span>34\" chest</span>
                    </div>
                    <div className="flex justify-between">
                      <span>S:</span>
                      <span>36\" chest</span>
                    </div>
                    <div className="flex justify-between">
                      <span>M:</span>
                      <span>38\" chest</span>
                    </div>
                    <div className="flex justify-between">
                      <span>L:</span>
                      <span>40\" chest</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XL:</span>
                      <span>42\" chest</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h4 className="mb-3 font-semibold">Measurement Tips</h4>
                  <ul className="space-y-1">
                    <li>Measure in your undergarments</li>
                    <li>Use a flexible measuring tape</li>
                    <li>Don't pull the tape too tight</li>
                    <li>Have someone help you measure</li>
                    <li>Check the fit guide for each item</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
