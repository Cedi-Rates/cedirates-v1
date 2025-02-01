import React from "react";
import Logo from "../../assets/images/verify-logo.svg";
import Image from "next/image";
import styles from "../../assets/styles/verification.module.css";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";

const Verification = async () => {
  const user = await getUser(cookies().toString());

  return (
    <div className={styles.verification}>
      <GoogleOneTapLogin user={user} />
      <NavbarLight user={user} />
      <div className={styles.main}>
        <div className={styles.info}>
          <div>
            <Image src={Logo} alt="logo" />
            <h2>Your request is under review</h2>
          </div>
          <p>
            Your request is being reviewed. This may take up to{" "}
            <span>48 hours</span>. We will send you an email when we have
            completed the review and you can also check back here for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
