"use-client";

import React, { useState } from "react";
import PersonalDetails from "./personal-details";
import { IoMdClose } from "react-icons/io";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill } from "react-icons/pi";
import spinner from "../../../images/spinner.gif";
import styles from "../../assets/styles/listing.module.css";
import CompanyDetails from "./company-details";
import axios from "axios";
import { useGeneralDetails } from "@/context/context-provider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CompanyDetails {
  companyName: string;
  category: string;
  image: File;
  subCategory?: string;
}

const steps: string[] = ["Company Details", "Your Details"];

const FormContainer: React.FC<{
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowForm }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<boolean>(false);
  const { push } = useRouter();

  const { companyDetails, personalDetails } = useGeneralDetails();

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    if (
      !companyDetails?.companyName ||
      !companyDetails?.category ||
      !companyDetails?.image
    ) {
      alert("Please provide all details");
    } else if (
      companyDetails?.category === "exchangeRates" &&
      !companyDetails?.subCategory
    ) {
      alert("Please provide all details");
    } else {
      setActiveStep(activeStep + 1);
    }
    setAllowed(true);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function closeForm() {
    setShowForm(false);
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("image", companyDetails.image);

    const allValues = { ...companyDetails, ...personalDetails };
    formData.append("data", JSON.stringify(allValues));
    setLoading(true);

    try {
      await axios.post(`${process.env.BASE_URL!}/getlisted/`, formData);
      push("/verification");
      setActiveStep(0);
    } catch (err: any) {
      alert(err.response?.data?.msg || "Error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <CompanyDetails allowed={allowed} />;
      case 1:
        return <PersonalDetails />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`${styles["vertical-line"]}`}></div>
      <div className={styles.stepper}>
        <div
          className={cn(
            "p-2 rounded-full w-fit ml-auto bg-black/10 text-black/60",
            "hover:shadow-[0_1px_2px_#00000010] border-black/20"
          )}
          onClick={closeForm}
        >
          <IoMdClose />
        </div>
        <h1 className="text-md ">Get your business listed</h1>
        <div className={styles.steps}>
          <ol className={styles["step-list"]}>
            {steps.map((label, index) => (
              <div
                key={index}
                className="flex flex-column"
                id={styles["steps-container"]}
              >
                <li
                  key={index}
                  className={
                    index === activeStep
                      ? "text-primary font-medium inline-flex"
                      : "font-medium inline-flex"
                  }
                >
                  {index === 0 && (
                    <>
                      <PiNumberCircleOneFill className="relative text-2xl" />
                      <div className={styles["steps-vertical-line"]} />
                    </>
                  )}
                  {index === 1 && (
                    <PiNumberCircleTwoFill className="relative text-2xl" />
                  )}
                  <span className="ml-2">{label}</span>
                </li>
              </div>
            ))}
          </ol>
        </div>

        <div className={styles["hor-steps"]}>
          <ol className="flex flex-row">
            {steps.map((label, index) => (
              <div key={index} id={styles["hor-steps-container"]}>
                <li
                  key={index}
                  className={
                    index === activeStep
                      ? "text-primary font-medium inline-flex"
                      : "font-medium inline-flex"
                  }
                >
                  {index === 0 && (
                    <>
                      <PiNumberCircleOneFill className="relative text-2xl" />
                    </>
                  )}
                  {index === 1 && (
                    <PiNumberCircleTwoFill className="relative text-2xl" />
                  )}
                  <span className="ml-2">{label}</span>
                </li>
              </div>
            ))}
          </ol>
        </div>

        {renderStep(activeStep)}
        <div className={styles.buttons}>
          {activeStep > 0 && (
            <button className={styles["go-back"]} onClick={handleBack}>
              Go back
            </button>
          )}
          {activeStep < steps.length - 1 ? (
            <button
              className={
                "bg-black/10 text-black/60 py-2 px-4 rounded-full hover:shadow-[0_1px_2px_#00000010] border-black/20"
              }
              onClick={handleNext}
              disabled={
                !companyDetails?.companyName ||
                !companyDetails?.image ||
                !companyDetails?.category
              }
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              id={styles.finish}
              className={`${styles.finish} ${loading ? styles.loading : ""}`}
              onClick={handleSubmit}
              disabled={
                !personalDetails?.email ||
                !personalDetails?.firstName ||
                !personalDetails?.lastName ||
                !personalDetails?.password ||
                !personalDetails?.phone
              }
            >
              {loading ? "" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormContainer;
