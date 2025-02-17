"use client";
import React, { useState } from "react";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import style from "../../../assets/styles/premiumListing.module.css";
import { RiShieldStarFill } from "react-icons/ri";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Swiper } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import dynamic from "next/dynamic";

const Ratings = dynamic(() => import("./Ratings"));
const ReviewModal = dynamic(() => import("./ReviewModal"));
const Comment = dynamic(() => import("./Comment"));
const AverageInfo = dynamic(() => import("./AverageInfo"));
const AllReviews = dynamic(() => import("./AllReviews"));

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  reviews: ReviewType[];
  events: SingleEventType[];
};

type SwiperState = Swiper | null;

const ReviewSection = ({ companyDetails, user, reviews, events }: Props) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [openFirst, setOpenFirst] = useState(false);
  const [openMini, setOpenMini] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);
  const [swiper, setSwiper] = useState<SwiperState>(null);

  // const filteredReviewsCollection = reviews?.filter(
  //   (review) => review.review !== null
  // );

  const filteredReviewsCollection = Array.isArray(reviews)
    ? reviews.filter((review) => review.review !== null)
    : [];

  // const review = reviews?.find((review) => review?.user?.userId === user._id);
  const review = Array.isArray(reviews)
    ? reviews.find((review) => review?.user?.userId === user._id)
    : undefined;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="sm:mt-0 mt-24">
      <div>
        <div className={style["headline-rating-review"]}>
          <p className="text-paragraph-md-bold">Ratings & Reviews</p>
          <AllReviews
            companyDetails={companyDetails}
            user={user}
            reviews={reviews}
            value={value}
            setValue={setValue}
            open={openAll}
            setOpen={setOpenAll}
            handleClose={handleClose}
            setReviews={setAllReviews}
          />
        </div>
        <AverageInfo
          companyDetails={companyDetails}
          user={user}
          reviews={reviews}
        />
      </div>

      <div className={style["write-review-section"]}>
        <Ratings
          user={user}
          companyDetails={companyDetails}
          value={review ? review.rating : value}
          setValue={setValue}
          setOpen={setOpen}
        />

        <div className={style["write-review"]}>
          <ReviewModal
            triggerTitle={
              review && review.review === null
                ? "Write a Review"
                : review
                ? "Edit Review"
                : "Write a Review"
            }
            companyDetails={companyDetails}
            user={user}
            reviews={allReviews}
            setReviews={setAllReviews}
            value={value}
            setValue={setValue}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
        </div>
      </div>

      <div>
        {filteredReviewsCollection.length === 0 ? (
          <div className={style["empty-review-section"]}>
            <div className={style["empty-review-text"]}>
              <RiShieldStarFill className={style["empty-review-svg"]} />
              <p className={style["empty-review-main-text"]}>
                {companyDetails.company?.companyName} has no reviews yet.
              </p>
              <div className={style["write-review"]}>
                <p className={style["write-review-text"]}>
                  <ReviewModal
                    triggerTitle="Be the first to leave a review"
                    companyDetails={companyDetails}
                    user={user}
                    reviews={reviews}
                    value={value}
                    setValue={setValue}
                    open={openFirst}
                    setOpen={setOpenFirst}
                    handleClose={handleClose}
                    setReviews={setAllReviews}
                  />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={style["comment-section"]}>
            <SwiperComponent
              modules={[Navigation]}
              breakpoints={{
                500: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                800: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              navigation={{
                nextEl: ".swiper-forward",
                prevEl: ".swiper-back",
              }}
              className={style["swiper-component"]}
              // onSwiper={setSwiper}
              onSwiper={(s) => {
                setSwiper(s);
              }}
              // navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReviewsCollection
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                  )
                  .reverse()
                  .map((review) => (
                    <SwiperSlide key={review._id}>
                      <Comment
                        review={review}
                        companyDetails={companyDetails}
                        user={user}
                        value={value}
                        setValue={setValue}
                        setReviews={setAllReviews}
                      />
                    </SwiperSlide>
                  ))}
              </div>
            </SwiperComponent>
            <button
              className={style["swiper-forward"]}
              onClick={() => swiper?.slideNext()}
            >
              <BsChevronCompactRight />
            </button>
            <button
              className={style["swiper-back"]}
              onClick={() => swiper?.slidePrev()}
            >
              <BsChevronCompactLeft />
            </button>
          </div>
        )}
      </div>

      <div className={style["write-review-section-mini"]}>
        <div className={style["write-review-mini"]}>
          <ReviewModal
            triggerTitle={review ? "Edit Review" : "Write a Review"}
            companyDetails={companyDetails}
            user={user}
            reviews={reviews}
            value={value}
            setValue={setValue}
            open={openMini}
            setOpen={setOpenMini}
            handleClose={handleClose}
            setReviews={setAllReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
