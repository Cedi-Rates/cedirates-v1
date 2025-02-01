"use client";

import React, { useEffect, useState } from "react";
import VerifyEmail from "@/assets/images/verifyEmail.jsx";
import ErrorEmail from "@/assets/images/errorEmail.jsx";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useParams, useSearchParams } from "next/navigation";
import customAxios from "@/utils/customAxios";
import { useToast } from "@/components/ui/use-toast";

const VerifyEmailComponent = () => {
  const { toast } = useToast();
  const query = useSearchParams();

  // console.log(query.get("token"));
  // console.log(query.get("email"));
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);

  const [RSloading, setRSLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);


  const resendEmail = (): void => {
    setRSLoading(true);
    if (countdown <= 0) {
      axios.post<{ msg: any }>(`${process.env.BASE_URL}/auth/resend-verification`, { email: query.get("email") })
        .then((data) => {
          console.log(data.data);
          toast({
            variant: 'success',
            title: 'Email sent successfully'
          });
          setRSLoading(false);
          setEmailSent(true);
          setCountdown(60);
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Oops, an error occurred.'
          });
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

  useEffect(() => {
    const onSubmit = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${process.env.BASE_URL}/auth/verify-email`, {
          verificationToken: query.get("token"),
          email: query.get("email")
        });
        if (response.data.success) {
          setLoading(false);
          setError(false);
          window.location.replace('/settings')
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
      typeof localStorage !== "undefined" &&
        localStorage.setItem("isNewUser", "true");
    };
    setLoading(false);
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex h-screen w-screen min-[720px]:px-0 px-4 items-center justify-center pt-0">
        {loading && (
          <SpinnerCircular
            thickness={140}
            color="#1697FD"
            secondaryColor="#92D0FF"
          />
        )}
        {loading ? null : !error ? (
          <div className="flex flex-col gap-2 items-center">
            <VerifyEmail width={45} height={49} />
            <p
              className="text-3xl font-semibold leading-none"
              style={{ fontFamily: "Gellix-SemiBold" }}
            >
              Your account has been verified
            </p>
            <p
              className="leading-tight text-[16px] -mt-1 min-[720px]:w-3/5 w-auto text-center text-muted-foreground"
              style={{ fontFamily: "Gellix-Medium" }}
            >
              Your cedirates account has been verified. Log into your account to
              view rates
            </p>
            <Button
              onClick={() => window.location.replace("/login")}
              className="text-white !py-1 !px-3 rounded-full text-sm h-min"
              style={{ fontFamily: "Gellix-Medium" }}
            >
              Log into your account
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            <ErrorEmail width={45} height={49} />
            <p
              className="text-3xl font-semibold text-center leading-none"
              style={{ fontFamily: "Gellix-SemiBold" }}
            >
              Verification link expired
            </p>
            <p
              className="leading-tight text-[16px] -mt-1 min-[720px]:w-3/5 w-auto text-center text-muted-foreground"
              style={{ fontFamily: "Gellix-Medium" }}
            >
              The verification link you clicked has expired. Double check the
              link in the email you were sent.
            </p>
            {/* <Button onClick={() => window.location.replace('/login')} className="text-white !py-1 !px-3 rounded-full text-sm h-min" style={{ fontFamily: 'Gellix-Medium' }}>Get a new link</Button> */}
            <Button disabled={Boolean(RSloading || countdown > 0)} onClick={() => resendEmail()} style={{ fontFamily: "Gellix-Medium" }} className="text-white !py-1 !px-3 rounded-full text-sm h-min" >
              {RSloading ? 'Loading' : `Get a new link${countdown > 0 ? ` in 0:${countdown < 10 ? '0' : ''}${countdown}` : ''}`}
            </Button>
          </div>
        )}
      </main>
    </>
  );
};

export default VerifyEmailComponent;
