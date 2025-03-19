"use client";

import { Button } from "@/components/ui/button";

const TermsAndConditions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Terms and Conditions
      </h1>

      <p className="text-xl text-center mb-12">
        Please read these Terms and Conditions carefully before using our
        website or making a purchase.
      </p>

      <div className="space-y-10">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            These Terms and Conditions ("Terms", "Terms and Conditions") govern
            your use of our website ("Site"), the services we provide, and any
            purchases you make through the website. By using our Site and
            services, you agree to comply with these Terms. If you do not agree
            with any part of these Terms, you should not use our Site or
            services.
          </p>
        </section>

        {/* Use of the Site */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of the Site</h2>
          <p className="text-lg mb-4">
            You may use our Site for lawful purposes only. By using our Site,
            you agree:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              Not to engage in any fraudulent, unlawful, or harmful activities.
            </li>
            <li>Not to violate any applicable laws or regulations.</li>
            <li>
              Not to interfere with the proper functioning of the Site or its
              security features.
            </li>
            <li>
              Not to upload, post, or transmit any content that is offensive,
              harmful, or infringes upon the rights of others.
            </li>
          </ul>
        </section>

        {/* Account Registration */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Account Registration</h2>
          <p className="text-lg mb-4">
            To make a purchase on our Site, you may need to create an account.
            When registering, you agree to provide accurate and up-to-date
            information, and you are responsible for maintaining the
            confidentiality of your login credentials.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              You must notify us immediately if you believe your account has
              been compromised.
            </li>
            <li>
              We may suspend or terminate your account if we suspect any
              unauthorized activity or violation of these Terms.
            </li>
          </ul>
        </section>

        {/* Product Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
          <p className="text-lg mb-4">
            We make every effort to ensure that product information, including
            descriptions, prices, and images, are accurate. However, we cannot
            guarantee the accuracy, completeness, or reliability of such
            information. All prices are subject to change without notice.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              We reserve the right to modify or discontinue any product without
              prior notice.
            </li>
            <li>
              If a product is incorrectly priced, we will notify you and provide
              the option to cancel or proceed with the corrected price.
            </li>
          </ul>
        </section>

        {/* Order Process */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Order Process</h2>
          <p className="text-lg mb-4">
            Once you place an order on our Site, you will receive an order
            confirmation email. Please review the order details to ensure
            accuracy. A contract between you and us will only be formed when the
            order is dispatched for shipping.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              We reserve the right to reject or cancel any order for reasons
              such as product availability or pricing errors.
            </li>
            <li>
              We may ask you for additional information to process your order,
              such as proof of identity or address.
            </li>
            <li>
              If we cancel your order, you will receive a full refund to your
              original payment method.
            </li>
          </ul>
        </section>

        {/* Payments */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Payments</h2>
          <p className="text-lg mb-4">
            We accept various forms of payment, including credit/debit cards,
            PayPal, and other payment providers. Payments will be processed
            securely, and we do not store your sensitive payment information.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              By providing your payment information, you authorize us to charge
              the full amount of your order, including taxes and shipping fees.
            </li>
            <li>
              We may verify your payment details before processing your order.
            </li>
            <li>
              If a payment is declined, we will notify you, and your order will
              not be processed until a valid payment method is provided.
            </li>
          </ul>
        </section>

        {/* Shipping and Delivery */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
          <p className="text-lg mb-4">
            We offer shipping within [Country/Region] and internationally.
            Shipping costs and delivery times vary depending on your location,
            the items purchased, and the shipping method chosen.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              We are not responsible for delays caused by third-party carriers
              or customs processing.
            </li>
            <li>
              Shipping charges will be added to your order during the checkout
              process.
            </li>
            <li>
              If your order is lost or damaged during shipment, please contact
              us within 7 days of receiving your tracking information for
              assistance.
            </li>
          </ul>
        </section>

        {/* Returns and Exchanges */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Returns and Exchanges</h2>
          <p className="text-lg mb-4">
            If you're not completely satisfied with your purchase, we accept
            returns and exchanges under specific conditions. Please refer to our{" "}
            <a href="/return-policy" className="text-blue-500">
              Return Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        {/* Liability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h2>
          <p className="text-lg mb-4">
            We are not liable for any indirect, incidental, or consequential
            damages resulting from the use of our Site or products. In no event
            will our liability exceed the amount paid by you for the product in
            question.
          </p>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-lg mb-4">
            All content on our website, including images, graphics, text, logos,
            and trademarks, are the property of [Your Company Name] or our
            licensors. You may not use, reproduce, or distribute our content
            without our express written permission.
          </p>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-lg mb-4">
            Your use of our Site is also governed by our{" "}
            <a href="/privacy-policy" className="text-blue-500">
              Privacy Policy
            </a>
            , which explains how we collect, use, and protect your personal
            information.
          </p>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-lg">
            We reserve the right to update or change these Terms and Conditions
            at any time. When changes are made, the updated version will be
            posted on this page with a new "Last Updated" date. Your continued
            use of the Site after changes are posted constitutes acceptance of
            those changes.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at:
          </p>
          <p className="text-lg mt-2">
            Email:{" "}
            <Button variant={"link"} href="mailto:support@yourcompany.com">
              support@yourcompany.com
            </Button>
          </p>
          <p className="text-lg mt-2">Phone: +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
