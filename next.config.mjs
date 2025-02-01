/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  modularizeImports: {
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "@react-icons/all-files/{{ matches.[1] }}/{{ member }}",
      skipDefaultConversion: true,
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BASE_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/exchangerates",
        destination: "/exchange-rates/usd-to-ghs",
        permanent: true,
      },
      {
        source: "/exchange-rates",
        destination: "/exchange-rates/usd-to-ghs",
        permanent: true,
      },
      {
        source: "/exchangerates/gbp",
        destination: "/exchange-rates/gbp-to-ghs",
        permanent: true,
      },
      {
        source: "/exchangerates/eur",
        destination: "/exchange-rates/eur-to-ghs",
        permanent: true,
      },
      {
        source: "/banks",
        destination: "/exchange-rates/usd-to-ghs/banks",
        permanent: true,
      },
      {
        source: "/banks/gbp",
        destination: "/exchange-rates/gbp-to-ghs/banks",
        permanent: true,
      },
      {
        source: "/banks/eur",
        destination: "/exchange-rates/eur-to-ghs/banks",
        permanent: true,
      },
      {
        source: "/forex-bureaus",
        destination: "/exchange-rates/usd-to-ghs/forex-bureaus",
        permanent: true,
      },
      {
        source: "/forex-bureaus/gbp",
        destination: "/exchange-rates/gbp-to-ghs/forex-bureaus",
        permanent: true,
      },
      {
        source: "/forex-bureaus/eur",
        destination: "/exchange-rates/eur-to-ghs/forex-bureaus",
        permanent: true,
      },
      {
        source: "/online-payments",
        destination: "/exchange-rates/usd-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/exchange-rates/usd-to-ghs/online-payments",
        destination: "/exchange-rates/usd-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/online-payments/gbp",
        destination: "/exchange-rates/gbp-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/exchange-rates/gbp-to-ghs/online-payments",
        destination: "/exchange-rates/gbp-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/online-payments/eur",
        destination: "/exchange-rates/eur-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/exchange-rates/eur-to-ghs/online-payments",
        destination: "/exchange-rates/eur-to-ghs/card-payments",
        permanent: true,
      },
      {
        source: "/remittance",
        destination: "/exchange-rates/usd-to-ghs/money-transfer",
        permanent: true,
      },
      {
        source: "/remittance/gbp",
        destination: "/exchange-rates/gbp-to-ghs/money-transfer",
        permanent: true,
      },
      {
        source: "/remittance/eur",
        destination: "/exchange-rates/eur-to-ghs/money-transfer",
        permanent: true,
      },
      {
        source: "/fintech",
        destination: "/exchange-rates/usd-to-ghs/fintech",
        permanent: true,
      },
      {
        source: "/fintech/gbp",
        destination: "/exchange-rates/gbp-to-ghs/fintech",
        permanent: true,
      },
      {
        source: "/fintech/eur",
        destination: "/exchange-rates/eur-to-ghs/fintech",
        permanent: true,
      },
      {
        source: "/crypto",
        destination: "/exchange-rates-usd-to-ghs/crypto",
        permanent: true,
      },
      {
        source: "/fuelprices",
        destination: "/fuel-prices",
        permanent: true,
      },
      {
        source: "/fuel-prices",
        destination: "/fuel-prices/gh",
        permanent: true,
      },
      {
        source: "/jp",
        destination: "/company/jp",
        permanent: true,
      },
      {
        source: "/staroil",
        destination: "/company/staroil",
        permanent: true,
      },
      {
        source: "/allied",
        destination: "/company/allied",
        permanent: true,
      },
      {
        source: "/puma",
        destination: "/company/puma",
        permanent: true,
      },
      {
        source: "/shell",
        destination: "/company/shell",
        permanent: true,
      },
      {
        source: "/lemfi",
        destination: "/company/lemfi",
        permanent: true,
      },
      {
        source: "/afriex",
        destination: "/company/afriex",
        permanent: true,
      },
      {
        source: "/oa-pay",
        destination: "/company/oa-pay",
        permanent: true,
      },
      {
        source: "/totalenergies",
        destination: "/company/totalenergies",
        permanent: true,
      },
      {
        source: "/goil",
        destination: "/company/goil",
        permanent: true,
      },
      {
        source: "/bloom-petroleum",
        destination: "/company/bloom-petroleum",
        permanent: true,
      },
      {
        source: "/petrosol",
        destination: "/company/petrosol",
        permanent: true,
      },
      {
        source: "/unicorn-petroleum",
        destination: "/company/unicorn-petroleum",
        permanent: true,
      },
      {
        source: "/viggo-energy",
        destination: "/company/viggo-energy",
        permanent: true,
      },
      {
        source: "/so-energy",
        destination: "/company/so-energy",
        permanent: true,
      },
      {
        source: "/zen",
        destination: "/company/zen",
        permanent: true,
      },
      {
        source: "/benab",
        destination: "/company/benab",
        permanent: true,
      },
      {
        source: "/ibm-petroleum",
        destination: "/company/ibm-petroleum",
        permanent: true,
      },
      {
        source: "/ecobank",
        destination: "/company/ecobank",
        permanent: true,
      },
      {
        source: "/bank-of-ghana",
        destination: "/company/bank-of-ghana",
        permanent: true,
      },
      {
        source: "/gcb-bank",
        destination: "/company/gcb-bank",
        permanent: true,
      },
      {
        source: "/stanbic-bank",
        destination: "/company/stanbic-bank",
        permanent: true,
      },
      {
        source: "/absa-bank",
        destination: "/company/absa-bank",
        permanent: true,
      },
      {
        source: "/fidelity-bank",
        destination: "/company/fidelity-bank",
        permanent: true,
      },
      {
        source: "/standard-chartered",
        destination: "/company/standard-chartered",
        permanent: true,
      },
      {
        source: "/zenith-bank",
        destination: "/company/zenith-bank",
        permanent: true,
      },
      {
        source: "/calbank",
        destination: "/company/calbank",
        permanent: true,
      },
      {
        source: "/access-bank",
        destination: "/company/access-bank",
        permanent: true,
      },
      {
        source: "/visa",
        destination: "/company/visa",
        permanent: true,
      },
      {
        source: "/binance-p2p",
        destination: "/company/binance-p2p",
        permanent: true,
      },
      {
        source: "/cbg-bank",
        destination: "/company/cbg-bank",
        permanent: true,
      },
      {
        source: "/uba",
        destination: "/company/uba",
        permanent: true,
      },
      {
        source: "/gtbank",
        destination: "/company/gtbank",
        permanent: true,
      },
      {
        source: "/worldremit",
        destination: "/company/worldremit",
        permanent: true,
      },
      {
        source: "/remitly",
        destination: "/company/remitly",
        permanent: true,
      },
      {
        source: "/wise",
        destination: "/company/wise",
        permanent: true,
      },
      {
        source: "/taptap-send",
        destination: "/company/taptap-send",
        permanent: true,
      },
      {
        source: "/sendwave",
        destination: "/company/sendwave",
        permanent: true,
      },
      {
        source: "/western-union",
        destination: "/company/western-union",
        permanent: true,
      },
      {
        source: "/revolut",
        destination: "/company/revolut",
        permanent: true,
      },
      {
        source: "/unitylink",
        destination: "/company/unitylink",
        permanent: true,
      },
      {
        source: "/mastercard",
        destination: "/company/mastercard",
        permanent: true,
      },
      {
        source: "/aboki",
        destination: "/company/aboki",
        permanent: true,
      },
      {
        source: "/kucoin-p2p",
        destination: "/company/kucoin-p2p",
        permanent: true,
      },
      {
        source: "/wewire",
        destination: "/company/wewire",
        permanent: true,
      },
    ];
  },
  images: {
    // domains: ['www.myjoyonline.com', 'www.adomonline.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "cediratesstorage.blob.core.windows.net",
        port: "",
        pathname: "/cedirates/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dxhasif6m/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.cointelegraph.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cointelegraph.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.magazine.cointelegraph.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.wired.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dessy-ocean.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thebrif.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mining.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "buildingbytes.africa",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.businessday.ng",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ghheadlines.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "ghheadlines.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
