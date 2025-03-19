"use client";

import { Button } from "@/components/ui/button";

const CustomerService = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Customer Service
      </h1>

      <p className="text-xl text-center mb-12">
        We're here to help! Our customer service team is available to assist you
        with any questions or concerns.
      </p>

      <div className="space-y-10">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Can We Help You?</h2>
          <p className="text-lg">
            Whether you have a question about your order, need help with
            returns, or just want to learn more about our products, we are here
            to provide the support you need. Below, you'll find our contact
            information, hours of operation, and a helpful FAQ section.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4 text-lg">
            <p>
              <strong>Email Support:</strong> For general inquiries, product
              questions, or issues with your order, please contact us at{" "}
              <Button variant={"link"} href="mailto:support@yourcompany.com">
                support@yourcompany.com
              </Button>
            </p>
            <p>
              <strong>Phone Support:</strong> Our customer service team is
              available to take your call at{" "}
              <a href="tel:+15551234567" className="text-blue-500">
                +1 (555) 123-4567
              </a>
            </p>
            <p>
              <strong>Live Chat:</strong> If you'd prefer to chat with a
              representative in real-time, you can reach us using the live chat
              feature on our website. Our team is available to assist you during
              business hours.
            </p>
          </div>
        </section>

        {/* Hours of Operation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
          <p className="text-lg mb-4">
            Our customer service team is available during the following hours.
            We strive to respond to all inquiries as quickly as possible, but
            please allow up to 48 hours for email responses.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (EST)
            </li>
            <li>
              <strong>Saturday:</strong> 10:00 AM - 4:00 PM (EST)
            </li>
            <li>
              <strong>Sunday:</strong> Closed
            </li>
          </ul>
        </section>

        {/* Frequently Asked Questions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg mb-4">
            Below are some of the most common questions we receive from
            customers. If your question is not answered here, please don't
            hesitate to reach out to us directly.
          </p>

          <div className="space-y-6">
            <div className="text-lg">
              <strong>1. How do I track my order?</strong>
              <p>
                Once your order has shipped, you'll receive a tracking number
                via email. You can use this tracking number on the carrier’s
                website to check the status of your shipment.
              </p>
            </div>

            <div className="text-lg">
              <strong>2. What is your return policy?</strong>
              <p>
                We offer a 30-day return policy for most items. To learn more,
                visit our{" "}
                <a href="/return-policy" className="text-blue-500">
                  Return Policy page
                </a>
                .
              </p>
            </div>

            <div className="text-lg">
              <strong>3. How can I change or cancel my order?</strong>
              <p>
                If you need to change or cancel your order, please contact us as
                soon as possible. Once your order has been shipped, we may not
                be able to make changes.
              </p>
            </div>

            <div className="text-lg">
              <strong>4. How do I apply a discount code?</strong>
              <p>
                During checkout, there will be an option to enter a promo code.
                Simply enter the code, and the discount will be applied to your
                order total.
              </p>
            </div>

            <div className="text-lg">
              <strong>5. Do you offer international shipping?</strong>
              <p>
                Yes, we offer international shipping to select countries.
                Shipping fees and delivery times may vary depending on your
                location.
              </p>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Other Services</h2>
          <p className="text-lg">
            In addition to our customer support services, we also offer several
            other services to enhance your shopping experience:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Gift Cards:</strong> Purchase a gift card for friends or
              family, and let them shop for their favorite products on our site.
            </li>
            <li>
              <strong>Order Customization:</strong> Many of our products are
              customizable. Please contact our support team to learn more about
              personalization options.
            </li>
            <li>
              <strong>Product Recommendations:</strong> Our team is happy to
              assist you in finding the perfect product for your needs.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CustomerService;
