import axios from "axios";
import moment from "moment";
import "moment-timezone";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
  exchangeRatesType,
  fuelRatesType,
  CompanyRate,
} from "../types";

type SetStateTypeValue = React.Dispatch<React.SetStateAction<boolean>>;
type SetStateTypeSort = React.Dispatch<React.SetStateAction<string>>;

moment.suppressDeprecationWarnings = true;

export const getCompany = async (
  name: string
): Promise<CompleteCompanyDetailsType> => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/getall/${name}`,
    { headers: { "custom-origin": "cedirates-dev" } }
  );

  const data = await response.json();
  return data;
};

export const getChartData = async (name: any): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/exchangerates/getall/${name}/?page=1&limit=10000`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFuelChartData = async (name: any): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/fuelprices/getall/${name}/?page=1&limit=10000`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCompanyDetails = async (
  companyUrl: string
): Promise<CompleteCompanyDetailsType> => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/get/${companyUrl}`,
    { headers: { "custom-origin": "cedirates-dev" } }
  );

  const data = await response.json();
  return data;
};

export const getCompanyData = async (
  companyUrl: string
): Promise<CompleteCompanyDetailsType> => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/getall/${companyUrl}`,
    { headers: { "custom-origin": "cedirates-dev" } }
  );

  const data = await response.json();
  return data;
};

export const getCompanyRate = async (
  companyUrl: string
): Promise<CompanyRate> => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/today/${companyUrl}`,
    { headers: { "custom-origin": "cedirates-dev" } }
  );

  const data = await response.json();
  return data;
};

export const getFuelRates = async (): Promise<fuelRatesType[]> => {
  // if (fuelData) {
  //   return fuelData!;
  // }
  const date = moment.utc().tz("Africa/Accra").format("D-M-YYYY");
  const response = await fetch(`${process.env.BASE_URL}/fuelPrices/` + date, {
    cache: "no-store",
    headers: { "custom-origin": "cedirates-dev" },
  });
  // if (!response.ok) {
  //   // This will activate the closest error.js Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  const data = await response.json();
  // fuelData = data.fuelPrices;
  // return fuelData!;
  return data.fuelPrices;
};

export const getExchangeRates = async (): Promise<exchangeRatesType[]> => {
  // if (exchangeData) {
  //   console.log(1);
  //   return exchangeData;
  // }
  const date = moment.utc().tz("Africa/Accra").format("D-M-YYYY");
  const response = await fetch(
    `${process.env.BASE_URL}/exchangeRates/` + date,
    { cache: "no-store", headers: { "custom-origin": "cedirates-dev" } }
  );
  // if (!response.ok) {
  //   // This will activate the closest error.js Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  const data = await response.json();

  // exchangeData = data.exchangeRates;
  // return exchangeData!;
  // console.log(data.exchangeRates);

  return data.exchangeRates;
};

export const getWatchList = async (
  cookies: string
): Promise<exchangeRatesType[]> => {
  const response = await fetch(`${process.env.BASE_URL}/users/watchList`, {
    cache: "no-store",
    headers: { Cookie: cookies, "custom-origin": "cedirates-dev" },
  });
  // if (!response.ok) {
  //   // This will activate the closest error.js Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  const data = await response.json();

  console.log(data);

  // exchangeData = data.exchangeRates;
  // return exchangeData!;
  // console.log(data.exchangeRates);

  return data.exchangeRates;
};

export const getNavRates = async (): Promise<exchangeRatesType[]> => {
  // if (exchangeData) {
  //   console.log(1);
  //   return exchangeData;
  // }
  const response = await fetch(`${process.env.BASE_URL}/company/allData`, {
    cache: "no-store",
    headers: { "custom-origin": "cedirates-dev" },
  });
  // if (!response.ok) {
  //   // This will activate the closest error.js Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  const data = await response.json();

  // exchangeData = data.exchangeRates;
  // return exchangeData!;
  // console.log(data.exchangeRates);

  return data.data;
};

export const getUser = async (cookies: string): Promise<UserDetailsType> => {
  const response = await fetch(`${process.env.BASE_URL!}/users/getuser`, {
    credentials: "include",
    headers: { Cookie: cookies, "custom-origin": "cedirates-dev" },
  });

  const data = await response.json();

  // user = data;
  return data;

  // return user!;
};

