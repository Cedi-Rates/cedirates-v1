"use client";

import React, { useState, useEffect, useRef } from "react";
import style from "@/assets/styles/login.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import VerEmailIcon from "@/components/auth/VerEmailIcon";
import { SpinnerCircular } from "spinners-react";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import clsx from "clsx";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
}

const DialogSignup = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<Boolean>(false);
  const [open, setModalOpen] = useState<Boolean>(false);
  const [RSloading, setRSLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const [visible, toggleVisibility] = useState<Boolean>(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.BASE_URL}/auth/register`,
        data
      );
      // setModalOpen(true)
      if (response.data.success) {
        setModalOpen(true);
        setCountdown(60);
        setEmailSent(true);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      setLoading(false);
      // setModalOpen(true)// Ensure loading is stopped before handling errors

      if (error.response) {
        // Client received an error response (5xx, 4xx)
        const { msg } = error.response.data;

        if (msg.includes("shorter than the minimum allowed")) {
          setError("password", { message: "Password is too short." });
        } else {
          switch (msg) {
            case "Email Already Exists":
              setError("email", { message: "Email taken" });
              break;
            case "Invalid Email":
              setError("email", { message: "Invalid email" });
              break;
            case "Password Too Weak":
              setError("email", { message: "Password Too Weak" });
              break;
            default:
              toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again later.",
              });
              console.error(error.response.data.msg);
              break;
          }
        }
      } else if (error.request) {
        toast({
          variant: "destructive",
          title:
            "Network error. Please check your internet connection and try again.",
        });
        console.error("Network error:", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "An unexpected error occurred. Please try again later.",
        });
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.open(`${process.env.BASE_URL}/auth/google`, "_self");
  };

  const resendEmail = (): void => {
    setRSLoading(true);
    if (countdown <= 0) {
      axios
        .post<{ msg: any }>(
          `${process.env.BASE_URL}/auth/resend-verification`,
          { email: watch("email") }
        )
        .then((data) => {
          console.log(data.data);
          toast({
            variant: "success",
            title: "Email sent successfully",
          });
          setRSLoading(false);
          setEmailSent(true);
          setCountdown(60);
        })
        .catch((error) => {
          if (error.response && error.response.data.msg) {
            toast({
              variant: "destructive",
              title: error.response.data.msg,
            });
          } else {
            toast({
              variant: "destructive",
              title: "An error occurred.",
            });
            console.error(error);
          }
          setRSLoading(false);
        });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && emailSent) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown: number) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0 && emailSent) {
      setEmailSent(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, emailSent]);

  return (
    <>
      <form
        className="w-full flex flex-col gap-4 sm:px-3 pt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between w-full">
            <label
              htmlFor="name"
              className="w-fit text-sm font-medium !text-slate-900"
            >
              First Name
            </label>
          </div>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <Input
                type="name"
                placeholder="Enter first name"
                className="text-[16px] rounded-[10px] !ring-0 !ring-offset-0"
                {...field}
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-400 text-[12px]" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between w-full">
            <label
              htmlFor="name"
              className="w-fit text-sm font-medium !text-slate-900"
            >
              Last Name
            </label>
          </div>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <Input
                type="name"
                placeholder="Enter last name"
                className="text-[16px] rounded-[10px] !ring-0 !ring-offset-0"
                {...field}
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-400 text-[12px]" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between w-full">
            <label
              htmlFor="email"
              className="w-min text-sm font-medium !text-slate-900"
            >
              Email
            </label>
          </div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-[16px] rounded-[10px] !ring-0 !ring-offset-0"
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-[12px]" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 text-start w-full mb-2">
          <div className="flex flex-row justify-between w-full">
            <label
              htmlFor="password"
              className="text-[14px] font-medium !text-slate-900"
            >
              Password
            </label>
          </div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <div className="relative">
                <Input
                  type={visible ? "text" : "password"}
                  className="pr-14 text-[16px] rounded-[10px] !ring-0 !ring-offset-0"
                  placeholder="Enter your password"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(!visible)}
                  className="absolute flex text-slate-500 flex-col items-center justify-center px-4 mt-[3px] h-[87%] top-0 right-0"
                >
                  {!visible ? (
                    <EyeIcon strokeWidth={1.75} size={18} />
                  ) : (
                    <EyeOffIcon strokeWidth={1.75} size={18} />
                  )}
                </button>
              </div>
            )}
          />
          {errors.password && (
            <p className="text-red-400 text-[12px]" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <Button
            type="submit"
            disabled={Boolean(loading)}
            className="rounded-xl w-full shadow-sm bg-primary text-white"
          >
            {loading ? (
              <>
                <SpinnerCircular
                  size={16}
                  thickness={180}
                  color=""
                  className="mr-2 mt-0.5"
                />
                <p>Loading</p>
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
        <div className={`flex flex-row items-center gap-2 text-slate-600`}>
          <div className={`h-[1px] w-full bg-slate-200 mt-1`}></div>
          <p>or</p>
          <div className={`h-[1px] w-full bg-slate-200 mt-1`}></div>
        </div>

        <Button
          type="button"
          className="rounded-xl w-full items-center mt-1 shadow-sm bg-transparent text-black border-slate-200 border-[1px] flex space-x-1.5 hover:bg-transparent"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={16} className="mt-0.5" />
          <span className="font-medium text-sm text-black">
            Continue with Google
          </span>
        </Button>
      </form>
    </>
  );
};

export default DialogSignup;
