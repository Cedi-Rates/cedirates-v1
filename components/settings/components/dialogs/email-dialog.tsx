"use client";
import React, { useContext, useEffect } from "react";
import style from "../../../assets/styles/settings.module.css";
import {
  MdOutlineChevronRight,
  MdOutlinePersonAddAlt,
  MdOutlineCake,
  MdPersonOutline,
} from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { UserDetailsType } from "@/utils/types";
import DOMPurify from "dompurify";
import axios from "axios";
import urlManager from "@/utils/urlManager";
import { redirect } from "next/navigation";
import { UserContext } from "../../SettingsPage";
import { RiCloseCircleFill } from "react-icons/ri";

const EmailDialog = ({
  open,
  handleClose,
  setInfoFunc,
}: {
  open: boolean;
  handleClose: any;
  setInfoFunc: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsType>();

  const formData = watch();

  const user = useContext(UserContext);
  const watchEmail = watch("email");

  if (!user.email) {
    urlManager.setRedirectUrl();
    redirect("/login");
  }

  useEffect(() => {
    if (user) {
      // console.log('Fetched Data', user);

      const {
        firstName,
        lastName,
        UniqueID,
        whatsappNumber,
        email,
        gender,
        birthday,
        typeOfDriver,
        homeLocation,
        otherLocation,
        vehicle,
      } = user;

      const formattedBirthday = birthday
        ? new Date(birthday).toISOString().slice(0, 10)
        : "";
      setValue("firstName", firstName || "");
      setValue("lastName", lastName || "");
      const name = `${firstName || ""} ${lastName || ""}`;
      if (
        typeof localStorage !== "undefined" &&
        name !== localStorage.getItem("name")
      ) {
        localStorage.setItem("name", name);
      }
      setValue("uniqueId", UniqueID);
      setValue("whatsappNumber", whatsappNumber);
      setValue("email", email);
      setValue("gender", gender);
      setValue("birthday", formattedBirthday);
      setValue("homeLocation.region", homeLocation?.region);
      setValue("homeLocation.town", homeLocation?.town);
      setValue("otherLocation.region", otherLocation?.region);
      setValue("otherLocation.town", otherLocation?.town);
      setValue("vehicle.year", vehicle?.year);
      setValue("vehicle.make", vehicle?.make);
      setValue("vehicle.model", vehicle?.model);
      setValue("typeOfDriver", typeOfDriver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setInfoFunc(watchEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchEmail]);

  return (
    // <div className="absolute">
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="md:max-w-md m-auto p-5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-left my-2 mt-0 text-[#4f4f4f] text-[20px] leading-6">
            Where can we email you?
          </DialogTitle>
          {/* <div
            onClick={(e) => {
              e.stopPropagation();
              handleClose(false);
            }}
          >
            <RiCloseCircleFill
              color="#01010122"
              size={25}
              className="cursor-pointer"
            />
          </div> */}
        </DialogHeader>
        <DialogDescription>
          <div className="grid w-full items-center gap-2">
            <Label
              className="text-left text-[15px] text-[#4f4f4f]"
              htmlFor="firstname"
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="text-[#4f4f4f] text-base"
              disabled
            />
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleClose}
            type="submit"
            className="w-full my-5"
            disabled={isSubmitting || !formData.email}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Close"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // </div>
  );
};

export default EmailDialog;
