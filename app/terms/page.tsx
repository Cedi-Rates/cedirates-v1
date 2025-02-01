import React from "react";
import style from "../../assets/styles/terms-policies.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service',
  openGraph: {
    title: 'Foreign Exchange Rates in Ghana Today',
    description: 'Terms of Service',
    url: 'https://cedirates.com/terms/',
    images: ''
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    description: 'Terms of Service',
    site: '@CediRates',
    images: ['']
  },
  alternates: {
    canonical: 'https://cedirates.com/terms/'
  }
}

const Terms = () => {
  return (
    <div className={style["terms-policies"]}>
      <Link href="/" id={style.return}>
        Return to Home
      </Link>
      <h1 className="font-bold text-4xl" id={style.use}>
        Terms of Service
      </h1>
      <p>
        Welcome to CediRates. This website is owned and operated by CediRates, a
        business registered in Accra, Ghana. These terms and conditions
        (&quot;Terms&quot;) apply to your use of the website located at
        https://cedirates.com/ (the &quot;Site&quot;). By using the Site, you
        agree to be bound by these Terms. If you do not agree to these Terms, do
        not use the Site. <br />
        <br />
        Accounts and Content <br /> a. Account Creation: To use certain features
        of the Site, you may be required to create an account. You agree to
        provide accurate, current, and complete information during the
        registration process and to update such information as necessary to keep
        it accurate, current, and complete. <br />
        <br />
        b. User Content: The Site allows you to upload or otherwise submit
        content, including but not limited to text, photos, videos, and other
        materials (collectively, &quot;User Content&quot;). You represent and
        warrant that you own or have the necessary licences, rights, consents,
        and permissions to use and authorise us to use all patent, trademark,
        trade secret, copyright, or other proprietary rights in and to any and
        all User Content to enable inclusion and use of the User Content in the
        manner contemplated by the Site and these Terms. <br />
        <br />
        c. Ownership of Content: All materials on the Site, including but not
        limited to the logo, visual design, trademarks, and other content
        (collectively, the &quot;CediRates Materials&quot;), are our exclusive
        property. You may not use any CediRates Materials without our prior
        written consent. <br />
        <br />
        d. Feedback and Suggestions: We welcome your feedback and suggestions.
        By providing us with any feedback or suggestions, you grant us a
        non-exclusive, perpetual, irrevocable, royalty-free, fully-paid,
        sublicensable, and transferable licence to use, modify, display,
        distribute, and create derivative works of such feedback or suggestions
        for any purpose and without any compensation or credit to you. <br />
        <br />
        Promotions and Subscriptions <br />
        <br /> a. Promotions: We may offer promotions, contests, sweepstakes, or
        other similar programs (&quot;Promotions&quot;). The terms and
        conditions of each Promotion will be governed by separate rules or terms
        and conditions that will be communicated to you at the time of the
        Promotion. By participating in any Promotion, you agree to be bound by
        the rules or terms and conditions applicable to that Promotion. <br />
        <br />
        b. Subscriptions: We may offer subscription plans that provide access to
        additional features or content on the Site. The terms and conditions of
        each subscription plan will be governed by separate rules or terms and
        conditions that will be communicated to you at the time of subscription.
        By subscribing to any plan, you agree to be bound by the rules or terms
        and conditions applicable to that plan. <br />
        <br />
        Contact <br /> You can contact us at any time with questions or concerns
        regarding these Terms by emailing us at hello@cedirates.com. <br />
        <br />
        Changes to Terms <br />
        <br /> We reserve the right to change these Terms at any time. Any
        changes to the Terms will be effective immediately upon posting on the
        Site. Your continued use of the Site after any changes to the Terms will
        constitute your acceptance of such changes. <br />
        <br />
        Miscellaneous <br /> a. Entire Agreement: These Terms, together with any
        rules or terms and conditions applicable to Promotions or subscription
        plans, constitute the entire agreement between you and CediRates
        regarding the use of the Site. <br />
        <br />
        b. Severability: If any provision of these Terms is found to be invalid
        or unenforceable, the remaining provisions shall remain in full force
        and effect. <br />
        <br />
        c. Governing Law: These Terms shall be governed by and construed in
        accordance with the laws of Ghana, without giving effect to any
        principles of conflicts of law. <br />
        <br />
        d. Jurisdiction: Any legal action or proceeding arising out of or
        related to these Terms or the use of the Site shall be brought
        exclusively in the courts of Ghana. <br />
        <br />
        e. Waiver: Our failure to exercise or enforce any right or provision of
        these Terms shall not constitute a waiver of such right or provision.{" "}
        <br />
        <br />
        f. Assignment: You may not assign these Terms or any of your rights or
        obligations hereunder, whether by operation of law or otherwise, without
        our prior written consent. <br />
        <br />
        g. Headings: The section headings in these Terms are for convenience
        only and have no legal or contractual effect. <br />
        <br />
        Thank you for using CediRates. We hope you enjoy your experience on our
        website.
      </p>{" "}
    </div>
  );
};

export default Terms;
