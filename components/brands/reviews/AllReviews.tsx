"use client";
import React, { useEffect, useState } from "react";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import style from "../../../assets/styles/premiumListing.module.css";
import { PiQuestionBold } from "react-icons/pi";
import Ratings from "./Ratings";
import AverageInfo from "./AverageInfo";
import Comment from "./Comment";
import ReviewModal from "./ReviewModal";

interface AllReviewsProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  reviews: ReviewType[];
  value: number;
  setValue: (star: number) => void;
  open: boolean;
  handleClose: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  setReviews: (allReviews: ReviewType[]) => void;
}

const AllReviews = ({
  companyDetails,
  user,
  reviews,
  value,
  setValue,
  open,
  handleClose,
  setOpen,
  setReviews,
}: AllReviewsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="flex-1 flex justify-end">
        <p className=" text-text-text-brand text-paragraph-sm-semibold cursor-pointer">See all</p>
      </DialogTrigger>
      <div className={style.modal}>
        <DialogContent className="max-w-4xl h-5/6 overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <div className={style["modal-headline-rating-review"]}>
                <p className={style["rating-head"]}>Ratings & Reviews</p>
              </div>
              <AverageInfo
                companyDetails={companyDetails}
                user={user}
                reviews={reviews}
              />
              <div className="flex justify-between items-center mt-1">
                <Ratings
                  user={user}
                  value={value}
                  setValue={setValue}
                  setOpen={setOpen}
                  companyDetails={companyDetails}
                />
                <div className="ml-4">
                  <ReviewModal
                    triggerTitle="Write a review"
                    companyDetails={companyDetails}
                    user={user}
                    reviews={reviews}
                    value={value}
                    setValue={setValue}
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    setReviews={setReviews}
                  />
                </div>
                {/* <div className={style["report-issue"]}>
                        <PiQuestionBold />
                        <p className={style["report-issue-text"]}>Report an Issue</p>
                    </div> */}
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(reviews) && reviews
                  .filter(
                    (review) => review.review && review.review.trim() !== ""
                  )
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                  )
                  .reverse()
                  .map((review) => {
                    return (
                      <Comment
                        key={review._id}
                        review={review}
                        companyDetails={companyDetails}
                        user={user}
                        value={value}
                        setValue={setValue}
                        setReviews={setReviews}
                      />
                    );
                  })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AllReviews;
