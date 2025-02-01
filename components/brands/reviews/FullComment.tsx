"use client";
import React, { MouseEventHandler, useState } from "react";
import style from "../../../assets/styles/premiumListing.module.css";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  deleteReview,
  editReview,
  getAllReviews,
  postReviewDownVote,
  postReviewUpVote,
} from "@/utils/helpers/api";
import { Avatar } from "@/components/ui/avatar";
import moment from "moment";
import Image from "next/image";
import Thumb from "@/assets/Icons/Thumb";
import { CiEdit, CiTrash } from "react-icons/ci";
import Ratings from "./Ratings";
import ReactStars from "react-rating-star-with-type";
import ReviewModal from "./ReviewModal";
import { Button } from "@/components/ui/button";
import { SlClose } from "react-icons/sl";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useToast } from "@/components/ui/use-toast";

moment.suppressDeprecationWarnings = true;

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  review: ReviewType;
  open: boolean;
  handleClose: () => void;
  value: number;
  setValue: (star: number) => void;
  setReviews: (allReviews: ReviewType[]) => void;
};

const FullComment = ({
  companyDetails,
  user,
  review,
  open,
  handleClose,
  value,
  setValue,
  setReviews,
}: Props) => {
  const { toast } = useToast();
  const [showTextArea, setShowTextArea] = useState(false);
  const [showEditTextArea, setShowEditTextArea] = useState(false);
  const [reviewReply, setReviewReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [upvoteStatus, setUpvoteStatus] = useState(false);
  const [downvoteStatus, setDownvoteStatus] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(review.review);
  const [ratingValue, setRatingValue] = useState(review.rating);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const date = new Date(review.createdAt);
  const currentUserReview = user?._id === review?.user?.userId;

  const handleOpenDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
    handleClose();
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleUpVote: MouseEventHandler<HTMLDivElement> = async (event) => {
    const id = event.currentTarget.id;
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

  const handleDownVote: MouseEventHandler<HTMLDivElement> = async (event) => {
    const id = event.currentTarget.id;
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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/v1/reviews/delete-review/${review._id}`);
      toast({
        variant: 'success',
        title: "Review deleted successfully"
      });
      setIsLoading(false);
      // setDeleteConfirmationOpen(false);
      handleCloseDeleteConfirmation();
      handleClose();
    } catch (error) {
      console.error("Error deleting review", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className={style.modal}>
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div>
                  {!showEditTextArea && (
                    <>
                      <div className={style["full-comment"]}>
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
                                <Avatar
                                    style={{ width: "40px", height: "40px" }}
                                    {...config}
                                />
                                )} */}
                            <Avatar name={review?.user?.firstName + " " + review?.user?.lastName} size="l" />
                            <div>
                              <p className={style.commentName}>
                                {`${review?.user?.firstName || "John"} ${review?.user?.lastName || "D"
                                  }`}
                              </p>
                              <p className={style.commentDesc}>
                                {companyDetails.company.category ===
                                  "fuelPrices"
                                  ? review.vehicle &&
                                  `${review.vehicle?.year} ${review.vehicle?.make} ${review.vehicle?.model}`
                                  : review.location &&
                                  `${review.location.town}`}
                              </p>
                            </div>
                          </div>

                          <div className={style.commentTopRight}>
                            <ReactStars
                              value={review.rating}
                              activeColor="#faaf00"
                            />
                            <p>{moment(date).format("DD - MM - YYYY")}</p>
                          </div>
                        </div>
                        <p className="text-[14px] md:text-[16px] text-left">
                          {review.review}
                        </p>

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
                      </div>

                      <div className={style.commentControls}>
                        <div
                          className={style.controlButton}
                          onClick={handleUpVote}
                        >
                          <Thumb up />
                          <p className={style["vote-count"]}>
                            {review.upVote === 0 ? "" : review.upVote}
                          </p>
                        </div>
                        <div
                          className={style.controlButton}
                          onClick={handleDownVote}
                        >
                          <Thumb />
                          <p className={style["vote-count"]}>
                            {review.downVote === 0 ? "" : review.downVote}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {showTextArea && (
                    <div className={style["reply-text-area"]}>
                      <textarea
                        value={reviewReply}
                        onChange={({ target: { value } }) =>
                          setReviewReply(value)
                        }
                      ></textarea>
                    </div>
                  )}
                  {showEditTextArea && (
                    <div>
                      <ReviewModal
                        companyDetails={companyDetails}
                        user={user}
                        reviews={[review]}
                        value={value}
                        setValue={setValue}
                        open={open}
                        setOpen={setShowEditTextArea}
                        handleClose={handleClose}
                        setReviews={setReviews}
                      />
                    </div>
                  )}
                  {currentUserReview &&
                    (showEditTextArea ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "15px",
                          gap: 10,
                        }}
                      ></div>
                    ) : (
                      <div className={style["fullComment-button-section"]}>
                        <CiEdit onClick={() => setShowEditTextArea(true)} />
                        <CiTrash
                          onClick={() => handleOpenDeleteConfirmation()}
                        />
                      </div>
                    ))}
                  {/* {role === "verifiedUser" && (
                        <div className={style["fullComment-button-section"]}>
                        {showTextArea ? (
                            <div>
                            <button
                                onClick={() => setShowTextArea(false)}
                                className={style["reply-section-btn"]}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReply}
                                style={
                                isLoading
                                    ? {
                                        background: "#1896fe",
                                    }
                                    : {}
                                }
                                className={`subscribed submitButton ${
                                isLoading ? "loading" : ""
                                }`}
                            >
                                {isLoading ? "" : "Submit"}
                            </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowTextArea(true)}
                                className={style["reply-section-btn"]}
                            >
                            Reply
                            </button>
                        )}
                        </div>
                    )} */}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog
          open={deleteConfirmationOpen}
          onOpenChange={handleCloseDeleteConfirmation}
        >
          <DialogContent className="max-w-72">
            <div className="flex flex-col items-center">
              <SlClose
                style={{ color: "red", fontSize: "40px", alignItems: "center" }}
              />
              <p className="mt-2 text-lg font-semibold leading-none tracking-tight">
                Are you sure?
              </p>
              <p className="mt-2 text-center text-[#727272]">
                Do you really want to delete review?
              </p>
              <div className="mt-3">
                <Button
                  className="rounded-full w-44"
                  onClick={handleDelete}
                  variant="destructive"
                >
                  {isLoading ? (
                    <SpinnerCircular
                      size={24}
                      thickness={200}
                      color="white"
                      className="mr-2"
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
              <div className="mt-3">
                <DialogClose>Cancel</DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
};

export default FullComment;
