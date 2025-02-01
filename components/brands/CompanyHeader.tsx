"use client";

import React, { useEffect, useState } from "react";
import { CompleteCompanyDetailsType, UserDetailsType } from "@/utils/types";
import style from "../../assets/styles/company.module.css";
import Image from "next/image";
import { FaFacebook, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import BellSVGComponent from "../../assets/svgs/BellSVGComponent";
import { PremiumIcon } from "@/assets/Icons";
import { addToWatchList } from "@/utils/helpers/api";
import { SpinnerCircular } from "spinners-react";
import ColorThief from "colorthief";
import { getBase64ImageFromUrl } from "@/utils/helpers/helperfunctions";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsGlobe, BsInstagram, BsTwitterX } from "react-icons/bs";
import urlManager from "@/utils/urlManager";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import BadgeIcon from "../ui/avatarIcons/badge";
import { Globe, LucidePhone } from "lucide-react";

const Dialog = dynamic(() => import("../ui/dialog").then((mod) => mod.Dialog), {
  ssr: false,
});
const DialogClose = dynamic(
  () => import("../ui/dialog").then((mod) => mod.DialogClose),
  { ssr: false }
);
const DialogContent = dynamic(
  () => import("../ui/dialog").then((mod) => mod.DialogContent),
  { ssr: false }
);

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  chartData: any;
};

