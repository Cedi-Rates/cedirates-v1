import React from "react";
import Link from "next/link";
import style from "../../assets/styles/terms-policies.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy',
  openGraph: {
    title: 'Foreign Exchange Rates in Ghana Today',
    description: 'Privacy Policy',
    url: 'https://cedirates.com/privacy/',
    images: '',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'Privacy Policy',
    site: '@CediRates',
    images: ['']
  },
  alternates: {
    canonical: 'https://cedirates.com/privacy/'
  }
}

const PrivacyPolicy = () => {
  return (
    <div className={style["terms-policies"]}>
      <Link href="/" id={style.return}>
        Return to Home
      </Link>
      <h1 className="font-bold text-4xl" id={style.privacypolicy}>
        Privacy Policy
      </h1>{" "}
      <br />
      <p>
        CediRates (&quot;we&quot; or &quot;us&quot;) is committed to protecting
        your privacy. This Privacy Policy explains how we collect, use, and
        disclose information about you when you use our website located at
        https://cedirates.com/ (the &quot;Site&quot;). By using the Site, you
        consent to our collection, use, and disclosure of information about you
        as described in this Privacy Policy. <br />
        <br />
        Information We Collect <br /> a. Information You Provide: We collect
        information that you provide to us, such as when you create an account,
        upload content, or contact us. The types of information we collect may
        include your name, email address, and other contact information. <br />
        <br />
        b. Automatic Information: We may automatically collect information about
        your use of the Site, such as your IP address, browser type, and
        operating system. <br />
        <br />
        Use of Information <br /> a. We may use the information we collect for
        various purposes, including to: <br />
        Provide and improve the Site Communicate with you Respond to your
        inquiries Enforce our Terms of Service and other agreements <br />
        <br />
        b. We may also use the information we collect for marketing purposes,
        such as to send you promotional emails or newsletters. You can opt-out
        of receiving marketing emails from us by following the instructions in
        each email. <br />
        <br />
        Disclosure of Information <br /> a. We may disclose information about
        you as follows: <br />
        To our service providers who perform services on our behalf To comply
        with applicable laws or regulations In response to a valid legal
        request, such as a subpoena or court order b. We may also disclose
        information about you if we believe that disclosure is necessary or
        appropriate to prevent harm or loss, or in connection with an
        investigation of suspected or actual illegal activity. <br />
        <br />
        Data Retention <br /> We will retain your information for as long as
        necessary to fulfil the purposes for which it was collected or as
        required by applicable laws or regulations. <br />
        <br />
        Security <br /> We take reasonable measures to protect your information
        from loss, theft, misuse, and unauthorised access, disclosure,
        alteration, and destruction. <br />
        <br />
        Children&apos;s Privacy <br /> The Site is not directed to children
        under the age of 13. We do not knowingly collect personal information
        from children under the age of 13. <br />
        <br />
        Changes to Privacy <br /> Policy We may update this Privacy Policy from
        time to time. If we make material changes to the Privacy Policy, we will
        notify you by email or by posting a notice on the Site. Your continued
        use of the Site after any changes to the Privacy Policy will constitute
        your acceptance of such changes. <br />
        <br />
        Contact <br /> If you have any questions or concerns regarding this
        Privacy Policy, please contact us at hello@cedirates.com. <br />
        <br />
        Thank you for using CediRates. We value your privacy and appreciate your
        trust in us.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
