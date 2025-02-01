"use client";
import React, { useContext, useEffect } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

const NameDialog = ({
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

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

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

  function removeEmptyValues(obj: any): any {
    const newObj: any = {};
    for (const key in obj) {
      if (obj[key] !== "" && obj[key] !== undefined) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          const nestedObj = removeEmptyValues(obj[key]);
          if (Object.keys(nestedObj).length !== 0) {
            newObj[key] = nestedObj;
          }
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

  useEffect(() => {
    setInfoFunc({
      firstName: watchFirstName,
      lastName: watchLastName,
    });
  }, [watchFirstName, watchLastName]);

  const onSubmit = async (data: UserDetailsType) => {
    const cleanData: Record<string, string> = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (typeof value === "string") {
        cleanData[key] = DOMPurify.sanitize(value);
      }
    });

    if (data.firstName && data.lastName) {
      const filteredObject = removeEmptyValues({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthday: data.birthday,
        whatsappNumber: data.whatsappNumber,
        otherLocation: {
          region: data.otherLocation.region,
          town: data.otherLocation.town,
        },
        homeLocation: {
          region: data.homeLocation.region,
          town: data.homeLocation.town,
        },
        gender: data.gender,
        vehicle: {
          year: data.vehicle.year,
          make: data.vehicle.make,
          model: data.vehicle.model,
        },
        typeOfDriver: data.typeOfDriver,
      });

      try {
        // console.log("Submitted Data:", data);
        await axios.patch("/api/v1/users/update-user", filteredObject);
        toast.success("Chale nice one! Profile updated 🥳");
        handleClose();
      } catch (err) {
        console.error(err);
        toast.error("Yie! Something went wrong — Abeg try again.");
      }
    } else {
      toast.error("Your First and Last Name is Required.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="md:max-w-md m-auto p-5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-left my-2 text-[#4f4f4f] text-[20px] leading-6">
            What is your full name?
          </DialogTitle>
          {/* <div
            onClick={(e) => {
              e.stopPropagation();
              handleClose(false);
            }}
          >
            <RiCloseCircleFill
              color="#00000023"
              size={25}
              className="cursor-pointer"
            />
          </div> */}
        </DialogHeader>{" "}
        <DialogDescription>
          <div className="grid w-full items-center gap-2 mb-5">
            <Label
              className="text-left text-[15px] text-[#4f4f4f]"
              htmlFor="firstname"
            >
              First Name
            </Label>
            <Input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className="text-[#4f4f4f] text-base"
              id="firstname"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label
              className="text-left text-[15px] text-[#4f4f4f]"
              htmlFor="lastname"
            >
              Last Name
            </Label>
            <Input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="text-base text-[#4f4f4f]"
              id="lastname"
            />
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full my-5"
            disabled={isSubmitting || !formData.firstName || !formData.lastName}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save and Close"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NameDialog;