export const googleOneTapLogin = async (credential: string) => {
  try {
    const { data } = await axios.post(
      // `${process.env.BASE_URL}/auth/with-google`,
      "/api/v1/auth/with-google",
      {},
      { headers: { authorization: `Bearer ${credential}` } }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const logUserOut = async () => {
  try {
    const { data } = await axios.delete(
      // `${process.env.BASE_URL}/auth/logout`,
      "/api/v1/auth/logout",
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const addToWatchList = async (link: string, UniqueID: string) => {
  try {
    // const response = await fetch(`${link}/users/watchList/${UniqueID}`, {
    //   credentials: "include",
    //   method: "POST"
    // });

    // const data = await response.json();

    const { data } = await axios.post(
      `/api/v1/users/watchList/${UniqueID}`,
      { headers: { "custom-origin": "cedirates-dev" } },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getUserClient = async (): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.BASE_URL!}/users/getuser`, {
      withCredentials: true,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriberCount = async (id: string) => {
  try {
    let { data } = await axios.get(`${process.env.BASE_URL}/subscribers/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const subscribeToCompany = async (id: string) => {
  try {
    // Check if id is defined and truthy
    if (!id) {
      console.log("ID is undefined or falsy. Waiting for it to be defined...");
      return null; // or return a placeholder value
    }

    let { data } = await axios.post(`/api/v1/subscribers/${id}`, {});
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEvents = async (id: string): Promise<SingleEventType[]> => {
  const response = await fetch(`${process.env.BASE_URL}/events/get-all/${id}`);

  const data = await response.json();
  return data;
};

export const getReviews = async (id: string): Promise<ReviewType[]> => {
  const response = await fetch(`${process.env.BASE_URL}/reviews/get/${id}`, {
    cache: "no-store",
    headers: { "custom-origin": "cedirates-dev" },
  });

  const data = await response.json();
  return data;
};

export const getUserReviewForCompany = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/reviews/get-review/${id}`,
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );
    // let { data } = await customAxios.get(` review/get-review/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postReviewUpVote = async (id: string) => {
  try {
    let { data } = await axios.patch(
      `/api/v1/reviews/upvote-review/${id}`,
      {},
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postReviewDownVote = async (id: string) => {
  try {
    let { data } = await axios.patch(
      `/api/v1/reviews/downvote-review/${id}`,
      {},
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (id: string) => {
  try {
    let { data } = await axios.delete(
      `${process.env.BASE_URL}/reviews/delete-review/${id}`,
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editReview = async (newData: FormData, id: string) => {
  try {
    let { data } = await axios.patch(
      `${process.env.BASE_URL}/reviews/edit-review/${id}`,
      newData,
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllReviews = async (id: string) => {
//   try {
//     let { data } = await axios.get(`${process.env.BASE_URL}/reviews/get/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllBlogs = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/article/get-all`,
      {
        headers: { "custom-origin": "cedirates-dev" },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (id: string) => {
  try {
    const data = await fetch(`${process.env.BASE_URL}/article/${id}`, {
      cache: "no-store",
      headers: { "custom-origin": "cedirates-dev" },
    });
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllPolls = async () => {
  try {
    let { data } = await axios.get(`${process.env.BASE_URL}/polls/get-active`, {
      headers: { "custom-origin": "cedirates-dev" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPoll = async (id: string) => {
  try {
    let { data } = await axios.get(`${process.env.BASE_URL}/${id}`, {
      headers: { "custom-origin": "cedirates-dev" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAverage = async (date: any) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/average/${date}`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getYears = async () => {
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/car/get`, {
      headers: { "custom-origin": "cedirates-dev" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMakes = async (year: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/car/get?year=${year}`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getModels = async (year: number, make: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/car/get?year=${year}&make=${make}`,
      { headers: { "custom-origin": "cedirates-dev" } }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// console.log(user);
// console.log(typeof exchangeData);

// Sorting
// Sorting exchange rates functions
export const handleBuying = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("Buying");
  currentSortFunc("rates");
};

export const handleSelling = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("Selling");
  currentSortFunc("rates");
};

export const handleMidrate = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("Midrate");
  currentSortFunc("rates");
};

export const handlePetrol = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("petrol");
  currentSortFunc("rates");
};

export const handleDiesel = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("diesel");
  currentSortFunc("rates");
};

export const handlePremium = (
  sortingFunc: SetStateTypeValue,
  ratesValueFunc: SetStateTypeSort,
  value: boolean,
  currentSortFunc: SetStateTypeSort
) => {
  sortingFunc(!value);
  ratesValueFunc("premium");
  currentSortFunc("rates");
};

export const handleNameSorting = (a: any, b: any, nameSortingOrder: any) => {
  const nameA = a.company.companyName.toUpperCase();
  const nameB = b.company.companyName.toUpperCase();
  if (nameA < nameB) {
    return nameSortingOrder === "ascending" ? -1 : 1;
  }
  if (nameA > nameB) {
    return nameSortingOrder === "ascending" ? 1 : -1;
  }
  return 0;
};

export const sortingFunction = (
  a: any,
  b: any,
  sorting: any,
  ratesValue: any,
  currency: "dollarRates" | "euroRates" | "poundRates"
) => {
  switch (sorting) {
    case false:
      let aValue;
      let bValue;

      switch (ratesValue) {
        case "Buying":
          aValue = a[currency].buyingRate === "-" ? 0 : a[currency].buyingRate;
          bValue = b[currency].buyingRate === "-" ? 0 : b[currency].buyingRate;
          break;
        case "Selling":
          aValue =
            a[currency].sellingRate === "-" ? 0 : a[currency].sellingRate;
          bValue =
            b[currency].sellingRate === "-" ? 0 : b[currency].sellingRate;
          break;
        case "Midrate":
          aValue = a[currency].midRate === "-" ? 0 : a[currency].midRate;
          bValue = b[currency].midRate === "-" ? 0 : b[currency].midRate;
          break;
        default:
          return 0;
      }
      return sorting ? bValue - aValue : aValue - bValue;

    case true:
      switch (ratesValue) {
        case "Buying":
          return b[currency].buyingRate - a[currency].buyingRate;
        case "Selling":
          return b[currency].sellingRate - a[currency].sellingRate;
        case "Midrate":
          return b[currency].midRate - a[currency].midRate;
        default:
          return (a = b);
      }
    default:
      return (a = b);
  }
};

// Combined sorting function
export const combinedSortingFunction = (
  a: any,
  b: any,
  nameSortingOrder: "ascending" | "descending" | "",
  sorting: boolean,
  ratesValue: string,
  currencyType: "dollarRates" | "euroRates" | "poundRates",
  currentSort: any
) => {
  // Name sorting logic
  switch (currentSort) {
    case "name":
      const nameA = a.company.companyName.toUpperCase();
      const nameB = b.company.companyName.toUpperCase();
      if (nameA !== nameB) {
        if (nameA < nameB) {
          return nameSortingOrder === "ascending" ? -1 : 1;
        }
        if (nameA > nameB) {
          return nameSortingOrder === "ascending" ? 1 : -1;
        }
      }
      break;
    case "rates":
      return sortingFunction(a, b, sorting, ratesValue, currencyType);
      break;

    default:
      break;
  }
};

export const initialSortingFunction = (
  a: any,
  b: any,
  ratesValue: any,
  currency: "dollarRates" | "euroRates" | "poundRates"
) => {
  switch (ratesValue) {
    case "Buying":
      return b[currency].buyingRate - a[currency].buyingRate;
    case "Selling":
      return b[currency].sellingRate - a[currency].sellingRate;
    case "Midrate":
      return b[currency].midRate - a[currency].midRate;
    default:
      return (a = b);
  }
};

export const initialFuelSortingFunction = (a: any, b: any, ratesValue: any) => {
  switch (ratesValue) {
    case "petrol":
      return b.petrol - a.petrol;
    case "diesel":
      return b.diesel - a.diesel;
    case "premium":
      return b.premium - a.premium;
    default:
      return (a = b);
  }
};

export const fuelSortingFunction = (
  a: any,
  b: any,
  sorting: any,
  ratesValue: any
) => {
  switch (sorting) {
    case false:
      let aValue;
      let bValue;

      switch (ratesValue) {
        case "petrol":
          aValue = a.petrol === "-" ? 0 : a.petrol;
          bValue = b.petrol === "-" ? 0 : b.petrol;
          break;
        case "diesel":
          aValue = a.diesel === "-" ? 0 : a.diesel;
          bValue = b.diesel === "-" ? 0 : b.diesel;
          break;
        case "premium":
          aValue = a.premium === "-" ? 0 : a.premium;
          bValue = b.premium === "-" ? 0 : b.premium;
          break;
        default:
          return 0;
      }
      return sorting ? bValue - aValue : aValue - bValue;

    case true:
      switch (ratesValue) {
        case "Buying":
          return b.buyingRate - a.buyingRate;
        case "diesel":
          return b.diesel - a.diesel;
        case "premium":
          return b.premium - a.premium;
        default:
          return (a = b);
      }
    default:
      return (a = b);
  }
};

// Combined sorting function
export const combinedFuelSortingFunction = (
  a: any,
  b: any,
  nameSortingOrder: "ascending" | "descending" | "",
  sorting: boolean,
  ratesValue: string,
  currentSort: any
) => {
  // Name sorting logic
  switch (currentSort) {
    case "name":
      const nameA = a.company.companyName.toUpperCase();
      const nameB = b.company.companyName.toUpperCase();
      if (nameA !== nameB) {
        if (nameA < nameB) {
          return nameSortingOrder === "ascending" ? -1 : 1;
        }
        if (nameA > nameB) {
          return nameSortingOrder === "ascending" ? 1 : -1;
        }
      }
      break;
    case "rates":
      return fuelSortingFunction(a, b, sorting, ratesValue);
      break;

    default:
      break;
  }
};
