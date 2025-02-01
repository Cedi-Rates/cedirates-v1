"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import gradient from "@/assets/images/meshGradient.png";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import urlManager from "@/utils/urlManager";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  email: string;
  password: string;
}

const DialogLogin = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  const [visible, toggleVisibility] = useState<Boolean>(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/v1/auth/login", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const redirectUrl = urlManager.getRedirectUrl();
        const isNewUser = localStorage.getItem("isNewUser") === "true";

        if (isNewUser) {
          localStorage.setItem("isNewUser", "false");
          push("/settings/");
          toast({
            variant: "success",
            title: "Successfully logged in! Redirecting...",
          });
        } else {
          // push("/");
          push(redirectUrl);
          toast({
            variant: "success",
            title: "Successfully logged in! Redirecting...",
          });
        }
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      console.error("Login error: ", error);

      if (error.response) {
        // Server responded with a status other than 200 range
        switch (error.response.data.msg) {
          case "Invalid Credentials":
            toast({
              variant: "destructive",
              title: "The email/password you entered is incorrect",
            });
            break;
          default:
            toast({
              variant: "destructive",
              title:
                error.response.data.msg ||
                "An error occurred. Please try again.",
            });
            break;
        }
      } else if (error.request) {
        toast({
          variant: "destructive",
          title: "Network error. Please check your connection and try again.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An error occurred. Please try again.",
        });
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

  return (
    <>
      <form
        className="w-full flex flex-col gap-4 sm:px-3 pt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              className="text-sm font-medium !text-slate-900"
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
                {errors.password && (
                  <p className="text-red-400 text-[12px]" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-primary text-sm font-medium"
          >
            Forgot your password?
          </Link>
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
              "Login"
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

export default DialogLogin;
