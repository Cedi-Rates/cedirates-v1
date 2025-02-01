"use client";

import React, { useState } from "react";
import style from "@/assets/styles/login.module.css";
import LockIcon from "@/components/auth/LockIcon";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  email: string;
  password: string;
}

const Page = () => {
  const { toast } = useToast();
  const { push } = useRouter();

  const [loading, setLoading] = useState<Boolean>(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<IFormInput>({
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.BASE_URL}/auth/forgot-password`,
        // `http://localhost:4000/api/v1/auth/login`,
        data,
      );
      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'A password reset link has been sent to your email!'
        })
        setLoading(false)
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'There was an error in sending the link'
      })
      setLoading(false);
    }
  };

  return (
    <>
      <main
        className={`flex items-center justify-center h-dvh w-full px-5 lg:px-10`}
      >
        <div className="flex flex-col py-8 gap-12 items-center justify-between h-full">
          <div />
          <div className="flex flex-col items-center">
          <LockIcon className="h-9 w-9 mb-1" />
          <h3 className="text-center font-semibold text-3xl mb-2 text-[#262626]">
            Forgot password?
          </h3>
          <h5 className="text-center mb-4 text-[16px] leading-tight max-w-sm text-[#949494] font-light">
            Enter your email address and we will send you a link to reset your password
          </h5>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-between w-full">
                <label
                  htmlFor="name"
                  className="w-fit text-sm font-medium !text-slate-900"
                >
                  Email Address
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
                    placeholder="hello@gmail.com"
                    className="rounded-[10px] text-[16px] !ring-0 !ring-offset-0"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p
                  className="text-red-400 text-[12px]"
                  role="alert"
                >
                  {errors.email.message}
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
                  "Send Link"
                )}
              </Button>
              <Link href="/login" className="text-primary mt-4 font-medium flex flex-row items-center gap-1"><ArrowLeft className="mt-0.5" size={16} /> Back to Login</Link>
            </div>
          </form>
          </div>
          <div className="sm:w-[380px] w-4/5 text-center">
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

export default Page;
