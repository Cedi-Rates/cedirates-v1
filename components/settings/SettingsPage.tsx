"use client";
import React, { createContext, useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import ClipboardCopy from "@/utils/copyButton";
import { Form } from "@/components/ui/form";
import { UserDetailsType } from "@/utils/types";
import { Avatar } from "@/components/ui/avatar";
import { RWebShare } from "react-web-share";
import urlManager from "@/utils/urlManager";
import { redirect, useRouter } from "next/navigation";
import PersonalDetails from "./components/personal-details";
import ContactDetails from "./components/contact-details";
import LocationDetails from "./components/location-details";
import VehicleDetails from "./components/vehicle-details";
import { getUserClient } from "@/utils/helpers/api";

type Props = {
  user: UserDetailsType;
};
export const UserContext = createContext<null | any>(null);

const SettingsPage = ({ user }: Props) => {
  const [referralLink, setReferralLink] = useState("");
  const [reflink, setRefLink] = useState("");
  const {} = useForm<UserDetailsType>();
  const form = useForm();
  const router = useRouter();

  if (!user.email) {
    urlManager.setRedirectUrl();
    redirect("/login");
  }

  useEffect(() => {
    const generateReferralLink = async () => {
      try {
        const referralId = user.UniqueID;
        const reflink = `cedirates.com/signup?ref=${referralId}`;
        const link = `/signup?ref=${referralId}`;
        setReferralLink(reflink);
        setRefLink(link);
        localStorage.setItem("referralLink", reflink);
        localStorage.setItem("link", link);
      } catch (error) {
        console.log(error);
      }
    };
    // const getUser = async () => {
    //   const res = await getUserClient();
    //   console.log(res);
    // };

    // getUser();
    generateReferralLink();
  }, [user.UniqueID]);

  return (
    <UserContext.Provider value={user}>
      <main className="w-full h-full pb-6 px-6 md:px-28 md:pb-10">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start items-center w-full max-w-2xl m-6 gap-5">
            <button
              className="rounded-full p-1 bg-[#f2f7f8]"
              type="button"
              onClick={() => router.back()}
            >
              <MdChevronLeft className="text-[25px]" />
            </button>
            <h2 className="text-[20px] font-semibold text-[#4f4f4f]">
              Settings
            </h2>
          </div>

          <div className="flex flex-row items-start w-full max-w-2xl py-4 px-4 pb-3 rounded-t-[12px] bg-[#f2f7f899] border-0 border-b-2 border-[#fff] z-[2] relative">
            <div className="">
              <Avatar
                name={user.firstName + " " + user.lastName}
                size="l"
                indicator={user.role === "admin" ? "badge" : "none"}
              />
            </div>
            <div className="mx-3">
              <h3 className="capitalize text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                {user?.firstName} {user?.lastName}
              </h3>
              <div className="flex flex-row items-center gap-2">
                <p className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#818181]">
                  ID: {user?.UniqueID}
                </p>
                <ClipboardCopy copyText={user?.UniqueID} size={14} />
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl flex flex-col items-start py-4 px-4 pb-3 rounded-b-[12px] bg-[#f2f7f899] border-0 gap-1">
            <p className="text-[#818181] text-paragraph-sm-medium md:text-paragraph-md-medium">
              Your referral link
            </p>
            <div className="bg-[#94acff0d] p-1 w-full max-w-2xl border border-[#CdCdCd3d] rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-caption-sm-regular xs:text-caption-md-regular sm:text-caption-md-regular md:text-paragraph-sm-regular text-[#1896fe]">
                  {referralLink}
                </p>
                <RWebShare
                  data={{
                    text: "CediRates Referral Link",
                    url: reflink,
                    title: "Referral Link",
                  }}
                >
                  <Button
                    size={"sm"}
                    className="text-white text-paragraph-sm-medium"
                  >
                    Share
                  </Button>
                </RWebShare>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form className="w-full max-w-2xl">
              <div>
                <PersonalDetails />
                <ContactDetails />
                <LocationDetails />
                <VehicleDetails />
              </div>
            </form>
          </Form>
        </div>
      </main>
    </UserContext.Provider>
  );
};

export default SettingsPage;
