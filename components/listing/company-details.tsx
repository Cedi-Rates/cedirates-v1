"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FileUpload from "./file-upload";
import styles from "../../assets/styles/listing.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CompanyDetailsInterface,
  useGeneralDetails,
} from "@/context/context-provider";

interface CompanyDetailsProps {
  allowed: boolean;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ allowed }) => {
  const { companyDetails, setCompanyDetails } = useGeneralDetails();
  const [imageUrl, setImageUrl] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    trigger,
    watch,
    control,
  } = useForm<CompanyDetailsInterface>({
    defaultValues: {
      companyName: companyDetails?.companyName,
      image: companyDetails?.image,
      category: companyDetails?.category,
      subCategory: companyDetails?.subCategory,
    },
  });

  const companyNameValue = watch("companyName");
  const categoryValue = watch("category");
  const subCategoryValue = watch("subCategory");

  const companyDetailsFunc = () => {
    if (companyNameValue && categoryValue && imageUrl) {
      const CompanyDetailsValues: CompanyDetailsInterface = {
        companyName: companyNameValue,
        image: imageUrl,
        category: categoryValue,
        subCategory: subCategoryValue,
      };

      setCompanyDetails(CompanyDetailsValues);
    } else if (allowed) {
      trigger();
    }
  };

  const catWatch = watch("category");

  useEffect(() => {
    companyDetailsFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryValue, subCategoryValue, companyNameValue, imageUrl]);

  return (
    <form className={styles["company-details"]}>
      <h2 className="font-medium">Company Details</h2>
      <p className={styles.error}>{errors.companyName?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="companyName"
          control={control}
          defaultValue=""
          rules={{ required: "Company Name is required" }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={styles.input}
              placeholder="Company Name"
            />
          )}
        />
      </div>
      <p className={styles.error}>{errors.category?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "Select a category" }}
          render={({ field }) => (
            <select
              id="categories"
              className={styles["category-select"]}
              {...field}
            >
              <option value="" disabled selected>
                Select Company Category
              </option>
              <option value="exchangeRates">Exchange Rates</option>
              <option value="fuelPrices">Fuel Prices</option>
            </select>
          )}
        />
      </div>
      <p className={styles.error}>{errors.subCategory?.message}</p>
      <div
        className={styles["input-div"]}
        style={{
          display: categoryValue === "exchangeRates" ? "block" : "none",
        }}
      >
        <Controller
          name="subCategory"
          control={control}
          defaultValue=""
          rules={{ required: "Select a category" }}
          render={({ field }) => (
            <select
              id="subcategory"
              {...field}
              className={styles["category-select"]}
            >
              <option disabled defaultValue={"commercial-bank"}>
                Select Sub Category
              </option>
              <option value="Commercial Bank">Commercial Bank</option>
              <option value="Forex Bureau">Forex Bureaux</option>
              <option value="Crypto Exchange">Crypto Exchange</option>
              <option value="Fintech">Fintech</option>
              <option value="Money Transfer">Money Transfer</option>
              <option value="Payment Processor">Payment Processor</option>
            </select>
          )}
        />
      </div>
      <FileUpload setImageUrl={setImageUrl} />
    </form>
  );
};

export default CompanyDetails;
