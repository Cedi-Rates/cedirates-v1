"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command-alt";
import { cn } from "@/lib/utils";
import { fetchLocation } from "@/utils/fetchLocation";
import { ChevronsUpDown, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { UserDetailsType } from "@/utils/types";
import DOMPurify from "dompurify";
import axios from "axios";
import urlManager from "@/utils/urlManager";
import { redirect } from "next/navigation";
import { UserContext } from "../../SettingsPage";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "../../../../assets/styles/settings.module.css";

const OtherDialog = ({
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

  const form = useForm();

  const [openLocationRegion, setOpenLocationRegion] = useState(false);
  const [openLocationTown, setOpenLocationTown] = useState(false);

  const user = useContext(UserContext);
  const watchTown = watch("otherLocation.town");
  const watchRegion = watch("otherLocation.region");

  if (!user.email) {
    urlManager.setRedirectUrl();
    redirect("/login");
  }

  const {
    regions,
    towns,
    selectedOtherRegion,
    selectedOtherTown,
    handleOtherRegionSelect,
    handleOtherTownSelect,
  } = fetchLocation();

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
    setInfoFunc(watchTown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTown]);

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
        const res = await axios.patch(
          "/api/v1/users/update-user",
          filteredObject
        );
        if (res) {
          toast.success("Chale nice one! Profile updated 🥳");
          handleClose(); // Close the modal only after successful submission
        }
      } catch (err) {
        console.error(err);
        toast.error("Yie! Something went wrong — Abeg try again.");
      }
    } else {
      toast.error("Your First and Last Name is Required.");
    }
  };
  return (
    // <div className="absolute">
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md mx-auto p-5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-left text-[#4f4f4f] text-[20px] leading-6">
            Where do you stay?
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
        <div className={style.homeDialog}></div>
        <div className="scroll-smooth">
          {/* Other Region */}
          <Popover
            open={openLocationRegion}
            onOpenChange={setOpenLocationRegion}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between mt-5 rounded-radius-md border border-[#e5e5e5] font-normal text-[14px]"
                )}
              >
                {selectedOtherRegion
                  ? regions.find(
                      (region) => region.name === selectedOtherRegion
                    )?.name ?? "Select region..."
                  : "Select region..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] z-[999] min-h-72"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput placeholder="Search region..." />
                <CommandList>
                  <CommandEmpty>No region found.</CommandEmpty>
                  <CommandGroup>
                    {regions.map((region, index) => (
                      <CommandItem
                        key={index}
                        value={region.name}
                        onSelect={() => {
                          handleOtherRegionSelect(region.name);
                          setOpenLocationRegion(false);
                          setValue("otherLocation.region", region.name);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedOtherRegion === region.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {region.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* Other Town */}
          <Popover open={openLocationTown} onOpenChange={setOpenLocationTown}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between mt-5 rounded-radius-md border border-[#e5e5e5] font-normal text-[14px]"
                )}
              >
                {selectedOtherTown
                  ? towns.find((town) => town.name === selectedOtherTown)
                      ?.name ?? "Select town..."
                  : "Select town..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] z-[999] min-h-72"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput placeholder="Search town..." />
                <CommandList>
                  <CommandEmpty>No town found.</CommandEmpty>
                  <CommandGroup>
                    {towns.map((town, index) => (
                      <CommandItem
                        key={index}
                        value={town.name}
                        onSelect={() => {
                          handleOtherTownSelect(town.name);
                          setOpenLocationTown(false);
                          setValue("otherLocation.town", town.name);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedOtherTown === town.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {town.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full my-5"
            disabled={
              isSubmitting || !(selectedOtherRegion && selectedOtherTown)
            }
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
    // </div>
  );
};

export default OtherDialog;
