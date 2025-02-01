"use client";
import React, { useState } from "react";
import style from "../../../assets/styles/premiumListing.module.css";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import { BsFillReplyFill } from "react-icons/bs";
import Thumb from "@/assets/Icons/Thumb";
import { postReviewDownVote, postReviewUpVote } from "@/utils/helpers/api";
import { FaRegImages } from "react-icons/fa";
import moment from "moment";
import Image from "next/image";
import FullComment from "./FullComment";
import Ratings from "./Ratings";
import ReactStars from "react-rating-star-with-type";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

moment.suppressDeprecationWarnings = true;

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  review: ReviewType;
  value: number;
  setValue: (star: number) => void;
  setReviews: (allReviews: ReviewType[]) => void;
};

const Comment = ({
  companyDetails,
  user,
  review,
  value,
  setValue,
  setReviews,
}: Props) => {
  const { toast } = useToast();
  const [showFullText, setShowFullText] = useState(false);
  const [showFullReply, setShowFullReply] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [upvoteStatus, setUpvoteStatus] = useState(false);
  const [downvoteStatus, setDownvoteStatus] = useState(false);
  const date = new Date(review.createdAt);
  const updated = new Date(review.updatedAt);
  const truncatedText = showFullText
    ? review.review
    : review.review?.slice(0, 150);

  const { _id: id } = review;

  const handleUpVote = async () => {
    try {
      if (!downvoteStatus) {
        const data = await postReviewUpVote(id);
        if (data) {
          if (upvoteStatus) {
            toast({
              variant: 'destructive',
              title: "Removed upvote"
            });
          } else {
            toast({
              variant: 'success',
              title: "Thanks for your upvote"
            });
          }
          // Toggle the upvote status
          setUpvoteStatus((prevStatus) => !prevStatus);
        }
      }
    } catch (error) {
      console.error("Error handling upvote:", error);
    }
  };

  const handleDownVote = async () => {
    try {
      if (!upvoteStatus) {
        const data = await postReviewDownVote(id);

        if (data) {
          if (downvoteStatus) {
            toast({
              variant: 'destructive',
              title: "Removed downvote"
            });
          } else {
            toast({
              variant: 'success',
              title: "Thanks for your downvote"
            });
          }
          // Toggle the downvote status
          setDownvoteStatus((prevStatus) => !prevStatus);
        }
      }
    } catch (error) {
      console.error("Error handling downvote:", error);
    }
  };

  return (
    <div className={style["comment-container"]}>
      <div className={style.comment} onClick={() => setOpenCommentModal(true)}>
        <div className={style.commentTop}>
          <div className={style.commentTopLeft}>
            {/* {!config ? (
                <InitalAvatar
                  sx={{
                    width: "40px",
                    height: "40px",
                    background:
                      "linear-gradient(to top, #209cff 0%, #68e0cf 100%)",
                  }}
                >
                  {user?.firstName?.split("")[0]}
                  {user?.lastName?.split("")[0]}
                </InitalAvatar>
              ) : (
                <Avatar style={{ width: "40px", height: "40px" }} {...config} />
              )} */}
            <Avatar name={review?.user?.firstName + " " + review?.user?.lastName} size="l" />
            <div>
              <p className={style.commentName}>
                {`${review?.user?.firstName || "John"} ${review?.user?.lastName || "D"
                  }`}
              </p>
              <p className={style.commentDesc}>
                {companyDetails.company.category === "fuelPrices"
                  ? review.vehicle &&
                  `${review.vehicle.make} ${review.vehicle.model}`
                  : review.location && `${review.location.town}`}
              </p>
            </div>
          </div>
          <div className={style.commentTopRight}>
            <ReactStars value={review.rating} activeColor="#faaf00" />
            {review.updatedAt === review.createdAt ? (
              <p>{moment(date).fromNow()}</p>
            ) : (
              <p>edited {moment(updated).fromNow()}</p>
            )}
          </div>
        </div>
        <div className={style["comment-text-group"]}>
          <p className={style["comment-text"]}>
            {truncatedText}
            {!showFullText && review.review?.length > 150 && (
              <span className="text-[#1896fe] cursor-pointer">...more</span>
            )}
          </p>

          {review.image.length > 0 && (
            <div className="review-image-row-small">
              {review.image.map((photo, key) => {
                return (
                  <Image
                    src={photo}
                    alt="review"
                    key={key}
                    width={100}
                    height={100}
                  />
                );
              })}
              <p>
                <FaRegImages /> {review.image.length} image
                {review.image.length > 1 && "s"}
              </p>
            </div>
          )}
        </div>

        <div className={style["review-audio-row"]}>
          {/* {audio && <Waveform audioData={audio} />} */}
        </div>

        {/* <span className="">{getInitials(user)}</span> */}

        {showFullText && (
          <div className={style["review-image-row"]}>
            {review.image.map((photo, key) => {
              return (
                <Image
                  src={photo}
                  alt="review"
                  key={key}
                  width={100}
                  height={100}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className={style.commentControls}>
        <div className={style.controlButton} onClick={handleUpVote}>
          <Thumb up />
          <p className={style["vote-count"]}>
            {review.upVote === 0 ? "" : review.upVote}
          </p>
        </div>
        <div className={style.controlButton} onClick={handleDownVote}>
          <Thumb />
          <p className={style["vote-count"]}>
            {review.downVote === 0 ? "" : review.downVote}
          </p>
        </div>
      </div>
      <FullComment
        review={review}
        companyDetails={companyDetails}
        user={user}
        open={openCommentModal}
        handleClose={() => setOpenCommentModal(false)}
        value={value}
        setValue={setValue}
        setReviews={setReviews}
      />
    </div>
  );
};

export default Comment;
