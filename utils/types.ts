export interface companyType {
  _id: string;
  companyName: string;
  image: string;
  uniqueNumber: number;
  url: string;
  verified: boolean;
  subCategory: string;
  UniqueID: string;
  tagsType: TagType;
}

export interface currencyRatesType {
  buyingRate: number | null | undefined;
  sellingRate: number | null | undefined;
  midRate?: number | null | undefined;
  buyingInflation?: string;
  sellingInflation?: string;
  midInflation?: string;
}

export interface fuelRatesType {
  company?: companyType;
  petrol: number | null;
  diesel: number | null;
  premium: number | null;
  petrolInflation?: string;
  dieselInflation?: string;
  premiumInflation?: string;
}

export interface exchangeRatesType {
  company: companyType;
  dollarRates: currencyRatesType;
  euroRates: currencyRatesType;
  poundRates: currencyRatesType;
}

export interface vehicleType {
  year: number;
  make: string;
  model: string;
}

export interface locationType {
  region: string;
  town: string;
}

export type UserDetailsType = {
  [key: string]: string | number | { [key: string]: any } | undefined;
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  uniqueId: string;
  UniqueID: string;
  birthday: string;
  gender: "male" | "female";
  email: string;
  whatsappNumber: number;
  homeLocation: locationType;
  otherLocation: locationType;
  vehicle: vehicleType;
  typeOfDriver: "private" | "commercial";
  watchList: string[];
  role: string;
};

export type CompanyDataType = {
  date: string;
  prices: fuelRatesType;
  rates: exchangeRatesType;
};

export type CompleteRateType = {
  name: string;
  company: string;
  dollarRates: currencyRatesType;
  euroRates: currencyRatesType;
  poundRates: currencyRatesType;

  petrol: number | null;
  diesel: number | null;
  premium: number | null;
  petrolInflation?: string;
  dieselInflation?: string;
  premiumInflation?: string;
};

export type CompanyDetailsType = {
  name: any;
  bio: string;
  _id: string;
  companyName: string;
  image: string;
  category: "fuelPrices" | "exchangeRates";
  uniqueNumber: 10;
  isVerified: true;
  banner: string;
  subCategory: string;
  verified: false;
  averageRating: 0;
  numOfReviews: 0;
  bannerGradient: string;
  numOfRatings: number;
  UniqueID: string;
  url: string;
  link: string;
  linkType: string;
  phone: string;
  tagsType: TagType;
};

export type CompanyRate = {
  success: boolean;
  data: CompleteRateType;
};

export type CompleteCompanyDetailsType = {
  company: CompanyDetailsType;
  data: CompanyDataType[];
  subscriberCount?: string;
  hasNextPage?: boolean;
};

export type ReviewType = {
  _id: string;
  rating: number;
  review: string;
  location: locationType;
  vehicle: vehicleType;
  image: string[];
  upVote: number;
  downVote: number;
  company: CompanyDetailsType;
  user: UserDetailsType;
  updatedAt: string;
  createdAt: string;
};

export type SingleEventType = {
  _id: string;
  eventTitle: string;
  description: string;
  image: string;
  date: string;
  company: CompanyDetailsType;
  user: UserDetailsType;
  updatedAt: string;
  createdAt: string;
};

export type AverageRateData = {
  averageDiesel: number;
  averagePetrol: number;
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
  averageBankDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageBankEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averageBankPound: {
    buyingRate: number;
    sellingRate: number;
  };
  averageCryptoExchangeDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageCryptoExchangeEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averageCryptoExchangePound: {
    buyingRate: number;
    sellingRate: number;
  };
  averageFintechDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageFintechEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averageFintechPound: {
    buyingRate: number;
    sellingRate: number;
  };
  averageForexBureauDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageForexBureauEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averageForexBureauPound: {
    buyingRate: number;
    sellingRate: number;
  };
  averageMoneyTransferDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averageMoneyTransferEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averageMoneyTransferPound: {
    buyingRate: number;
    sellingRate: number;
  };
  averagePaymentProcessorDollar: {
    buyingRate: number;
    sellingRate: number;
  };
  averagePaymentProcessorEuro: {
    buyingRate: number;
    sellingRate: number;
  };
  averagePaymentProcessorPound: {
    buyingRate: number;
    sellingRate: number;
  };
};

export interface PriceData {
  date?: string;
  prices?: {
    petrol: number;
    diesel: number;
    premium: number;
  };
  rates?: {
    dollarRates?: {
      buyingRate: number | null;
      sellingRate: number | null;
      midRate?: number | null;
    };
    poundRates?: {
      buyingRate: number | null;
      sellingRate: number | null;
      midRate?: number | null;
    };
    euroRates?: {
      buyingRate: number | null;
      sellingRate: number | null;
      midRate?: number | null;
    };
  };
}

interface Publisher {
  UniqueID: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export type Article = {
  index: number;
  _id: number;
  title: string;
  image: string;
  content: string;
  summary: string;
  tags?: string[];
  status: "published" | "saved";
  company?: string;
  publishedBy: Publisher;
  createdAt: string;
  updatedAt: string;
  category: string;
  rssExternalLink: string;
  origin: string;
  slug: string;
  views: number;
};

export type PollOptionType = {
  _id: string;
  value: string;
  correct: boolean;
  count: number;
};

export type PollType = {
  _id: string;
  question: string;
  options: PollOptionType[];
  anonymous: boolean;
  multiple: boolean;
  quiz: boolean;
  isActive: true;
  company: string;
  expiryDate: string;
  // total: number;
};

export type AdType = {
  id: number;
  name: string;
  desktopImage: string;
  mobileImage: string;
  url: string;
};

export interface TagType {
  warning: {
    note: string | null;
    date: string | null;
    status: boolean;
  };
  promotion: {
    note: string | null;
    date: string | null;
    status: boolean;
  };
  newListing: {
    note: string | null;
    date: string | null;
    status: boolean;
  };
}
