import React from 'react'
import {
  CompleteCompanyDetailsType, SingleEventType, ReviewType, UserDetailsType
} from "@/utils/types";
import style from '../../../assets/styles/premiumListing.module.css'
import { FaStar } from 'react-icons/fa';
import { Progress } from "@/components/ui/progress"


interface AverageInfoProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  reviews: ReviewType[];
}

const AverageInfo = ({ companyDetails, user, reviews }: AverageInfoProps) => {

  const { averageRating, numOfRatings } = companyDetails?.company || {};

  const ratingArrays: { [key: number]: any[] } = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  // reviews?.forEach((item) => {
  //   const { rating } = item;
  //   if (rating >= 1 && rating <= 5) {
  //     ratingArrays[rating].push(item);
  //   }
  // });

  if (Array.isArray(reviews)) {
    reviews.forEach((item) => {
      const { rating } = item;
      if (rating >= 1 && rating <= 5) {
        ratingArrays[rating].push(item);
      }
    });
  }


  const getRatingFraction = (ratingLength: number[]) => {
    return (ratingLength.length / reviews.length) * 100;
  };

  return (
    <div className={style["info-section"]}>
      <div className={style["average-rating"]}>
        <p className={style["average-number"] + ' !leading-none mt-2'}>
          <p className='leading-none'>{averageRating?.toFixed(1)}</p> <span className='leading-none'>out of 5</span>
        </p>
        <div className={style["total-rating"]}>
          <p>
            {numOfRatings} {numOfRatings > 1 ? "Reviews" : "Review"}
          </p>
        </div>
      </div>

      <div className={style["star-progress-sec"]}>
        <div className={style["detailed-rating"]}>
          <div className={style["star-container"]}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <Progress
            className="rounded-3xl h-1"
            value={getRatingFraction(ratingArrays[5])}
          />
        </div>
        <div className={style["detailed-rating"]}>
          <div className={style["star-container"]}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <Progress
            className='rounded-3xl h-1'
            value={getRatingFraction(ratingArrays[4])}
          />
        </div>
        <div className={style["detailed-rating"]}>
          <div className={style["star-container"]}>
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <Progress
            className="rounded-3xl h-1"
            value={getRatingFraction(ratingArrays[3])}
          />
        </div>
        <div className={style["detailed-rating"]}>
          <div className={style["star-container"]}>
            <FaStar />
            <FaStar />
          </div>
          <Progress
            className="rounded-3xl h-1"
            value={getRatingFraction(ratingArrays[2])}
          />
        </div>
        <div className={style["detailed-rating"]}>
          <div className={style["star-container"]}>
            <FaStar />
          </div>
          <Progress
            className="rounded-3xl h-1"
            value={getRatingFraction(ratingArrays[1])}
          />
        </div>
        <div className={style["total-rating-mini"]}>
          <p>
            {numOfRatings === 1
              ? `${numOfRatings || ""} Rating`
              : `${numOfRatings || ""} Ratings`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AverageInfo