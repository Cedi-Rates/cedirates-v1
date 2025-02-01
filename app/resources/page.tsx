import React from "react";
import NavbarLight from "@/components/navbar/NavbarLight";
import style from "../../assets/styles/resources.module.css";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";

const Resources = async () => {
  const user = await getUser(cookies().toString());

  return (
    <div className={style.resources}>
      <GoogleOneTapLogin user={user} />
      <NavbarLight user={user} />
      <div className={style["resources-container"]}>
        <div className={style.text}>
          <h1>
            We are working tirelessly to make APIs for historical rates and
            prices availabe for public consumption. Come back here later and see
            if it&apos;s ready, or sign up and we&apos;ll send you a
            notification when it&apos;s ready.
          </h1>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Resources;
