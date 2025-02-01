import { seoData } from "../data";
import { exchangeRatesType, fuelRatesType, UserDetailsType } from "../types";

export const getRandomFuelStations = (data: fuelRatesType[]) => {
  const shuffledData = data
    ?.filter(
      (company) =>
        company.petrol &&
        company.petrol > 0 &&
        company.diesel &&
        company.diesel > 0
    )
    ?.sort(() => Math.random() - 0.5);

  const selectedStations = shuffledData?.slice(
    0,
    Math.min(3, shuffledData?.length)
  );
  return selectedStations;
};

export const getRandomRatesCompanies = (data: exchangeRatesType[]) => {
  const shuffledData = data
    ?.filter(
      (company) =>
        company.dollarRates?.buyingRate &&
        company.dollarRates?.buyingRate > 0 &&
        company.dollarRates?.sellingRate &&
        company.dollarRates?.sellingRate > 0 &&
        company.dollarRates?.midRate &&
        company.dollarRates?.midRate > 0
    )
    ?.sort(() => Math.random() - 0.5);

  const selectedStations = shuffledData?.slice(
    0,
    Math.min(3, shuffledData?.length)
  );
  // func(selectedStations);
  return selectedStations;
};

export const getInitials = (user: UserDetailsType) => {
  if (!user.firstName && !user.lastName) {
    return "";
  }
  if (!user.lastName) {
    return `${user.firstName?.charAt(0)?.toUpperCase()}${user.firstName
      ?.charAt(1)
      ?.toUpperCase()}`;
  }
  if (user.firstName && user.lastName) {
    return `${user.firstName?.charAt(0)?.toUpperCase()}${user.lastName
      ?.charAt(0)
      ?.toUpperCase()}`;
  }
};

export const getBase64ImageFromUrl = async (
  imageUrl: string
): Promise<string> => {
  const response = await fetch(
    `/api/fetch-image?imageUrl=${encodeURIComponent(imageUrl)}`,
    {
      method: "GET"
    }
  );
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const replacePlaceholders = (
  text: string,
  replacements: Record<string, string | number>
): string => {
  return text.replace(/\[([^\]]+)\]/g, (_, key) =>
    replacements[key] !== undefined ? replacements[key].toString() : `[${key}]`
  );
};

const getCurrencyName = (currency: string | undefined): string => {
  const currencyMapping: { [key: string]: string } = {
    usd: "Dollar",
    eur: "Euro",
    gbp: "Pound",
  };

  return currency ? currencyMapping[currency.toLowerCase()] || currency : "Dollar";
};

export const generateSeoContent = (
  subcategoryName: string | undefined,
  currency: string | undefined
): { title: string; description: string } => {
  const currencyText = getCurrencyName(currency)

  // Map subcategory name to SEO key
  const seoKey = {
    Banks: "bank",
    "Forex Bureaus": "forex",
    "Card Payments": "cardPayment",
    "Money Transfer": "moneyTransfer",
    Crypto: "crypto",
    Fintechs: "fintech",
  }[subcategoryName || ""] as keyof typeof seoData;

  // Use specific subcategory SEO if available, otherwise fallback to default
  const seoConfig = seoData[seoKey] || seoData.default;

  const title = seoConfig.title.replace("{currency}", currencyText);
  const description = seoConfig.description.replace("{currency}", currencyText).replace("{currency}s", `${currencyText}s`);

  return { title, description };
};

export const updateMetadata = (
  title: string,
  description: string,
  url: string
) => {
  const metaTitle = document.querySelector("title");
  const metaDescription = document.querySelector('meta[name="description"]');
  const canonicalLink = document.querySelector('link[rel="canonical"]');

  if (metaTitle) metaTitle.textContent = title;
  if (metaDescription) metaDescription.setAttribute("content", description);
  if (canonicalLink) canonicalLink.setAttribute("href", url);
};

