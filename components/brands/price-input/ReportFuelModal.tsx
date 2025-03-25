"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
  CompanyDataType,
  CompanyRate,
} from "@/utils/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdOutlineChevronRight } from "react-icons/md";
import { ChevronsUpDown, Check, Loader2, CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchLocation } from "@/utils/fetchLocation";
import { useFetchVehicles } from "@/utils/fetchVehicles";
import Image from "next/image";
import axios from "axios";
import ReactStars from "react-rating-star-with-type";
import { SpinnerCircular } from "spinners-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface AlertDialogDemoProps {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate;
}

const FuelModal: React.FC<AlertDialogDemoProps> = ({
  companyDetails,
  companyData,
}) => {
  const { toast } = useToast();
  const currentPrices = companyData?.data;
  const { register, handleSubmit, setValue } = useForm();
  const [fuelPriceData, setFuelPriceData] = useState<any>(currentPrices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFuelPriceData(currentPrices);
  }, [companyData, currentPrices]);

  const onSubmit = async (data: any) => {
    const { petrol, diesel, premium } = data;
    setLoading(true);
    try {
      const fuelObject = {
        petrol:
          !petrol || isNaN(petrol)
            ? fuelPriceData?.prices?.petrol
            : parseFloat(petrol).toFixed(4),
        diesel:
          !diesel || isNaN(diesel)
            ? fuelPriceData?.prices?.diesel
            : parseFloat(diesel).toFixed(4),
        premium:
          !premium || isNaN(premium)
            ? fuelPriceData?.prices?.premium
            : parseFloat(premium).toFixed(4),
      };
      const resFuel = await axios.patch(
        `/api/v1/fuelprices/updatePrice/${companyDetails?.company._id}`,
        fuelObject
      );

      setFuelPriceData({
        ...fuelPriceData,
        prices: {
          petrol:
            //  !petrol || isNaN(petrol)
            //    ? fuelPriceData?.prices?.petrol
            // :
            Math.floor(parseFloat(petrol) * 100) / 100,
          diesel:
            //  !diesel || isNaN(diesel)
            //    ? fuelPriceData?.prices?.diesel
            // :
            Math.floor(parseFloat(diesel) * 100) / 100,
          premium:
            //  !premium || isNaN(premium)
            //    ? fuelPriceData?.prices?.premium
            // :
            Math.floor(parseFloat(premium) * 100) / 100,
        },
      });
      toast({
        variant: "success",
        title: "Price successfully reported.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "🤦‍♂️ Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
      // setOpen(false);
    }
  };

  useEffect(() => {
    if (fuelPriceData) {
      // Set default values for inputs when fuelPriceData changes
      setValue("petrol", fuelPriceData?.petrol);
      setValue("diesel", fuelPriceData?.diesel);
      setValue("premium", fuelPriceData?.premium);
    }
  }, [fuelPriceData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <Label className="text-[#1896fe] text-[14px]" htmlFor="petrol">
          Petrol
        </Label>
        <Input
          type="number"
          step="any"
          inputMode="decimal"
          id="petrol"
          {...register("petrol")}
        />
      </div>
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <Label className="text-[#1896fe] text-[14px]" htmlFor="diesel">
          Diesel
        </Label>
        <Input
          type="number"
          step="any"
          inputMode="decimal"
          id="diesel"
          {...register("diesel")}
        />
      </div>{" "}
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <Label className="text-[#1896fe] text-[14px]" htmlFor="premium">
          Premium
        </Label>
        <Input
          type="number"
          step="any"
          inputMode="decimal"
          id="premium"
          {...register("premium")}
        />
      </div>
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <DialogFooter>
          <Button
            className="rounded-lg disabled:bg-gray-400 text-white px-4 w-full md:w-[125px] mt-5"
            type="submit"
          >
            {loading ? (
              <SpinnerCircular
                size={24}
                thickness={200}
                color="white"
                className="mr-2"
              />
            ) : (
              "Report Price"
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
};

export default FuelModal;
