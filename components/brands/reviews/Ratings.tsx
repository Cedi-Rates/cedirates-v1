"use client";
import React, { useState } from "react";
import style from "../../../assets/styles/premiumListing.module.css";
import ReactStars from "react-rating-star-with-type";
import { CompleteCompanyDetailsType, UserDetailsType } from "@/utils/types";
import axios from "axios";
import urlManager from "@/utils/urlManager";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface RatingsProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  value: number;
  setValue: (star: number) => void;
  setOpen: (open: boolean) => void;
}

const Ratings = ({
  value, setValue, setOpen, companyDetails, user
}: RatingsProps) => {
  const { toast } = useToast();
  const { replace } = useRouter();

  const onChange = (nextValue: number) => {
    if (!user?.email) {
      urlManager.setRedirectUrl();
      replace("/login");
    } else {
      setValue(nextValue);
      setOpen(true);
      onSubmit(nextValue);
    }
  };

  const onSubmit = async (rating: number) => {
    const ratingObject = {
      rating,
      companyId: companyDetails.company?._id
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(ratingObject));

    try {
      // const reviewSubmitted = userReview ? await axios.patch(
      //   `/api/v1/reviews/edit-review/${userReview._id}`, formData
      // ) : await axios.post("/api/v1/reviews/add-review", formData);

      const reviewSubmitted = await axios.post("/api/v1/reviews/add-review", formData);
      if (reviewSubmitted) {
        toast({
          variant: 'success',
          title: "Thanks for leaving a rating"
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "This didn't work."
      })
    }
  };

  return (
    <>
      <div className={style["starRatingDiv"]}>
        <div>
          <p className={style["starRatingText"]}>Click to rate: </p>
          <p className={style["starRatingText-mini"]}>Tap to rate: </p>
        </div>
        <div>
          <ReactStars
            onChange={onChange}
            value={value}
            isEdit={true}
            activeColor="#faaf00"
            size={20}
          />
        </div>
      </div>
    </>
  );
};

export default Ratings;
