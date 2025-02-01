"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
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
import { useFetchVehicles } from "@/utils/fetchVehicles";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "../../../../assets/styles/settings.module.css";
import { getUserClient } from "@/utils/helpers/api";

const VehicleDialog = ({
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

  const [openYear, setOpenYear] = useState(false);
  const [openMake, setOpenMake] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const user = useContext(UserContext);
  const watchYear = watch("vehicle.year");
  const watchMake = watch("vehicle.make");
  const watchModel = watch("vehicle.model");

  if (!user.email) {
    urlManager.setRedirectUrl();
    redirect("/login");
  }

  const {
    years,
    makes,
    modelsArray,
    selectedYear,
    selectedMake,
    selectedModel,
    handleYear,
    handleMake,
    handleModel,
  } = useFetchVehicles();

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
      year: watchYear,
      make: watchMake,
      model: watchModel,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchYear, watchMake, watchModel]);

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
      <DialogContent className="max-w-md m-auto p-5">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-left my-2 mt-0 text-[#4f4f4f] text-[20px] leading-6">
            Add your main car
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
        <div className="scroll-smooth">
          {/* Vehicle Year */}
          <Popover open={openYear} onOpenChange={setOpenYear}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between mt-5 rounded-radius-md border border-[#e5e5e5] font-normal text-[14px]"
                )}
              >
                {selectedYear
                  ? years.find(
                      (year) => year.toString() === selectedYear.toString()
                    )
                  : "Select year..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] z-[999] min-h-72"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput placeholder="Search year..." />
                <CommandList>
                  <CommandEmpty>No year found.</CommandEmpty>
                  <CommandGroup>
                    {years
                      ?.sort((a, b) => b - a)
                      .map((year) => (
                        <CommandItem
                          key={year}
                          value={year.toString()}
                          onSelect={() => {
                            handleYear(year);
                            setOpenYear(false);
                            setValue("vehicle.year", year);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedYear === year
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {year}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* Vehicle Make */}
          <Popover open={openMake} onOpenChange={setOpenMake}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between mt-5 rounded-radius-md border border-[#e5e5e5] font-normal text-[14px]"
                )}
              >
                {selectedMake
                  ? makes.find((make) => make === selectedMake)
                  : "Select make..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] min-h-72"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput placeholder="Search make..." />
                <CommandList>
                  <CommandEmpty>No make found.</CommandEmpty>
                  <CommandGroup>
                    {makes.map((make) => (
                      <CommandItem
                        key={make}
                        value={make}
                        onSelect={() => {
                          handleMake(make);
                          setOpenMake(false);
                          setValue("vehicle.make", make);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMake === make ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {make}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* Vehicle Model */}
          <Popover open={openModel} onOpenChange={setOpenModel}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between mt-5 rounded-radius-md border border-[#e5e5e5] font-normal text-[14px]"
                )}
              >
                {selectedModel
                  ? modelsArray.find((model) => model.label === selectedModel)
                      ?.label ?? "Select model..."
                  : "Select model..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] min-h-72"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput placeholder="Search model..." />
                <CommandList>
                  <CommandEmpty>No model found.</CommandEmpty>
                  <CommandGroup>
                    {modelsArray.map((model) => (
                      <CommandItem
                        key={model.value}
                        value={model.label}
                        onSelect={() => {
                          handleModel(model.label);
                          setOpenModel(false);
                          setValue("vehicle.model", model.label);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMake === model.label
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {model.label}
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
              isSubmitting || !(selectedYear && selectedMake && selectedModel)
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

export default VehicleDialog;
