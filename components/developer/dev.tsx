"use client"
import { UserDetailsType } from '@/utils/types';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import urlManager from '@/utils/urlManager';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import styles from "../../assets/styles/listing.module.css";
import { useForm, Controller } from 'react-hook-form';
import { PhoneInput } from '../ui/phone-input';
import { BadgeCheckIcon, Building2, User } from 'lucide-react';
import { SpinnerCircular } from 'spinners-react';
import toast from 'react-hot-toast';

type Props = {
    user: UserDetailsType;
};

const Developer = ({ user }: Props) => {
    const { replace } = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        if (!user.email) {
            urlManager.setRedirectUrl();
            replace("/login");
        } else {
            setShowForm(!showForm)
        }
    };

    const {
        register, control, watch, reset, handleSubmit, formState: { errors, isValid }
    } = useForm({ mode: 'onChange' });

    const changeStep = () => {
        if (
            watch("category") !== undefined &&
            watch("category") !== "" &&
            (
                watch("category") === "individual" ||
                (
                    watch("category") === "company" &&
                    watch("companyName") !== ""
                )
            )) {
            setActiveStep(activeStep + 1)
        }
    };

    const decreaseStep = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1)
        } else {
            setShowForm(false)
        }
    };

    const submitForm = async (data: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            const tempData = data

            formData.append('data', JSON.stringify(tempData));

            // const res = await axios.post(`${process.env.BASE_URL}/getlisted/`, formData)
            console.log(data);
            toast.success('Successfully submitted')
            setActiveStep(2)
            setIsLoading(false)
        } catch (error) {
            toast.error('Something went wrong')
            setIsLoading(false)
        } finally {
            reset()
        }
    };

    return (
        <div>
            <div>
                {!showForm ? (
                    <div
                        className={` z-[1px] absolute left-1/2 -translate-x-1/2 py-[12rem] flex-col md:max-w-[700px] w-full px-2 sm:px-4 md:px-0 md:mx-auto text-center items-center justify-center  `}
                    >
                        <h1 className="font-gellix-bold text-[40px] md:text-[68px] mb-5 md:mb-10 leading-[42px] md:leading-[66px]">
                            Get Access to CediRates API
                        </h1>
                        <p className="mb-5 md:mb-10 text-black/60 text-[18px] md:text-[24px]">
                            Easily integrate our powerful API into your applications. Get started today!
                        </p>
                        <Button
                            variant={"default"}
                            size={"lg"}
                            className="text-white font-gellix-medium text-base uppercase shadow-[inset_0px_1px_0px_0px_#ffffff30]"
                            onClick={() => setShowForm(!showForm)}
                        // onClick={handleStart}
                        >
                            Get Started
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 min-h-screen h-full">
                        <div className="min-[1220px]:col-span-3 col-span-full flex flex-col justify-between h-screen">
                            <div className="h-screen overflow-x-hidden">
                                <div className="mt-8 w-10 h-10"></div>
                                <div className="flex flex-col pt-[2%] pb-8 gap-8 min-[780px]:px-16 px-6">
                                    {activeStep === 1 && (
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <h1 className="text-[32px] font-gellix-semibold leading-[34px] mb-2">
                                                    Get CediRates API!
                                                </h1>
                                                <p>Tell us a bit about you</p>
                                            </div>

                                            <Controller
                                                control={control}
                                                name="category"
                                                rules={{ required: "true" }}
                                                render={({ field: { onChange, value } }) => (
                                                    <div className="grid auto-rows-min grid-cols-2 gap-x-4 gap-y-1 w-full">
                                                        <label className="font-gellix-medium col-span-2 h-min">
                                                            Category
                                                        </label>
                                                        <button
                                                            onClick={() => onChange("company")}
                                                            className={`min-[780px]:col-span-1 col-span-2 ${value === "company"
                                                                ? "border-[2px] border-blue-400"
                                                                : "border-[1px]"
                                                                } p-3 w-full rounded-lg flex items-center flex-row gap-3`}
                                                        >
                                                            <div className="bg-slate-200 p-3 rounded-lg w-fit">
                                                                <Building2 />
                                                            </div>
                                                            <div className="flex flex-col gap-0 justify-center h-full items-start">
                                                                <p className="font-gellix-semibold">
                                                                    Company
                                                                </p>
                                                                <p className="text-sm text-left text-muted-foreground -mt-0.5">
                                                                    For Business applications
                                                                </p>
                                                            </div>
                                                        </button>
                                                        <button
                                                            onClick={() => onChange("individual")}
                                                            className={`${value === "individual"
                                                                ? "border-[2px] border-blue-400"
                                                                : "border-[1px]"
                                                                } min-[780px]:col-span-1 col-span-2 p-3 w-full rounded-lg items-center flex flex-row gap-3`}
                                                        >
                                                            <div className="bg-slate-200 p-3 rounded-lg w-fit">
                                                                <User />
                                                            </div>
                                                            <div className="flex flex-col gap-0 items-start h-full justify-center">
                                                                <p className="font-gellix-semibold">
                                                                    Individual
                                                                </p>
                                                                <p className="text-sm text-left text-muted-foreground -mt-0.5">
                                                                    For Personal projects, Learning and exploring our API
                                                                </p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}
                                            />
                                            {watch("category") === "company" && (
                                                <div>
                                                    <label className="font-gellix-medium">
                                                        Company name
                                                    </label>
                                                    <Input
                                                        placeholder="Enter your company's name"
                                                        className={`${errors.companyName && "border-red-400"} text-base`}
                                                        {...register("companyName", { required: true })}
                                                    />
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-6">
                                                <div className="grid auto-rows-min gap-x-3 grid-cols-2">
                                                    <label className="font-gellix-medium col-span-2">
                                                        What&apos;s your full name?
                                                    </label>
                                                    <Input
                                                        placeholder="Enter your first name"
                                                        className={`${errors.firstName && "border-red-400"
                                                            } text-base min-[780px]:col-span-1 min-[780px]:mt-0 mt-2 col-span-2`}
                                                        {...register("firstName", { required: true })}
                                                        defaultValue={user?.firstName}
                                                    />
                                                    <Input
                                                        placeholder="Enter your last name"
                                                        className={`${errors.lastName && "border-red-400"
                                                            } text-base min-[780px]:col-span-1 col-span-2`}
                                                        {...register("lastName", { required: true })}
                                                        defaultValue={user?.lastName}
                                                    />
                                                </div>
                                                <div className="flex min-[780px]:flex-row flex-col min-[780px]:gap-4 gap-6">
                                                    <div className="w-full">
                                                        <label className="font-gellix-medium">
                                                            What&apos;s your email address?
                                                        </label>
                                                        <Input
                                                            placeholder="Enter your email address"
                                                            className={`${errors.email && "border-red-400"
                                                                } text-base`}
                                                            {...register("email", {
                                                                required: true,
                                                                pattern: /^\S+@\S+$/i,
                                                            })}
                                                            defaultValue={user?.email}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label className="font-gellix-medium">
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
                                                                    value={user.whatsappNumber ? user?.whatsappNumber : value}
                                                                    placeholder="Enter your phone number"
                                                                    className="w-full text-base"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 2 && (
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col gap-1">
                                                <h1 className="min-[780px]:text-[32px] text-3xl font-gellix-semibold flex flex-row items-center gap-1.5 leading-[1]">
                                                    <BadgeCheckIcon className="text-blue-500 mt-1 w-8 h-8" />{" "}
                                                    Your request is under review
                                                </h1>
                                                <p>
                                                    Your request is being reviewed. This may take up to{" "}
                                                    <span className="text-blue-500 font-gellix-semibold">
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
                                {activeStep !== 2 && activeStep === 1 ? (
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
                                        onClick={changeStep}
                                        disabled={
                                            !(
                                                watch("firstName") && watch("lastName") &&
                                                watch("email") && watch("phone") &&
                                                watch("category") !== undefined &&
                                                watch("category") !== "" &&
                                                (watch("category") === "individual" ||
                                                    (watch("category") === "company" && watch("companyName") !== ""))
                                            ) || activeStep === 2
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
                )}
            </div>
        </div>
    )
}

export default Developer





