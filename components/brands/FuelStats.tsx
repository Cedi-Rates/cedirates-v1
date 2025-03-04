import { CompanyRate, CompleteCompanyDetailsType, UserDetailsType } from "@/utils/types";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import style from "../../assets/styles/company.module.css";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import DecorativeIcon from "@/assets/Icons/DecorativeIcon";

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate
  user: UserDetailsType;
};

const FuelStats = ({ companyDetails, user, companyData }: Props) => {
  const currentRate = companyData.data
  console.log(currentRate)
  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
    <div className="grid grid-cols-3 gap-3 sm:w-full w-max">
      <div
        className="px-spacing-16 relative sm:w-full w-[160px] max-w-[320px] flex flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.petrol ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top left pattern */}
            <div className="absolute -top-4 opacity-[8%] -left-2 text-green-100 transform rotate-[-15deg] scale-[2.5]">
              <DecorativeIcon index={0} />
            </div>

            {/* Bottom right pattern */}
            <div className="absolute -bottom-4 opacity-[8%] -right-4 text-green-100 transform rotate-[165deg] scale-[2.5]">
              <DecorativeIcon index={0} />
            </div>
          </div>

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Petrol</p>
          <p className="text-header-h4-medium sm:text-header-h3-medium pr-0 sm:pr-6 items-center flex-row flex leading-[30px] my-spacing-8 sm:mb-6 mb-4 sm:my-spacing-20">
          ₵{currentRate?.petrol && currentRate?.petrol > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.petrol * 100) / 100).toFixed(2) : "-"}
            {currentRate.petrolInflation === "increase" ? (
              <FaSortUp className="text-green-600 mb-[-1.1rem]" size={38} />
            ) : currentRate.petrolInflation === "decrease" ? (
              <FaSortDown className="text-red-600 mb-[-1.1rem]" size={38} />
            ) : (
              ""
            )}
          </p>
        </div>

      <div
        className="px-spacing-16 relative sm:w-full w-[160px] flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.petrol ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}

          <div className="absolute inset-0 overflow-hidden">
            {/* Top left pattern */}
            <div className="absolute -top-4 opacity-[8%] -left-2 text-green-100 transform rotate-[-15deg] scale-[2.5]">
              <DecorativeIcon index={1} />
            </div>

            {/* Bottom right pattern */}
            <div className="absolute -bottom-4 opacity-[8%] -right-4 text-green-100 transform rotate-[165deg] scale-[2.5]">
              <DecorativeIcon index={1} />
            </div>
          </div>

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Diesel</p>
          <p className="text-header-h4-medium sm:text-header-h3-medium pr-0 sm:pr-6 items-center flex-row flex leading-[30px] my-spacing-8 sm:mb-6 mb-4 sm:my-spacing-20">
          ₵{currentRate?.diesel && currentRate?.diesel > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.diesel * 100) / 100).toFixed(2) : "-"}
            {currentRate.dieselInflation === "increase" ? (
              <FaSortUp className="text-green-600 mb-[-1.1rem]" size={38} />
            ) : currentRate.dieselInflation === "decrease" ? (
              <FaSortDown className="text-red-600 mb-[-1.1rem]" size={38} />
            ) : (
              ""
            )}
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
        className="px-spacing-16 relative sm:w-full w-[160px] max-w-[320px] flex flex-col border-2 rounded-xl border-[#E5E5E5]"
        style={{
          display: !currentRate?.premium ? "none" : "flex",
        }}
      >
        {/* <span className="absolute top-2 right-2 cursor-pointer">
          <CiCircleInfo />
        </span> */}

          <div className="absolute inset-0 overflow-hidden">
            {/* Top left pattern */}
            <div className="absolute -top-4 opacity-[8%] -left-2 text-green-100 transform rotate-[-15deg] scale-[2.5]">
              <DecorativeIcon index={2} />
            </div>

            {/* Bottom right pattern */}
            <div className="absolute -bottom-4 opacity-[8%] -right-4 text-green-100 transform rotate-[165deg] scale-[2.5]">
              <DecorativeIcon index={2} />
            </div>
          </div>

        <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Premium</p>
          <p className="text-header-h4-medium sm:text-header-h3-medium pr-0 sm:pr-6 items-center flex-row flex leading-[30px] my-spacing-8 sm:mb-6 mb-4 sm:my-spacing-20">
          ₵{currentRate?.premium && currentRate?.premium > 0
              ? // ? currentRate?.prices?.petrol
              (Math.floor(currentRate?.premium * 100) / 100).toFixed(2) : "-"}
            {currentRate.premiumInflation === "increase" ? (
              <FaSortUp className="text-green-600 mb-[-1.1rem]" size={38} />
            ) : currentRate.premiumInflation === "decrease" ? (
              <FaSortDown className="text-red-600 mb-[-1.1rem]" size={38} />
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FuelStats;
