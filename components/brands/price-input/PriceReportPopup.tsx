"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdOutlineChevronRight } from "react-icons/md";
import { ChevronsUpDown, Check, Loader2, CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchLocation } from "@/utils/fetchLocation";
import { useFetchVehicles } from "@/utils/fetchVehicles";
import Image from "next/image";
import axios from "axios";
import ReactStars from "react-rating-star-with-type";
import { SpinnerCircular } from "spinners-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import FuelModal from "./ReportFuelModal";
import RatesModal from "./ReportRatesModal";

interface AlertDialogDemoProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  open: boolean;
  setOpen?: (open: boolean) => void;
}

const PriceReportPopup: React.FC<AlertDialogDemoProps> = ({
  companyDetails,
  user,
  open,
  setOpen,
}) => {
  // const onSubmit = async () => {
  //   setLoading(true);

  //   const reviewObject = {
  //     review: reviewText,
  //     rating: value,
  //     companyId: companyDetails.company._id,
  //     location: {
  //       region: selectedRegion,
  //       town: selectedTown,
  //     },
  //     vehicle: companyDetails.company.category === "fuelPrices" && {
  //       year: selectedYear,
  //       make: selectedMake,
  //       model: selectedModel,
  //     },
  //   };

  //   const formData = new FormData();
  //   uploadedImages?.map((item, index) =>
  //     formData.append(`image${index + 1}`, uploadedImages[index])
  //   );

  //   formData.append("data", JSON.stringify(reviewObject));

  //   const resData = await getReviews(companyDetails.company._id);
  //   setReviews(resData);

  //   if (reviewText.trim() === "") {
  //     toast({
  //       variant: "destructive",
  //       description: "Review cannot be empty",
  //     });
  //     setLoading(false);
  //     return;
  //   }

  //   if (reviewText.length <= 10) {
  //     toast({
  //       variant: "destructive",
  //       description: "Review must be more than 10 characters long.",
  //     });
  //     setLoading(false);
  //     return;
  //   }

  //   if (!value) {
  //     toast({
  //       variant: "destructive",
  //       description: "Please select a rating",
  //     });
  //     setLoading(false);
  //     return;
  //   }

  //   if (!user?.firstName || !user?.lastName) {
  //     setErrorModal(true);
  //     return;
  //   }

  //   if (review?.review) {
  //     setReviewEdit(reviewText);
  //   }

  //   try {
  //     await axios.post("/api/v1/reviews/add-review", formData);
  //     toast({
  //       description: "Thanks for your feedback",
  //     });
  //     handleClose(false);
  //     setLoading(false);
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       description: `${error.response.data.msg}`,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className="flex items-center">
          <LuPenSquare />
           <p className={style["write-review-text"]}>{triggerTitle}</p> 
        </DialogTrigger> */}
        <DialogContent
          className="md:max-w-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center mb-2">
              Report prices for {companyDetails?.company?.companyName}
            </DialogTitle>
          </DialogHeader>
          {companyDetails?.company?.category === "fuelPrices" ? (
            <FuelModal
              companyDetails={companyDetails}
              user={user}
              setOpen={setOpen}
            />
          ) : (
            <RatesModal
              companyDetails={companyDetails}
              user={user}
              setOpen={setOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PriceReportPopup;
