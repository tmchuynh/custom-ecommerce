"use client";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Privacy Policy
      </h1>

      <p className="text-xl text-center mb-12">
        Protecting your privacy is important to us. Please read this privacy
        policy carefully to understand how we collect, use, and protect your
        information.
      </p>

      <div className="space-y-10">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            At [Your Company Name], we value the privacy of our customers and
            are committed to safeguarding any personal information you provide
            to us. This privacy policy outlines how we collect, use, disclose,
            and protect your personal data when you use our services.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p className="text-lg mb-4">
            We collect various types of information to provide and improve our
            services. This includes both personal and non-personal information.
          </p>
          <h3 className="text-xl font-medium mb-2">Personal Information</h3>
          <p className="text-lg mb-4">
            When you make a purchase, create an account, or interact with our
            website, we may collect personal information, including but not
            limited to:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and shipping address</li>
            <li>Payment information (e.g., credit card details)</li>
            <li>Order history</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Non-Personal Information</h3>
          <p className="text-lg">
            We also collect non-personal information, such as:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Device information (e.g., mobile or desktop)</li>
            <li>
              Browsing behavior (e.g., pages visited, time spent on the site)
            </li>
          </ul>
        </section>

        {/* Information Usage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-lg">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>To process and fulfill your orders</li>
            <li>To improve our products and services</li>
            <li>To personalize your shopping experience</li>
            <li>
              To communicate with you about your orders or updates to our
              services
            </li>
            <li>
              To send promotional emails, newsletters, or offers (with your
              consent)
            </li>
            <li>To analyze usage patterns and enhance website performance</li>
            <li>
              To prevent fraudulent activities and protect our site from
              security threats
            </li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-lg">
            We do not sell, rent, or trade your personal information to third
            parties. However, we may share your data in the following
            circumstances:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Third-party service providers:</strong> We may share your
              information with trusted partners who perform services on our
              behalf (e.g., payment processing, shipping, marketing). These
              third parties are obligated to protect your information and use it
              only for the purpose of providing services to us.
            </li>
            <li>
              <strong>Legal requirements:</strong> We may disclose your
              information if required by law, such as in response to a subpoena,
              court order, or government request.
            </li>
            <li>
              <strong>Business transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be
              transferred to the acquiring party.
            </li>
          </ul>
        </section>

        {/* Data Protection */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How We Protect Your Information
          </h2>
          <p className="text-lg">
            We take the security of your personal information seriously. To
            protect your data, we employ the following security measures:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              Encryption of sensitive data (e.g., payment information) during
              transmission
            </li>
            <li>
              Use of secure servers and firewalls to protect against
              unauthorized access
            </li>
            <li>
              Regular monitoring for potential vulnerabilities or data breaches
            </li>
            <li>Limit access to personal data to authorized personnel only</li>
          </ul>
          <p className="text-lg">
            While we implement strong security practices, no method of
            transmission over the internet is 100% secure. We cannot guarantee
            the absolute security of your information.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-lg">
            Depending on your location and applicable laws, you may have the
            following rights with respect to your personal information:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Access:</strong> You have the right to request a copy of
              the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You have the right to request
              corrections to any inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You have the right to request the
              deletion of your personal information under certain circumstances.
            </li>
            <li>
              <strong>Opt-out of marketing:</strong> You can opt-out of
              receiving promotional emails or newsletters at any time by
              unsubscribing.
            </li>
            <li>
              <strong>Data portability:</strong> You may request that we
              transfer your personal data to another service provider.
            </li>
          </ul>
        </section>

        {/* Cookies Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies Policy</h2>
          <p className="text-lg mb-4">
            We use cookies to improve your browsing experience on our website.
            Cookies are small text files that are stored on your device and help
            us:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li>Remember your preferences and settings</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Personalize content and advertising</li>
          </ul>
          <p className="text-lg">
            You can choose to disable cookies in your browser settings, but
            doing so may affect your ability to use certain features on our
            website.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-lg">
            We reserve the right to update or modify this privacy policy at any
            time. When we make changes, we will update the "Last Updated" date
            at the top of this page. We encourage you to review this policy
            periodically to stay informed about how we are protecting your
            information.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions or concerns about this privacy policy or
            how we handle your personal information, please contact us at:
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

export default PrivacyPolicy;