const CompanyHeader = ({
  companyDetails, user, chartData
}: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(
    companyDetails?.subscriberCount
  );
  const [gradientColors, setGradientColors] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(user);
  const [companyBio, setCompanyBio] = useState("");
  const isCompanyBio = companyDetails?.company?.bio;
  const { push, replace } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  // const getCompany = async () => {
  //   const response = await axios.get(
  //     `${process.env.BASE_URL}/company/getall/aboki`
  //   );

  //   console.log(response);
  // };

  // useEffect(() => {
  //   const fetchCompany = async () => await getCompany();
  //   fetchCompany();
  // }, []);

  // console.log(userDetails, companyDetails);

  const handleSubscribe = async () => {
    if (userDetails && userDetails?.watchList) {
      try {
        if (userDetails.watchList.includes(companyDetails?.company?.UniqueID)) {
          setUserDetails({
            ...userDetails,
            watchList: userDetails.watchList?.filter(
              (item) => item !== companyDetails?.company?.UniqueID
            ),
          });
          setSubscriberCount((prev) => (Number(prev) - 1).toString());
          setOpen(false);
          toast({
            variant: 'destructive',
            title: `You’re no longer subscribed to ${companyDetails?.company?.companyName}`
          });
        } else {
          setUserDetails({
            ...userDetails,
            watchList: [
              ...userDetails?.watchList,
              companyDetails?.company?.UniqueID,
            ],
          });
          setSubscriberCount((prev) => (Number(prev) + 1).toString());
          toast({
            variant: 'success',
            title: `You’re now subscribed to ${companyDetails?.company?.companyName}`
          });
        }
        await addToWatchList(
          process.env.BASE_URL!,
          companyDetails?.company?.UniqueID
        );
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: error?.response.data.msg
        });
      }
    } else {
      urlManager.setRedirectUrl()
      push('/signup')
    }
  };

  useEffect(() => {
    const getCompanyColorsFunc = async () => {
      if (companyDetails && companyDetails?.company?.image) {
        if (!companyDetails?.company?.bannerGradient) {
          try {
            const base64Image = await getBase64ImageFromUrl(
              companyDetails.company.image
            );
            const img = new window.Image();
            img.crossOrigin = "Anonymous";
            // img.src = localImage.src;
            img.src = base64Image;

            img.onload = async () => {
              const colorThief = new ColorThief();
              const dominantColor = colorThief.getColor(img);
              const palette = colorThief.getPalette(img, 2);

              if (palette.length >= 2) {
                const gradient = `linear-gradient(90deg, rgb(${palette[0].join(
                  ","
                )}), rgb(${palette[1].join(",")},75%))`;

                setGradientColors(gradient);

                const endpoint = `/api/v1/company/update-bannerGradient/${companyDetails.company._id}`;
                await axios.patch(endpoint, {
                  bannerGradient: gradient,
                });
              }
            };
          } catch (error) {
            console.error("Error extracting colors:", error);
          }
        } else {
          setGradientColors(companyDetails?.company?.bannerGradient);
        }
      }
    };

    getCompanyColorsFunc();
  }, [companyDetails]);

  useEffect(() => {
    if (isCompanyBio) {
      setCompanyBio(companyDetails?.company.bio);
    }
  }, [companyDetails?.company?.bio, isCompanyBio]);

  useEffect(() => {
    setSubscriberCount(chartData?.subscriberCount);
  }, [chartData]);

  return (
    <div>
      <div className={style.banner}>
        {companyDetails?.company?.banner ? (
          <Image
            src={companyDetails?.company?.banner}
            alt={`${companyDetails.company?.companyName}-logo`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
          />
        ) : (
          <div
            className={style["banner-overlay"]}
            style={{ background: gradientColors }}
          ></div>
        )}
      </div>
      <div className={style["profile-info"]}>
        <div className={style["profile-picture"]}>
          <Image
            src={companyDetails.company?.image}
            alt={`${companyDetails.company?.companyName}-logo`}
            width={120}
            height={120}
            priority
          // loading="lazy"
          />
        </div>
        <div className={style["profile-container"]}>
          <div className={style["profile-info-text-up"]}>
            <div className={style["company-name-container"]}>
              <h3 className="text-paragraph-lg-semibold !leading-[17px]">{companyDetails.company?.companyName}</h3>
              {companyDetails.company?.verified && (
                <span>
                  {/* <PremiumIcon /> */}
                  <BadgeIcon fixed size='m' />
                </span>
              )}
               <div className='text-paragraph-sm-semibold bg-backgroundInfo text-primary-brand-primary-500 !py-1 !px-2.5 rounded-lg !leading-[16px] w-max'>
              {subscriberCount} Subscribers
              {/* {companyDetails?.subscriberCount} Subscribers */}
            </div>
            </div>
            <div className={style["desc-text"] + ' !text-paragraph-sm-regular font-normal mt-1 mb-3.5'}>{companyBio}</div>
            <div className="flex flex-row gap-2.5 text-icon-icon-secondary">
              <FaFacebook size={18} />
              <BsTwitterX size={18} />
              <BsInstagram size={18} />
              <Globe size={18} />
              <LucidePhone size={18} />
            </div>
          </div>
          <div className={style["subscribe-section"]}>
            <div className={style["subscribe-button"]}>
              {userDetails?.watchList?.includes(
                companyDetails?.company?.UniqueID
              ) ? (
                <Button
                  className="bg-white text-black border-[1px] border-primary rounded-lg w-[10rem] flex space-x-2 hover:bg-white"
                  onClick={() => setOpen(true)}
                >
                  {loading ? (
                    <SpinnerCircular
                      size={24}
                      thickness={200}
                      color="white"
                      className="mr-2"
                    />
                  ) : (
                    <>
                      <BellSVGComponent /> <span>Subscribed</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  className="text-white rounded-lg !text-paragraph-sm-medium !px-5"
                  onClick={handleSubscribe}
                >
                  {loading ? (
                    <SpinnerCircular
                      size={24}
                      thickness={200}
                      color="white"
                      className="mr-2"
                    />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="max-w-full md:max-w-72">
          <div className="flex flex-col items-center">
            <p className="mt-2 text-md font-semibold leading-none tracking-tight">
              Unsubscribe from {companyDetails?.company?.companyName}?
            </p>
            <p className="my-3 text-center text-[#727272]">
              You will no longer receive updates sent to subscribers.
            </p>
            <div className="mt-3">
              <Button
                className="rounded-lg w-44 bg-[#fe4218]"
                onClick={handleSubscribe}
                variant="destructive"
              >
                {loading ? (
                  <SpinnerCircular
                    size={24}
                    thickness={200}
                    color="white"
                    className="mr-2"
                  />
                ) : (
                  "Unsubscribe"
                )}
              </Button>
            </div>
            <div className="mt-3">
              <DialogClose>Cancel</DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className={style["profile-info-text-down"]}>
        <div className={style["company-name-container"] + ' text-start !justify-start mt-2'}>
          {companyDetails.company?.companyName}
        </div>
        <div className={style["subscriber-count"]}>
          {/* {companyDetails.subscriberCount} subscribers */}
          {`${subscriberCount} ${Number(subscriberCount) === 1 ? "subscriber" : "subscribers"
            }`}
        </div>
        <div className={style["desc-text"]}>{companyBio}</div>
      </div>
    </div>
  );
};

export default CompanyHeader;
