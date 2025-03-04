"use client";
import React, { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import customAxios from "@/utils/customAxios";
import { SpinnerCircular } from "spinners-react";
import {
  CompanyDataType,
  CompanyRate,
  CompleteCompanyDetailsType,
} from "@/utils/types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface AlertDialogDemoProps {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate;
}

const Dollar: React.FC<AlertDialogDemoProps> = ({
  companyDetails,
  companyData,
}) => {
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm();

  const currentPrices = companyData?.data?.dollarRates;
  const [dollarPriceData, setDollarPriceData] = useState<any>(currentPrices);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDollarPriceData(currentPrices);
  }, [companyDetails, currentPrices]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { buying, selling } = data;
    try {
      const buyingRate =
        !buying || isNaN(buying)
          ? dollarPriceData?.buyingRate
          : parseFloat(parseFloat(buying).toFixed(4));

      const sellingRate =
        !selling || isNaN(selling)
          ? dollarPriceData?.sellingRate
          : parseFloat(parseFloat(selling).toFixed(4));

      const midRate =
        !buying || isNaN(buying)
          ? dollarPriceData?.midRate
          : parseFloat(
              ((parseFloat(buying) + parseFloat(selling)) / 2).toFixed(4)
            );

      const priceObject = {
        dollarRates: {
          buyingRate,
          sellingRate,
          midRate,
        },
        euroRates: dollarPriceData?.rates?.euroRates || {
          buyingRate: 0,
          sellingRate: 0,
        },
        poundRates: dollarPriceData?.rates?.poundRates || {
          buyingRate: 0,
          sellingRate: 0,
        },
        company: companyDetails?.company?.name || "Default Company",
      };

      await axios.patch(
        `/api/v1/exchangeRates/updateRates/dollarRates/${companyDetails?.company._id}`,
        priceObject,
        { headers: { "custom-origin": "cedirates-dev" } }
      );

      setDollarPriceData({
        ...dollarPriceData,
        rates: {
          // ...dollarPriceData.rates,
          dollarRates: {
            buyingRate,
            sellingRate,
            midRate,
          },
          euroRates: dollarPriceData?.euroRates || {
            buyingRate: 0,
            sellingRate: 0,
          },
          poundRates: dollarPriceData?.poundRates || {
            buyingRate: 0,
            sellingRate: 0,
          },
        },
      });
      toast({
        variant: "success",
        title: "Price successfully reported.",
      });
    } catch (err: any) {
      console.log(err);

      toast({
        variant: "destructive",
        title: "🤦‍♂️ Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dollarPriceData) {
      setValue("buying", dollarPriceData?.buyingRate);
      setValue("selling", dollarPriceData?.sellingRate);
    }
  }, [dollarPriceData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <Label className="text-[#1896fe] text-[14px]" htmlFor="name">
          Buying
        </Label>
        <Input
          id="buying"
          {...register("buying")}
          type="number"
          inputMode="decimal"
          step="any"
        />
      </div>
      <div className="flex flex-col w-full max-w-sm mx-auto mb-3 gap-1.5">
        <Label className="text-[#1896fe] text-[14px]" htmlFor="username">
          Selling
        </Label>
        <Input
          id="selling"
          {...register("selling")}
          type="number"
          inputMode="decimal"
          step="any"
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

export default Dollar;
