"use client";
//@ts-nocheck
import React, { useState } from "react";
import styles from "../../assets/styles/listing.module.css";
import "@/style.css"
import NavbarLight from "@/components/navbar/NavbarLight";
import { Button } from "../../components/ui/button";
import Logo from '@/assets/images/Cedirates_Logo-Blue.png'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/fileUpload";
import { DropzoneOptions } from "react-dropzone";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BadgeCent, BadgeCheckIcon, Fuel, Minus, Trash2, User } from "lucide-react";
import Badge from "@/components/listing/badge";
import { Gradient } from "@/utils/gradient"
import { Controller, useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/passport-input";
import { SpinnerCircular } from "spinners-react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const ListingPage = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
    disabled: files.length > 0,
  } satisfies DropzoneOptions;

  const options = [
    { label: "Commercial Bank", emoji: "https://em-content.zobj.net/source/apple/391/bank_1f3e6.png" },
    { label: "Forex Bureau", emoji: "https://em-content.zobj.net/source/apple/391/currency-exchange_1f4b1.png" },
    { label: "Crypto Exchange", emoji: "https://em-content.zobj.net/source/apple/391/chart-increasing-with-yen_1f4b9.png" },
    { label: "Fintech", emoji: "https://em-content.zobj.net/source/apple/391/desktop-computer_1f5a5-fe0f.png" },
    { label: "Money Transfer", emoji: "https://em-content.zobj.net/source/apple/391/money-with-wings_1f4b8.png" },
    { label: "Payment Processor", emoji: "https://em-content.zobj.net/source/apple/391/receipt_1f9fe.png" }
  ];

  const { register, control, watch, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  })

  const submitForm = async (data: any) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      const tempData = data
      delete tempData.files;

      formData.append('data', JSON.stringify(tempData));
      formData.append('image', data.file[0] ?? files[0]);

      const res = await axios.post(`${process.env.BASE_URL}/getlisted/`, formData)
      toast({
        variant: 'success',
        title: 'Successfully submitted'
      })
      setActiveStep(3)
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong'
      })
      setIsLoading(false)
    }
  }

  const changeStep = () => {
    if (watch("companyName") !== "" &&
      watch("category") !== undefined &&
      watch("file") !== undefined &&
      watch("category") !== "" &&
      (
        watch("category") === "fuel" ||
        (
          watch("category") === "exchangeRates" &&
          watch("subCategory") !== undefined &&
          watch("subCategory") !== ""
        )
      )) {
      setActiveStep(activeStep + 1)
    }
  }

  const decreaseStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    } else {
      setShowForm(false)
    }
  }

  return (
    <div>
      <div className="">
        {!showForm ? (
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-32 flex md:max-w-[700px] w-full px-2 sm:px-4 md:px-0 md:mx-auto text-center items-center justify-center`}
            style={{ height: "calc(100dvh - 180px)" }}
          >
            <div>
              <h1 className="font-bold text-[40px] md:text-[68px] mb-5 md:mb-10 leading-[42px] md:leading-[66px]">
                Get listed and showcase your rates
              </h1>
              <p className="mb-5 md:mb-10 text-black/60 text-[18px] md:text-[24px] font-light">
                Join our directory, showcase your rates and prices, and reach a
                targeted audience. Sign up now to connect with customers
                actively seeking reliable information and services.
              </p>
              <Button
                variant={"default"}
                size={"lg"}
                className="text-white font-medium text-base uppercase shadow-[inset_0px_1px_0px_0px_#ffffff30]"
                onClick={() => setShowForm(!showForm)}
              >
                Get listed for free
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-[1220px]:absolute min-[1220px]:top-32">
            <div className="grid grid-cols-5 min-h-screen h-full">
              <div className="min-[1220px]:col-span-3 col-span-full flex flex-col justify-between h-screen">
                <div className="min-[1220px]:h-screen overflow-x-hidden">
                  <div className="mt-0 min-[1220px]:mt-8 w-10 h-5 min-[1220px]:h-10"></div>
                  <div className="flex flex-col overflow-x-scroll pt-[2%] pb-8 gap-8 min-[780px]:px-16 px-6">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbPage
                            className={`text-base ${
                              activeStep === 1 && "text-blue-500 !font-semibold"
                            }`}
                          >
                            Your Company
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Minus />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbPage
                            className={`text-base ${
                              activeStep === 2 && "text-blue-500 !font-semibold"
                            }`}
                          >
                            About You
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Minus />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbPage
                            className={`text-base ${
                              activeStep === 3 && "text-blue-500 !font-semibold"
                            }`}
                          >
                            All done!
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    {activeStep === 1 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <h1 className="text-[32px] font-semibold leading-[34px] mb-2">
                            Get listed on CediRates!
                          </h1>
                          <p>Tell us a bit about your company</p>
                        </div>
                        <div>
                          <label className="font-medium">Company name</label>
                          <Input
                            placeholder="Enter your company's name"
                            className={`${
                              errors.companyName && "border-red-400"
                            } text-base`}
                            {...register("companyName", { required: true })}
                          />
                        </div>
                        <Controller
                          control={control}
                          name="category"
                          rules={{ required: "true" }}
                          render={({ field: { onChange, value } }) => (
                            <div className="grid auto-rows-min grid-cols-2 gap-x-4 gap-y-1 w-full">
                              <label className="font-medium col-span-2 h-min">
                                Category
                              </label>
                              <button
                                onClick={() => onChange("exchangeRates")}
                                className={`min-[780px]:col-span-1 col-span-2 ${
                                  value === "exchangeRates"
                                    ? "border-[2px] border-blue-400"
                                    : "border-[1px]"
                                } p-3 w-full rounded-lg flex items-center flex-row gap-3`}
                              >
                                <div className="bg-slate-200 p-3 rounded-lg w-fit">
                                  <BadgeCent />
                                </div>
                                <div className="flex flex-col gap-0 justify-center h-full items-start">
                                  <p className="font-semibold">
                                    Exchange Rates
                                  </p>
                                  <p className="text-sm text-left text-muted-foreground -mt-0.5">
                                    List foreign exchange rates for Dollars,
                                    Pounds, and Euros.
                                  </p>
                                </div>
                              </button>
                              <button
                                onClick={() => onChange("fuel")}
                                className={`${
                                  value === "fuel"
                                    ? "border-[2px] border-blue-400"
                                    : "border-[1px]"
                                } min-[780px]:col-span-1 col-span-2 p-3 w-full rounded-lg items-center flex flex-row gap-3`}
                              >
                                <div className="bg-slate-200 p-3 rounded-lg w-fit">
                                  <Fuel />
                                </div>
                                <div className="flex flex-col gap-0 items-start h-full justify-center">
                                  <p className="font-semibold">Fuel Prices</p>
                                  <p className="text-sm text-left text-muted-foreground -mt-0.5">
                                    List prices for Petrol, Diesel, and Premium
                                    fuel.
                                  </p>
                                </div>
                              </button>
                            </div>
                          )}
                        />
                        {watch("category") === "exchangeRates" && (
                          <div className="flex flex-col gap-1">
                            <label className="font-medium">
                              Type of financial institution
                            </label>
                            <Controller
                              control={control}
                              name="subCategory"
                              rules={{ required: "true" }}
                              render={({ field: { onChange, value } }) => (
                                <div className="flex flex-row flex-wrap gap-1.5">
                                  {options.map((item, key) => (
                                    <Badge
                                      key={key}
                                      onClick={() => onChange(item.label)}
                                      label={item.label}
                                      selected={value === item.label}
                                      icon={item.emoji}
                                    />
                                  ))}
                                </div>
                              )}
                            />
                          </div>
                        )}
                        <div>
                          <label className="font-medium">
                            Upload company&apos;s logo
                          </label>
                          <Controller
                            control={control}
                            name="file"
                            rules={{ required: "true" }}
                            render={({ field: { onChange, value } }) => (
                              <FileUploader
                                value={files}
                                onValueChange={(value: any) => {
                                  setFiles(value);
                                  onChange(value);
                                }}
                                dropzoneOptions={dropzone}
                              >
                                <FileInput>
                                  <div
                                    className={`items-center ${
                                      errors.file && "border-red-500"
                                    } justify-center flex flex-col h-32 w-full border bg-background rounded-md`}
                                  >
                                    <p className="text-gray-500">
                                      Upload logo here
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      svg, png and jpg only
                                    </p>
                                  </div>
                                </FileInput>
                                <FileUploaderContent className="flex items-center flex-row gap-2">
                                  {files?.map((file, i) => (
                                    <FileUploaderItem
                                      key={i}
                                      index={i}
                                      className="size-20 p-0 rounded-md overflow-hidden"
                                      aria-roledescription={`file ${
                                        i + 1
                                      } containing ${file.name}`}
                                    >
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        height={80}
                                        width={80}
                                        className="size-20 p-0"
                                      />
                                      <button>
                                        <Trash2 className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
                                      </button>
                                    </FileUploaderItem>
                                  ))}
                                </FileUploaderContent>
                              </FileUploader>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <h1 className="text-[32px] font-semibold">
                            Get listed on CediRates!
                          </h1>
                          <p>Tell us a bit about you</p>
                        </div>
                        <div className="grid auto-rows-min gap-x-3 grid-cols-2">
                          <label className="font-medium col-span-2">
                            What&apos;s your full name?
                          </label>
                          <Input
                            placeholder="Enter your first name"
                            className={`${
                              errors.firstName && "border-red-400"
                            } text-base min-[780px]:col-span-1 min-[780px]:mt-0 mt-2 col-span-2`}
                            {...register("firstName", { required: true })}
                          />
                          <Input
                            placeholder="Enter your last name"
                            className={`${
                              errors.lastName && "border-red-400"
                            } text-base min-[780px]:col-span-1 col-span-2`}
                            {...register("lastName", { required: true })}
                          />
                        </div>
                        <div className="flex min-[780px]:flex-row flex-col min-[780px]:gap-4 gap-6">
                          <div className="w-full">
                            <label className="font-medium">
                              What&apos;s your email address?
                            </label>
                            <Input
                              placeholder="Enter your email address"
                              className={`${
                                errors.email && "border-red-400"
                              } text-base`}
                              {...register("email", {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                              })}
                            />
                          </div>
                          <div className="w-full">
                            <label className="font-medium">
                              What&apos;s your phone number?
                            </label>
                            <Controller
                              control={control}
                              name="phone"
                              rules={{ required: "true" }}
                              render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                  defaultCountry="GH"
                                  onChange={onChange}
                                  value={value}
                                  placeholder="Enter your phone number"
                                  className="w-full text-base"
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="min-[780px]:w-1/2 w-full">
                          <label className="font-medium">
                            Now, come up with a password
                          </label>
                          <Controller
                            control={control}
                            name="password"
                            rules={{ required: "true" }}
                            render={({ field: { onChange, value } }) => (
                              <PasswordInput
                                onChange={onChange}
                                value={value}
                                placeholder="Enter a password"
                                className="w-full text-base"
                              />
                            )}
                          />
                        </div>
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h1 className="min-[780px]:text-[32px] text-3xl font-semibold flex flex-row items-center gap-1.5 leading-[1]">
                            <BadgeCheckIcon className="text-blue-500 mt-1 w-8 h-8" />{" "}
                            Your request is under review
                          </h1>
                          <p>
                            Your request is being reviewed. This may take up to{" "}
                            <span className="text-blue-500 font-semibold">
                              48 hours
                            </span>
                            . We will send you an email when we have completed
                            the review process.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`flex ${styles["bottom-shadow"]} bg-white w-full flex-row justify-between sticky bottom-0 min-[780px]:px-16 px-6 py-4`}
                >
                  <Button variant="outline" onClick={decreaseStep}>
                    Back
                  </Button>
                  {activeStep !== 3 && activeStep === 2 ? (
                    <Button
                      className="text-white gap-1"
                      disabled={!isValid || isLoading}
                      onClick={handleSubmit(submitForm)}
                    >
                      {isLoading && (
                        <SpinnerCircular
                          size={15}
                          thickness={135}
                          speed={100}
                          color="rgba(255, 255, 255, 1)"
                          secondaryColor="rgba(0, 0, 0, 0.44)"
                        />
                      )}{" "}
                      {isLoading ? "Loading" : "Submit"}
                    </Button>
                  ) : (
                    <Button
                      className="text-white"
                      onClick={changeStep}
                      disabled={
                        !(
                          watch("companyName") !== "" &&
                          watch("file") !== undefined &&
                          watch("category") !== undefined &&
                          watch("category") !== "" &&
                          (watch("category") === "fuel" ||
                            (watch("category") === "exchangeRates" &&
                              watch("subCategory") !== undefined &&
                              watch("subCategory") !== ""))
                        )
                      }
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </div>
              <div className="bg-blue-200 min-h-screen h-full min-[1220px]:block hidden col-span-2">
                <canvas id="gradient-canvas" data-transition-in />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingPage
