import React from "react";
import Image from "next/image";
import ShieldCheck from "../../assets/images/shield-check.svg";
import Checklist from "../../assets/images/checklist.svg";
import UserReviews from "../../assets/images/user-reviews.svg";

const Reasons = () => {
  return (
    <div className="reasons mb-24 grid lg:grid-cols-3">
      <div className="mt-20 px-8 text-center flex flex-col justify-center items-center w-[95%]">
        <Image
          src={ShieldCheck}
          alt="shieldCheck"
          priority={true}
          height={70}
        />
        <h3 className="text-[23px] font-semibold mb-2">Trusted Sources</h3>
        <p className="max-w-[30rem] text-[15px] text-gray-400">
          We have partnerships with the top companies and our data is provided
          directly and verified.
        </p>
      </div>
      <div className="mt-20 px-8 text-center flex flex-col justify-center items-center w-[95%]">
        <Image src={Checklist} alt="checklist" priority={true} height={70} />
        <h3 className="text-[23px] font-semibold mb-2">
          Personalised Watchlist
        </h3>
        <p className="max-w-[30rem] text-[15px] text-gray-400">
          Effortlessly manage your watchlist. Set up personalized alerts for
          price changes and fluctuations to stay informed.
        </p>
      </div>
      <div className="mt-20 px-8 text-center flex flex-col justify-center items-center w-[95%]">
        <Image
          src={UserReviews}
          alt="userReviews"
          priority={true}
          height={70}
        />
        <h3 className="text-[23px] font-semibold mb-2">User Reviews</h3>
        <p className="max-w-[30rem] text-[15px] text-gray-400">
          See what others have to say about the listed companies and make your
          own decisions.
        </p>
      </div>
    </div>
  );
};

export default Reasons;
