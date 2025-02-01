"use client";

import customAxios from "../customAxios";
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

export const getExchangeRates = async (): Promise<exchangeRatesType[]> => {
  // if (exchangeData) {
  //   console.log(1);
  //   return exchangeData;
  // }
  const date = moment.utc().tz("Africa/Accra").format("D-M-YYYY");
  const { data } = await customAxios.get(`/exchangeRates/` + date);
  // if (!response.ok) {
  //   // This will activate the closest error.js Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // exchangeData = data.exchangeRates;
  // return exchangeData!;
  // console.log(data.exchangeRates);

  return data.exchangeRates;
};
