import { CompanyRate, CompleteCompanyDetailsType, UserDetailsType } from "@/utils/types";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import style from "../../assets/styles/company.module.css";
import { FaSortDown, FaSortUp } from "react-icons/fa";

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate
  user: UserDetailsType;
};

const FuelStats = ({ companyDetails, user, companyData }: Props) => {
  const currentRate = companyData.data

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 max-w-[652px] gap-3">
      <div
        className="px-spacing-16 w-full flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.petrol ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Petrol</p>
          <p className="text-header-h3-medium text-text-text-success leading-[30px] my-spacing-20">
            GHS {currentRate?.petrol && currentRate?.petrol > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.petrol * 100) / 100).toFixed(2) : "-"}
          </p>
      </div>

      <div
        className="px-spacing-16 w-full flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.petrol ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Diesel</p>
        <p className="text-header-h3-medium text-text-text-success leading-[30px] my-spacing-20">
            GHS {currentRate?.diesel && currentRate?.diesel > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.diesel * 100) / 100).toFixed(2) : "-"}
          </p>
          {/* <p className="mt-3 md:mt-5 text-[2rem] md:text-[2.5rem]">
            {currentRate?.dieselInflation === "increase" ? (
              <FaSortUp className="text-green-600 -mb-1" />
            ) : currentRate?.dieselInflation === "decrease" ? (
              <FaSortDown className="text-red-600 -mt-2" />
            ) : (
              ""
            )}
          </p> */}
      </div>

      <div
        className="px-spacing-16 w-full max-w-[320px] flex flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.premium ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Premium</p>
          <p className="text-header-h3-medium text-text-text-success leading-[30px] my-spacing-20">
            GHS {currentRate?.premium && currentRate?.premium > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.premium * 100) / 100).toFixed(2) : "-"}
          </p>
      </div>
    </div>
  );
};

export default FuelStats;
