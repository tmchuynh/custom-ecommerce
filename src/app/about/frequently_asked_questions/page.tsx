"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Adjust the path as needed

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our products, select the item you'd like to purchase, and add it to your cart. Once you're ready, go to your cart and follow the checkout process.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for secure payments.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order by entering your tracking number on our 'Track Order' page. You will receive an email with your tracking details once your order ships.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! We offer international shipping to most countries. Shipping costs and delivery times will vary depending on your location.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes, we offer a 30-day return policy. You can return items that are in original condition and packaging for a full refund or exchange.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "If you need assistance, please visit our 'Customer Service' page for contact details, including email and phone support.",
  },
];

const FAQPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="w-full p-4 text-xl font-semibold text-gray-900 bg-gray-100 rounded-t-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-600">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
