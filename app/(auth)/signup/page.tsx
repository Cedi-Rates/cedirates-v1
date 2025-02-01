"use client";

import React, { useState, useEffect, useRef } from "react";
import style from "@/assets/styles/login.module.css";
import Logo from "@/assets/images/Cedirates_Logo-White.svg";
import Link from "next/link";
import Cards from "@/components/auth/Cards";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import gradient from "@/assets/images/meshGradient.png";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import VerEmailIcon from "@/components/auth/VerEmailIcon";
import { SpinnerCircular } from "spinners-react";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
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

const Signup = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<Boolean>(false);
  const [open, setModalOpen] = useState<Boolean>(false);
  const [RSloading, setRSLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const [visible, toggleVisibility] = useState<Boolean>(false);

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
      <div className="h-full w-full flex flex-row">
        {open ? (
          <main
            className={`basis-full flex justify-center items-start sm:items-center min-[1020px]:basis-1/2 px-30 lg:px-40 pt-20 pb-5`}
            style={{ minHeight: "100dvh" }}
          >
            <div className="w-full flex flex-col gap-1 items-center">
              <VerEmailIcon className="h-9 w-9" />
              <h3 className="text-center font-medium text-3xl mb-0.5 text-[#262626]">
                Check your email
              </h3>
              <h5 className="text-center text-[16px] leading-tight text-[#949494] font-light">
                We sent a verification link to your email. Click the link to
                verify your email address and continue
              </h5>
              <Button
                disabled={Boolean(RSloading || countdown > 0)}
                onClick={() => resendEmail()}
                className="rounded-xl mt-3 font-medium w-fit shadow-sm bg-primary text-white"
              >
                {RSloading ? (
                  <>
                    <SpinnerCircular
                      size={14}
                      thickness={180}
                      color=""
                      className="mr-2 mt-0.5"
                    />
                    <p>Loading</p>
                  </>
                ) : (
                  `Resend email${
                    countdown > 0
                      ? ` in 0:${countdown < 10 ? "0" : ""}${countdown}`
                      : ""
                  }`
                )}
              </Button>
            </div>
          </main>
        ) : (
          <main
            className={clsx(
              `relative basis-full flex justify-center h-screen items-start sm:items-center min-[1020px]:basis-1/2 px-5 pt-20 pb-5`,
              style.top
            )}
          >
            <div className="w-full max-w-md">
              <h3 className="text-center font-semibold text-3xl mb-1 text-[#262626]">
                Create an Account
              </h3>
              <h5 className="text-center mb-4 text-[16px] leading-tight text-[#949494] font-light">
                Stay updated with real-time exchange rates, fuel prices, and
                more.
              </h5>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col sm:flex-row gap-2 w-full">
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
                  <p className="text-sm font-medium text-slate-600">
                    Already have an account?{" "}
                    <span className="text-primary">
                      <Link href="/login">Login</Link>
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
        )}
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
              Check Exchange Rates and Fuel Prices from your favourite brands.
            </p>
          </div>
          <Cards className="mb-8" />
          <div
            className="w-full h-max overflow-scroll scrollbar-hide"
            ref={flavoursContainerRef}
          >
            <div className="flex flex-row w-max gap-3">
              {testimonials.map((item, index) => (
                <div
                  key={index} // or key={item.id} if each item has a unique ID
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

export default Signup;
