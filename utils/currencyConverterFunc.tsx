import axios from "axios";
import { CompanyRate, CompleteRateType, currencyRatesType } from "./types";

const currencies: {
  shortName: string;
  fullName: string;
  plural: string;
  sign: string;
  emoji: string;
  slug: string;
}[] = [
  {
    shortName: "ghs",
    fullName: "Ghanaian Cedi",
    plural: "Ghanaian Cedis",
    sign: "₵",
    emoji: "🇬🇭",
    slug: "cedi",
  },
  {
    shortName: "usd",
    fullName: "US Dollar",
    plural: "US Dollars",
    sign: "$",
    emoji: "🇺🇸",
    slug: "dollar",
  },
  {
    shortName: "gbp",
    fullName: "British Pound",
    plural: "British Pounds",
    sign: "£",
    emoji: "🇬🇧",
    slug: "pound",
  },
  {
    shortName: "eur",
    fullName: "Euro",
    plural: "Euros",
    sign: "€",
    emoji: "🇪🇺",
    slug: "euro",
  },
];

const addCommasToNumber = (amount: any) => {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// function getBuyingAndSellingRate(currency: any, ERD: any) {
//   const exchangeRateData = ERD.data;
//   return new Promise((resolve, reject) => {
//     if (exchangeRateData) {
//       const average = `average${
//         currency?.charAt(0).toUpperCase() + currency?.slice(1)
//       }`;
//       if (exchangeRateData[average]) {
//         const buyingRate = exchangeRateData[average]["buyingRate"];
//         const sellingRate = exchangeRateData[average]["sellingRate"];
//         resolve([buyingRate, sellingRate]);
//       }
//     } else {
//       reject("Exchange Rates unavailable");
//     }
//   });
// }

const getValidCurrencyPairs = (companyData: CompanyRate) => {
  const rates = companyData.data;
  const validPairs = new Set<string>();

  // Check dollar rates
  if (rates.dollarRates?.buyingRate) validPairs.add("USD/GHS");
  if (rates.dollarRates?.sellingRate) validPairs.add("GHS/USD");

  // Check euro rates
  if (rates.euroRates?.buyingRate) validPairs.add("EUR/GHS");
  if (rates.euroRates?.sellingRate) validPairs.add("GHS/EUR");

  // Check pound rates
  if (rates.poundRates?.buyingRate) validPairs.add("GBP/GHS");
  if (rates.poundRates?.sellingRate) validPairs.add("GHS/GBP");

  return validPairs;
};

const isConversionSupported = (fromCurrency: any, toCurrency: any) => {
  const supportedConversions = [
    "GHS/USD",
    "GHS/GBP",
    "GHS/EUR",
    "USD/GHS",
    "GBP/GHS",
    "EUR/GHS",
  ];
  const exchangeRateKey = `${fromCurrency.shortName.toUpperCase()}/${toCurrency.shortName.toUpperCase()}`;
  return supportedConversions.includes(exchangeRateKey);
};

function convertCurrency(
  amount: any,
  toCurrency: any,
  fromCurrency: any,
  ERD: any
) {
  const exchangeRateData = ERD;

  if (!isConversionSupported(fromCurrency, toCurrency)) {
    return "-";
  }

  if (exchangeRateData) {
    const fromSlug = fromCurrency.slug;
    const toSlug = toCurrency.slug;

    // console.log(fromCurrency)
    // console.log(toCurrency)

    const toAverage = `average${
      toSlug?.charAt(0)?.toUpperCase() + toSlug?.slice(1)
    }`;
    const fromAverage = `average${
      fromSlug?.charAt(0)?.toUpperCase() + fromSlug?.slice(1)
    }`;

    if (toCurrency.shortName === "ghs") {
      const rateData = exchangeRateData[fromAverage];
      if (rateData && rateData.sellingRate !== undefined) {
        const rate = rateData.sellingRate;
        const convertedAmount = amount / rate;
        return convertedAmount.toFixed(2);
      } else {
        return "Exchange rate data not available for the selected currency pair";
      }
    } else if (fromCurrency.shortName === "ghs") {
      const rateData = exchangeRateData[toAverage];
      if (rateData && rateData.buyingRate !== undefined) {
        const rate = rateData.buyingRate;
        const convertedAmount = amount * rate;
        return convertedAmount.toFixed(2);
      } else {
        return "Exchange rate data not available for the selected currency pair";
      }
    }
  } else {
    return "-";
  }
}

let todayAverage: any;

const getAverageForToday = async (date: any) => {
  try {
    const data = await axios.get(`${process.env.BASE_URL}/average/${date}`, {
      headers: { "custom-origin": "cedirates-dev" },
    });
    todayAverage = data;
    return true;
  } catch (error) {
    console.log(error);
  }
};

interface Currency {
  shortName: string;
  slug: string;
}

interface ExchangeRateData {
  averageDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averagePound: {
    buyingRate: number;
    sellingRate: number;
  };
  date: string;
}

interface ExchangeRates {
  dollarBuying: string[];
  dollarSelling: string[];
  euroBuying: string[];
  euroSelling: string[];
  poundBuying: string[];
  poundSelling: string[];
  date: string[];
  [key: string]: string[];
}

interface Range {
  from: Date;
  to: Date;
}

function calculateDaysBetween(dates: Range) {
  if (!dates) return;
  const { from, to } = dates;
  // Ensure both are valid Date objects
  if (!(from instanceof Date) || !(to instanceof Date)) {
    throw new Error("Both 'from' and 'to' should be valid Date objects.");
  }

  // Calculate the difference in milliseconds
  const diffInMs = to.getTime() - from.getTime();

  // Convert milliseconds to days
  return diffInMs / (1000 * 60 * 60 * 24);
}

const getChartData = async (
  from: Currency,
  to: Currency,
  ERD: boolean,
  dateRange: Range
): Promise<any> => {
  const days = calculateDaysBetween(dateRange);
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/average/?page=1&limit=${days}`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    const data: ExchangeRateData[] = response.data.data;

    const arrays: ExchangeRates = {
      dollarBuying: [],
      dollarSelling: [],
      euroBuying: [],
      euroSelling: [],
      poundBuying: [],
      poundSelling: [],
      date: [],
    };

    const temp = Array.isArray(data)
      ? data.filter(
          (item: any) =>
            item.averageDollar && item.averageEuro && item.averagePound
        )
      : [];

    temp.forEach((item: ExchangeRateData) => {
      arrays["dollarBuying"].push(
        Number(item.averageDollar?.buyingRate)?.toFixed(2) ?? ""
      );
      arrays["dollarSelling"].push(
        Number(item.averageDollar?.sellingRate)?.toFixed(2) ?? ""
      );

      arrays["euroBuying"].push(
        Number(item.averageEuro?.buyingRate)?.toFixed(2) ?? ""
      );
      arrays["euroSelling"].push(
        Number(item.averageEuro?.sellingRate)?.toFixed(2) ?? ""
      );

      arrays["poundBuying"].push(
        Number(item.averagePound?.buyingRate)?.toFixed(2) ?? ""
      );
      arrays["poundSelling"].push(
        Number(item.averagePound?.sellingRate)?.toFixed(2) ?? ""
      );

      arrays["date"].push(item.date);
    });

    if (ERD) {
      const seriesData =
        to.shortName === "ghs"
          ? {
              buying: arrays[from.slug + "Buying"],
              selling: arrays[from.slug + "Selling"],
            }
          : {
              buying: arrays[to.slug + "Buying"],
              selling: arrays[to.slug + "Selling"],
            };

      const chartData = {
        labels: arrays["date"],
        datasets: [
          {
            label: "Buying",
            data: seriesData.buying,
          },
          {
            label: "Selling",
            data: seriesData.selling,
          },
        ],
      };

      return chartData;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getChartData;

// Brands page converter
const getAvailableCurrencies = (companyData: CompanyRate) => {
  const availableCurrencies = ["GHS"]; // GHS is always available

  const currencyMappings: Record<string, keyof CompleteRateType> = {
    USD: "dollarRates",
    GBP: "poundRates",
    EUR: "euroRates",
  };

  Object.entries(currencyMappings).forEach(([currency, key]) => {
    const rates = companyData.data[key] as currencyRatesType;

    if (rates?.buyingRate || rates?.sellingRate) {
      availableCurrencies.push(currency);
    }
  });

  return availableCurrencies;
};

export {
  currencies,
  getAverageForToday,
  addCommasToNumber,
  isConversionSupported,
  convertCurrency,
  getValidCurrencyPairs,
  todayAverage,
  getAvailableCurrencies,
};
