"use client";

import React, { useEffect, useState } from "react";
import {
  CompleteCompanyDetailsType,
  TagType,
  UserDetailsType,
} from "@/utils/types";
import style from "../../assets/styles/company.module.css";
import Image from "next/image";
import { FaFacebook, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import BellSVGComponent from "../../assets/svgs/BellSVGComponent";
import { PremiumIcon } from "@/assets/Icons";
import { addToWatchList } from "@/utils/helpers/api";
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SpinnerCircular } from "spinners-react";
import ColorThief from "colorthief";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBase64ImageFromUrl } from "@/utils/helpers/helperfunctions";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsGlobe, BsInstagram, BsTwitterX } from "react-icons/bs";
import urlManager from "@/utils/urlManager";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  BadgeCheck,
  ChevronDown,
  Globe,
  LinkIcon,
  LucidePhone,
  X,
} from "lucide-react";
import { companyIcons, iconColors } from "../Icons/companyIcon";
import TagTooltip from "../ui/tag-tooltip";
import { AnimatedSubscribeButton } from "./components/animated-button";

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

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  chartData: any;
};

const CompanyHeader = ({ companyDetails, user, chartData }: Props) => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
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

  const handleNavigation = () => {
    const subCategory = companyDetails.company.subCategory ?? "OMC";

    const routes: Record<string, string> = {
      "Commercial Bank": "/exchange-rates/usd-to-ghs/banks/",
      "Central Bank": "/exchange-rates/usd-to-ghs/banks/",
      "Forex Bureau": "/exchange-rates/usd-to-ghs/forex-bureaus/",
      "Payment Processor": "/exchange-rates/usd-to-ghs/card-payments/",
      "Money Transfer": "/exchange-rates/usd-to-ghs/money-transfer/",
      "Crypto Exchange": "/exchange-rates/usd-to-ghs/crypto/",
      Fintech: "/exchange-rates/usd-to-ghs/fintech/",
    };

    const destination = routes[subCategory] || "/exchange-rates/usd-to-ghs/";
    push(destination);
    // Open in a new tab
    // window.open(destination, "_blank");
  };

  const handleFollow = async () => {
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
            variant: "destructive",
            title: `You’re no longer following ${companyDetails?.company?.companyName}`,
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
            variant: "success",
            title: `You’re now following ${companyDetails?.company?.companyName}`,
          });
        }
        await addToWatchList(
          process.env.BASE_URL!,
          companyDetails?.company?.UniqueID
        );
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error?.response.data.msg,
        });
      }
    } else {
      urlManager.setRedirectUrl();
      push("/signup");
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

  const ContactContent = () => (
    <>
      <div className="space-y-3">
        <div className="space-y-1 pl-3">
          <h3
            className={`${
              isMobile
                ? "text-paragraph-md-semibold"
                : "text-paragraph-lg-semibold"
            } font-medium`}
          >
            WhatsApp
          </h3>
          <p
            className={`${
              isMobile ? "text-paragraph-md-medium" : "text-paragraph-lg-medium"
            } text-text-text-quarternary`}
          >
            {companyDetails.company.phone}
          </p>
        </div>
        <div className="space-y-1 border-t pt-3 pl-3">
          <h3
            className={`${
              isMobile
                ? "text-paragraph-md-semibold"
                : "text-paragraph-lg-semibold"
            } font-medium`}
          >
            Call
          </h3>
          <p
            className={`${
              isMobile ? "text-paragraph-md-medium" : "text-paragraph-lg-medium"
            } text-text-text-quarternary`}
          >
            {companyDetails.company.phone}
          </p>
        </div>
      </div>
    </>
  );

  const TooltipIcon = () => (
    <>
      {companyDetails?.company?.tagsType &&
        Object.entries(companyIcons).map(([key, Icon]) => {
          const tagData = companyDetails.company.tagsType[key as keyof TagType];
          if (!tagData || !tagData.note || !tagData.status) return null;
          // if (key === "newListing" && tagData.date) {
          //   const listingDate = new Date(tagData.date);
          //   const currentDate = new Date();
          //   const diffDays =
          //     (currentDate.getTime() - listingDate.getTime()) /
          //     (1000 * 60 * 60 * 24);

          //   if (diffDays > 7) return null;
          // }
          return (
            <TagTooltip
              key={key}
              icon={
                <Icon className="w-[18px] h-[18px]" color={iconColors[key]} />
              }
              content={tagData.note}
            />
          );
        })}
    </>
  );

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
      <div className={style["profile-info"] + " !mr-0 !pr-0"}>
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
        <div
          className={style["profile-container"] + " !-mt-8 min-[1000px]:!mt-12"}
        >
          <div className={style["profile-info-text-up"]}>
            <div
              className={
                "!justify-center sm:!justify-start mb-1 " +
                style["company-name-container"]
              }
            >
              <h2 className="text-paragraph-lg-semibold !leading-[17px]">
                {companyDetails.company?.companyName}
              </h2>
              {companyDetails.company?.verified && (
                <span>
                  <BadgeCheck className="text-[#1896FE] w-[14px] h-[14px] flex-shrink-0" />
                </span>
              )}
              <div className="flex items-center gap-1">
                <TooltipIcon />
              </div>
              <div className="text-paragraph-sm-semibold bg-backgroundInfo text-primary-brand-primary-500 !py-1 !px-2.5 rounded-lg !leading-[16px] w-max">
                {subscriberCount} Followers
              </div>
              <div
                className="text-paragraph-sm-semibold bg-background-bg-quarternary text-text-text-secondary !py-1 !px-2.5 rounded-lg !leading-[16px] w-max cursor-pointer"
                onClick={handleNavigation}
              >
                {companyDetails.company.subCategory ?? "OMC"}
              </div>
            </div>
            <div
              className={
                style["desc-text"] +
                " !text-paragraph-sm-regular font-normal mt-1 mb-1.5"
              }
            >
              {companyBio}
            </div>
            {companyDetails?.company?.link && (
              <Link
                href={companyDetails?.company?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit flex-row items-center gap-1 text-text-text-brand"
              >
                <LinkIcon size={18} />
                <span className="text-paragraph-sm-semibold">
                  {
                    companyDetails?.company?.link
                      .replace(/^(https?:\/\/)?(www\.)?/, "")
                      .replace(/\/$/, "")
                      .split("/")[0]
                  }
                </span>
              </Link>
            )}
          </div>
          <div className={style["subscribe-section"]}>
            <div className="flex flex-row items-start justify-end gap-1 sm:gap-2">
              {userDetails?.watchList?.includes(
                companyDetails?.company?.UniqueID
              ) ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {isMobile ? (
                      <Button
                        onClick={() => setOpen(true)}
                        variant="secondary"
                        trailing={
                          <ChevronDown className="w-4 h-4" color="#0A0A0A" />
                        }
                        size="sm"
                        className="!text-caption-md-semibold !text-black !px-3 !h-6"
                      >
                        {loading ? (
                          <SpinnerCircular
                            size={24}
                            thickness={200}
                            color="white"
                            className="mr-2"
                          />
                        ) : (
                          <span className="">Following</span>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="text-black sm:rounded-lg !h-6 rounded-[7px] !text-paragraph-sm-medium !px-5 !bg-background-bg-secondary"
                        onClick={() => setOpen(true)}
                        variant="secondary"
                        size="lg"
                        trailing={
                          <ChevronDown className="w-4 h-4" color="#0A0A0A" />
                        }
                      >
                        {loading ? (
                          <SpinnerCircular
                            size={24}
                            thickness={200}
                            color="white"
                            className="mr-2"
                          />
                        ) : (
                          <span className="">Following</span>
                        )}
                      </Button>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl">
                    <DropdownMenuItem className="rounded-lg">
                      Turn On Alerts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:!text-text-text-error text-text-text-error rounded-lg"
                      onClick={handleFollow}
                    >
                      Unfollow
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isMobile ? (
                <Button
                  onClick={handleFollow}
                  size="sm"
                  style={{ color: "#fff" }}
                  className="!text-caption-md-semibold !px-3 !h-6"
                >
                  {loading ? (
                    <SpinnerCircular
                      size={24}
                      thickness={200}
                      color="white"
                      className="mr-2"
                    />
                  ) : (
                    "Follow"
                  )}
                </Button>
              ) : (
                <Button
                  className="text-white sm:rounded-lg !h-6 rounded-[7px] !text-paragraph-sm-medium !px-5"
                  onClick={handleFollow}
                  size="lg"
                >
                  {loading ? (
                    <SpinnerCircular
                      size={24}
                      thickness={200}
                      color="white"
                      className="mr-2"
                    />
                  ) : (
                    "Follow"
                  )}
                </Button>
              )}

              {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      className="!text-caption-md-semibold !px-3 sm:rounded-lg !h-6 rounded-[7px] !bg-background-bg-secondary"
                      variant="secondary"
                      size="sm"
                    >
                      Contact
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="px-6 pb-6">
                    <DrawerHeader className="relative mb-3 flex flex-row justify-between items-center">
                      <DrawerTitle className="text-paragraph-lg-semibold font-semibold sm:rounded-lg sm:h-auto !h-6 rounded-[7px]">
                        Contact
                      </DrawerTitle>
                      <Button
                        variant="ghost"
                        className="!p-2 bg-background-bg-secondary !h-min"
                        onClick={() => setOpen(false)}
                      >
                        <X className="h-4 w-4 text-black" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </DrawerHeader>
                    <ContactContent />
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="!text-paragraph-sm-medium sm:rounded-lg !h-6 rounded-[7px] !px-5 !bg-background-bg-secondary"
                      variant="secondary"
                      size="lg"
                    >
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] !rounded-2xl p-6">
                    <DialogHeader className="relative mb-3">
                      <DialogTitle className="text-header-h6-semibold font-semibold">
                        Contact
                      </DialogTitle>
                    </DialogHeader>
                    <ContactContent />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style["profile-info-text-down"] + " mt-9"}>
        <div
          className={
            style["company-name-container"] +
            " text-start !justify-start items-center mb-1"
          }
        >
          <h2>{companyDetails.company?.companyName}</h2>
          {companyDetails.company?.verified && (
            <span>
              <BadgeCheck className="text-[#1896FE] w-[14px] h-[14px] flex-shrink-0" />
            </span>
          )}
          <div className="flex items-center gap-1">
            <TooltipIcon />
          </div>
          <div className="text-caption-sm-semibold tracking-normal bg-backgroundInfo text-primary-brand-primary-500 !py-0 !px-2.5 rounded-[5px] w-max">
            {subscriberCount} Followers
          </div>
          <div
            className="text-caption-sm-semibold tracking-normal bg-background-bg-quarternary text-text-text-secondary !py-0 !px-2.5 rounded-[5px] w-max cursor-pointer"
            onClick={handleNavigation}
          >
            {companyDetails.company.subCategory ?? "OMC"}
          </div>
        </div>
        <div className={style["desc-text"]}>{companyBio}</div>
        {companyDetails?.company?.link && (
          <Link
            href={companyDetails?.company?.link}
            className="pt-2 flex flex-row items-center gap-1 text-text-text-brand w-fit"
          >
            <LinkIcon size={18} />
            <span className="text-paragraph-sm-semibold">
              {
                companyDetails?.company?.link
                  .replace(/^(https?:\/\/)?(www\.)?/, "")
                  .replace(/\/$/, "")
                  .split("/")[0]
              }
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CompanyHeader;
