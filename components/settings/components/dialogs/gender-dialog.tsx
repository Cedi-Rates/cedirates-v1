"use client";
import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import style from "../../../../assets/styles/settings.module.css";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { UserDetailsType } from "@/utils/types";
import DOMPurify from "dompurify";
import axios from "axios";
import { UserContext } from "../../SettingsPage";
import { RiCloseCircleFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";

const GenderDialog = ({
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
  const watchGender = watch("gender");

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
    setInfoFunc(watchGender);
  }, [user, watchGender]);

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
    <div className="relative">
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-md m-auto p-5"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="flex flex-row justify-between">
            <DialogTitle className="text-left my-2 mt-0 text-[#4f4f4f] text-[20px] leading-6">
              What sex are you?
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
          </DialogHeader>
          <DialogDescription>
            <div className="flex justify-center items-center gap-10 select-none">
              <label className="ml-0 w-1/2">
                <Input
                  className={style.radioInput}
                  type="radio"
                  value="male"
                  {...register("gender")}
                />
                <span className={style.radioTile}>
                  <span className={style.radioIcon}>👨🏽</span>
                  <span className={style.radioLabel}>Male</span>
                </span>
              </label>
              <label className="mr-0 w-1/2">
                <Input
                  className={style.radioInput}
                  type="radio"
                  value="female"
                  {...register("gender")}
                />
                <span className={style.radioTile}>
                  <span className={style.radioIcon}>👩🏽</span>
                  <span className={style.radioLabel}>Female</span>
                </span>
              </label>
            </div>
          </DialogDescription>
          <Button
            className="w-full mx-auto my-5"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            disabled={isSubmitting || !formData.gender}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save and Close"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenderDialog;
