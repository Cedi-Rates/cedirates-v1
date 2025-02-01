"use client";
import { googleOneTapLogin } from "@/utils/helpers/api";
import { UserDetailsType } from "@/utils/types";
import { useCallback, useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

type Props = {
    user: UserDetailsType;
};

const GoogleOneTapLogin = ({ user }: Props) => {

    const oneTap = useCallback(() => {
        const { google } = window;

        if (google) {
            // console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                callback: handleCredentialResponse
            });

            google.accounts.id.prompt();

            //   google.accounts.id.prompt((notification) => {
            //     console.log(notification);
            //     if (notification.isNotDisplayed()) {
            //       console.log(
            //         "getNotDisplayedReason ::",
            //         notification.getNotDisplayedReason()
            //       );
            //     } else if (notification.isSkippedMoment()) {
            //       console.log("getSkippedReason  ::", notification.getSkippedReason());
            //     } else if (notification.isDismissedMoment()) {
            //       console.log(
            //         "getDismissedReason ::",
            //         notification.getDismissedReason()
            //       );
            //     }
            //   });

        }
    }, []);

    useEffect(() => {
        if (!user.email) {
            oneTap()
        }
    }, [user, oneTap]);

    const handleCredentialResponse = async (response: any) => {
        const credential = response.credential;

        if (credential) {
            const loginResponse = await googleOneTapLogin(credential);
            if (loginResponse) {
                // console.log('Login successful:', loginResponse);
                window.location.reload();
            }
        }
    };

    return null;
};

export default GoogleOneTapLogin;
