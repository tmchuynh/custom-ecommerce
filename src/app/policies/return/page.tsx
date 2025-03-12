"use client";

const ReturnPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Return Policy
      </h1>

      <p className="text-xl text-center mb-12">
        We want you to be completely satisfied with your purchase. If you're not
        happy with an item, please read through our return policy for full
        details on how to return or exchange it.
      </p>

      <div className="space-y-10">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            We understand that shopping online can sometimes lead to products
            not meeting your expectations. That's why we offer a comprehensive
            return policy to make sure you're completely satisfied with your
            purchase.
          </p>
        </section>

        {/* Return Timeframe */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Return Timeframe</h2>
          <p className="text-lg mb-4">
            All returns must be initiated within 30 days from the date of
            purchase. If 30 days have passed since your purchase, unfortunately,
            we cannot offer you a refund or exchange.
          </p>
          <p className="text-lg">
            In some cases, we may extend the return period, such as for seasonal
            sales, holidays, or special promotions. Please check the return
            instructions for specific timeframes related to your order.
          </p>
        </section>

        {/* Eligibility for Return */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Eligibility for Return
          </h2>
          <p className="text-lg mb-4">
            To be eligible for a return, the item must meet the following
            criteria:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              Items must be unused and in the same condition as when you
              received them.
            </li>
            <li>
              Items must be in their original packaging, including tags and
              labels attached.
            </li>
            <li>Items must not be damaged, worn, or altered in any way.</li>
            <li>
              For clothing and apparel, items should not have been washed or
              worn.
            </li>
            <li>
              For hygiene products (e.g., swimwear, undergarments), returns are
              only accepted if the item is unopened and in original condition.
            </li>
            <li>
              Sale or clearance items are non-refundable unless specified in the
              promotion or sale terms.
            </li>
          </ul>
        </section>

        {/* Non-Returnable Items */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
          <p className="text-lg mb-4">
            We are unable to accept returns for the following types of products:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>
              Items marked as "Final Sale" or "Non-returnable" on the product
              page
            </li>
            <li>Custom-made or personalized items</li>
            <li>Perishable goods (e.g., food items, flowers)</li>
          </ul>
        </section>

        {/* Return Process */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Return an Item</h2>
          <p className="text-lg mb-4">
            To initiate a return, follow these simple steps:
          </p>
          <ol className="list-decimal list-inside text-lg">
            <li>
              Log into your account on our website or use the return portal link
              provided in your order confirmation email.
            </li>
            <li>
              Select the items you wish to return and provide a reason for the
              return.
            </li>
            <li>
              Print the return shipping label provided (if applicable) and
              include the return form in your package.
            </li>
            <li>
              Ship the items back to us using the return label (if provided) or
              your preferred shipping method.
            </li>
            <li>
              Once we receive your return, we will process your refund or
              exchange within 5-7 business days.
            </li>
          </ol>
          <p className="text-lg">
            Please note that you are responsible for the shipping costs
            associated with returns unless the return is due to a mistake on our
            part (e.g., incorrect or defective item).
          </p>
        </section>

        {/* Refund and Exchange Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Refunds and Exchanges</h2>
          <p className="text-lg mb-4">
            Once your return is processed, we will notify you via email about
            your refund or exchange. You can expect:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Refunds:</strong> Refunds will be issued to the original
              payment method. Please allow 5-7 business days for the refund to
              appear on your account, depending on your payment provider.
            </li>
            <li>
              <strong>Exchanges:</strong> If you requested an exchange, we will
              ship the new item(s) to you once we receive the returned
              product(s). You will not be charged additional shipping fees for
              exchanges, except for any price differences.
            </li>
            <li>
              <strong>Store Credit:</strong> If you prefer store credit instead
              of a refund, you can opt for an e-gift card, which will be sent to
              your email after processing.
            </li>
          </ul>
        </section>

        {/* Return Shipping Costs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Return Shipping Costs</h2>
          <p className="text-lg mb-4">
            Unless the return is due to an error on our part (e.g., wrong item
            shipped or damaged goods), the return shipping cost is the
            responsibility of the customer. We recommend using a trackable
            shipping service for returns as we cannot guarantee receipt of your
            returned item.
          </p>
          <p className="text-lg">
            If the return is due to our error, we will cover the return shipping
            cost and provide a prepaid shipping label.
          </p>
        </section>

        {/* Damaged or Defective Items */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Damaged or Defective Items
          </h2>
          <p className="text-lg mb-4">
            If you receive a damaged or defective item, please contact us
            immediately at our customer service email, and we will arrange for a
            return or replacement at no additional cost to you.
          </p>
          <p className="text-lg">
            To help us process your claim faster, please include photos of the
            damaged item and the packaging.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions or concerns regarding our return policy,
            please don't hesitate to contact us:
          </p>
          <p className="text-lg mt-2">
            Email:{" "}
            <a href="mailto:support@yourcompany.com" className="text-blue-500">
              support@yourcompany.com
            </a>
          </p>
          <p className="text-lg mt-2">Phone: +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
