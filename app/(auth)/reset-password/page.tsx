"use client";

import React, { useState } from "react";
import style from "@/assets/styles/login.module.css";
import Logo from "@/assets/images/Cedirates_Logo-Blue.svg";
import KeyIcon from "@/components/auth/KeyIcon";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useRouter, useSearchParams } from "next/navigation";
import SVGComponent from "@/assets/svgs/Cuate";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  const searchParams = useSearchParams();
  const [visible, toggleVisibility] = useState<Boolean>(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        variant: 'success',
        title: "Passwords do not match"
      });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/v1/auth/reset-password", {
        email,
        password: data.password,
        token,
      });

      if (response.status === 200) {
        toast({
          variant: 'success',
          title: "Password reset successfully! Redirecting to login..."
        });
        push("/login");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      console.error("Reset password error: ", error);
      toast({
        variant: 'destructive',
        title: error.response?.data?.msg || "An error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main
        className={`flex items-center justify-center h-dvh w-full px-5 lg:px-10`}
      >
        <div className="flex flex-col items-center justify-center">
          <KeyIcon className="h-9 w-9 mb-1" />
          <h3 className="text-center font-semibold text-3xl mb-2 text-[#262626]">
            Reset your password
          </h3>
          <h5 className="text-center mb-4 text-[16px] leading-tight max-w-sm text-[#949494] font-light">
            Enter a new password to reset the password on your account. 
          </h5>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 text-start w-full">
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
                      className="pr-14 rounded-[10px] text-[16px] !ring-0 !ring-offset-0"
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
                      <p
                        className="text-red-400 text-[12px]"
                        role="alert"
                      >
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-1 text-start w-full mb-2">
              <div className="flex flex-row justify-between w-full">
                <label
                  htmlFor="password"
                  className="text-sm font-medium !text-slate-900"
                >
                  Confirm Password
                </label>
              </div>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Confirm Password is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      type={visible ? "text" : "password"}
                      className="pr-14 rounded-[10px] text-[16px] !ring-0 !ring-offset-0"
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
              {errors.confirmPassword && (
                <p
                  className="text-red-400 text-[12px]"
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button
                type="submit"
                disabled={Boolean(loading) || !isValid}
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
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>

          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:w-[380px] w-4/5 text-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
            <p className="text-sm text-gray-500">
              By proceeding, you agree to CediRates&apos;{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
