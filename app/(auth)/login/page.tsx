"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "@/assets/styles/login.module.css";
import Logo from "@/assets/images/Cedirates_Logo-White.svg";
import Image from "next/image";
import CurrencyConverterCard from "@/components/auth/CurrencyConverterCard";
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
import { Avatar } from "@/components/ui/avatar";
import clsx from "clsx";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
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
        headers: { "custom-origin": "cedirates-dev" },
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

  const testimonials = [
    {
      text: "😂😂 Aboki hit me with the Google rate, so I hit him back with CediRates ein rate. Looks like we’re calculating the median today!",
      image:
        "https://pbs.twimg.com/profile_images/1467099385628704771/1f5ZnkV1_400x400.jpg",
      name: "dantata",
      handle: "@sosa4rfv",
    },
    {
      text: "Most underrated account. Continue your good works.",
      image:
        "https://pbs.twimg.com/profile_images/1729651019087237120/R-Fn2Jqq_400x400.jpg",
      name: "Niel",
      handle: "@1RealNiel",
    },
    {
      text: "Cool website; new functions every day. Next thing for me is a mobile app 🙌",
      image:
        "https://pbs.twimg.com/profile_images/1721080146075987968/U9YV0Q3c_400x400.jpg",
      name: "Kenneth Yaw Agyeman-Badu",
      handle: "@Kenzibit",
    },
    {
      text: "unrelated but your website is top notch 👍",
      image:
        "https://pbs.twimg.com/profile_images/1698320624723120128/tRmt_nYx_400x400.jpg",
      name: "𝑨𝑱🇬🇭",
      handle: "@dopematikk",
    },
    {
      text: "I always post your rates on my status together with the link & people always ask when I even miss a day 🤭🤭",
      image:
        "https://pbs.twimg.com/profile_images/1650942511513231360/FXWuZeFv_400x400.jpg",
      name: "Nii",
      handle: "@CulioGH",
    },
  ];

  const flavoursContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 0.5; // Adjust the scroll speed for smoothness

  useEffect(() => {
    const flavoursContainer = flavoursContainerRef.current;
    let animationFrameId: number;

    const smoothScroll = () => {
      if (flavoursContainer) {
        // Scroll the container
        flavoursContainer.scrollLeft += scrollSpeed;

        // If we've reached the end, reset the scroll position
        if (
          flavoursContainer.scrollLeft >=
          flavoursContainer.scrollWidth - flavoursContainer.clientWidth
        ) {
          flavoursContainer.scrollLeft = 0;
        }

        // Request the next frame
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    // Start the scrolling animation
    animationFrameId = requestAnimationFrame(smoothScroll);

    // Cleanup function to cancel animation frame when the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]);

  const handleGoogleLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.open(`${process.env.BASE_URL}/auth/google`, "_self");
  };

  return (
    <>
      {/* <LoginNavbarLight  /> */}
      <div className="h-full w-full flex flex-row">
        <main
          className={clsx(
            `relative basis-full flex justify-center items-start sm:items-center min-[1020px]:basis-1/2 px-5 pt-20 pb-5`,
            style.top
          )}
          style={{ minHeight: "100dvh" }}
        >
          <div className="w-full max-w-md">
            <h3 className="text-center font-semibold text-3xl mb-1 text-[#262626]">
              Welcome back
            </h3>
            <h5 className="text-center mb-4 text-[16px] font-light text-[#949494]">
              Sign into your CediRates account to continue ✨
            </h5>
            <form
              className="w-full flex flex-col gap-4"
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
                <p className="text-sm font-medium text-slate-600">
                  Don&apos;t have an account?{" "}
                  <span className="text-primary">
                    <Link href="/signup">Sign up</Link>
                  </span>
                </p>
              </div>
              <div
                className={`flex flex-row items-center gap-2 text-slate-600`}
              >
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

            <div
              className={clsx(
                "absolute bottom-5 mt-16 left-1/2 transform -translate-x-1/2 sm:w-[380px] w-4/5 text-center",
                style.tc
              )}
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <p className="text-sm text-gray-500 w-full">
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
        <div
          style={{
            background: `url(${gradient.src})`,
            backgroundSize: "cover",
          }}
          className={`min-[1020px]:flex box-border fixed w-[50vw] right-3 top-3 bottom-3 flex-col items-center justify-between hidden h-[97vh] rounded-2xl p-8 basis-1/2`}
        >
          <div className="flex flex-col items-start">
            <Image
              src={Logo.src}
              className="h-16"
              alt="logo"
              width={100}
              height={64}
              loading="lazy"
            />
            <p className="text-4xl -mt-3 font-semibold text-white">
              Get real-time currency conversions to make informed decisions with
              ease.
            </p>
          </div>
          <CurrencyConverterCard />
          <div
            className="w-full h-max overflow-scroll scrollbar-hide"
            ref={flavoursContainerRef}
          >
            <div className="flex flex-row w-max gap-3">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-5 justify-between rounded-xl"
                  style={{ background: "rgba(255, 255, 255, 0.30)" }}
                >
                  <p className="text-sm text-white font-medium max-w-[280px]">
                    {item.text}
                  </p>
                  <div className="flex flex-row h-min gap-2">
                    <Avatar image={item.image} size="l" />
                    <div className="flex flex-col flex-grow justify-evenly h-full">
                      <p className="font-medium text-white leading-[13px]">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-300 leading-[13px]">
                        {item.handle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
