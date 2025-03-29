import { Article } from "./types";

interface ProductData {
  title: string;
  description: string;
  image: string;
  url: string;
  ratingValue: number;
  reviewCount: number;
}

type SchemaType = "product" | "article" | "home" | "currencyConverter" | null;
type SchemaData = ProductData | Article;

export const generateSchema = (type: SchemaType, data?: SchemaData) => {
  switch (type) {
    case "home":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: "https://www.cedirates.com",
        logo: "https://i.ibb.co/17kpK6P/E7-B6-C8-A3-CE77-4-DF1-9-B43-66316-C319396.png",
        name: "CediRates",
        description:
          "Check the latest news, exchange rates and fuel prices in Ghana today on CediRates. Find reliable updates provided with news for additional context.",
        email: "hello@cedirates.com",
        sameAs: [
          "https://t.me/cedirates",
          "https://facebook.com/cedirates",
          "https://x.com/CediRates",
          "https://www.instagram.com/cedirates/",
          "https://whatsapp.com/channel/0029Va85saH8fewp4bmpLH2q",
          "https://www.tiktok.com/@cedirates",
          "https://www.linkedin.com/company/cedirates",
        ],
        // contactPoint: {
        //   "@type": "ContactPoint",
        //   telephone: "",
        //   email: "hello@cedirates.com",
        // },
        // telephone: "+47-99-999-9999",
        // address: {
        //   "@type": "PostalAddress",
        //   streetAddress: "Rue Improbable 99",
        //   addressLocality: "Paris",
        //   addressCountry: "FR",
        //   addressRegion: "Ile-de-France",
        //   postalCode: "75001",
        // },
      };
    case "product":
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: (data as ProductData).title,
        description: (data as ProductData).description,
        image: (data as ProductData).image,
        aggregateRating: {
          "@type": "AggregateRating",
          url: (data as ProductData).url,
          ratingValue: (data as ProductData).ratingValue,
          reviewCount: (data as ProductData).reviewCount,
        },
      };
    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: (data as Article).title,
        description: (data as Article).summary,
        author: {
          "@type": "Person",
          name: (data as Article).publishedBy
            ? (data as Article).publishedBy.firstName +
              " " +
              (data as Article).publishedBy.lastName
            : (data as Article).origin,
        },
        publisher: {
          "@type": "Organization",
          name: (data as Article).origin,
        },
        datePublished: (data as Article).createdAt,
        dateModified: (data as Article).updatedAt,
        image: (data as Article).image,
      };
    case "currencyConverter":
      return {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        name: "Currency Converter - Real Exchange Rates in Ghana Today",
        description:
          "Free currency converter to check exchange rates in Ghana today. Get Euro, Pound and Dollar to Cedi conversions with the free CediRates calculator.",
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "Free",
        },
      };
    default:
      return null;
  }
};
