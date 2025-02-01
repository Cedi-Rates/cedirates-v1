import React from 'react'
import {
  CompleteCompanyDetailsType, SingleEventType, ReviewType, UserDetailsType
} from "@/utils/types";
import style from '../../../assets/styles/premiumListing.module.css'
import { FaStar } from 'react-icons/fa';
import { Progress } from "@/components/ui/progress"
import ReactStars from "react-rating-star-with-type";


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
    <div className='grid grid-cols-1 min-[1300px]:grid-cols-3 min-[1300px]:divide-x  divide-y min-[1300px]:divide-y-0  divide-gray-100 py-4  border-b border-b-gray-100 pb-6'>
      {/* <div className={style["average-rating"]}>
        <p className={style["average-number"]}>
          {averageRating?.toFixed(1)} <span>out of 5</span>
        </p>
        <div className={style["total-rating"]}>
          <p>
            {numOfRatings} {numOfRatings > 1 ? "Reviews" : "Review"}
          </p>
        </div>
      </div> */}
      <div className='flex flex-col h-full justify-center min-[1300px]:py-0 py-5 gap-4 px-8'>
        <p className="text-paragraph-sm-medium">Total reviews</p>
        <p className='text-header-h3-regular leading-[36px]'>{numOfRatings}</p>
      </div>
      <div className='flex flex-col h-full justify-center min-[1300px]:py-0 py-5 gap-4 px-8'>
        <p className="text-paragraph-sm-medium">Average reviews</p>
        <div className='flex flex-row gap-2'>
        <p className='text-header-h3-regular leading-[36px]'>{averageRating.toFixed(1)}</p>
        <ReactStars
            value={averageRating}
            isEdit={false}
            activeColor="#faaf00"
            inactiveColor='#A3A3A3'
            size={20}
          />   
        </div>
      </div>


      <div className={style["star-progress-sec"] + ' !gap-2 min-[1300px]:py-0 py-5 px-8 h-full'}>
        {Array(5).fill('').map((item, index) => <div key={index} className={style["detailed-rating"] + ' gap-2'}>
          <div className="flex flex-row gap-0.5 items-center [&>svg]:text-icon-icon-warning-secondary">
            <FaStar size={8} /> <span className='text-caption-md-regular'>{5-(index)}</span>
          </div>
          <Progress
            className="rounded-3xl h-1"
            value={getRatingFraction(ratingArrays[5-index])}
          />
        </div>)}
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