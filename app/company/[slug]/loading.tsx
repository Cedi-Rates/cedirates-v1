import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import style from "../../../assets/styles/company.module.css";
import styles from "../../../assets/styles/premiumListing.module.css";
import Header from "@/components/navbar/Header";
import { MobileNav } from "@/components/mobile-nav";

interface LoadingProps {
  user: any;
}

const SkeletonComponent = ({ user }: LoadingProps) => {
  return (
    <>
      <Header />

      <main className="max-w-[1450px] mx-auto mt-5 px-spacing-16 lg:px-spacing-96">
        <CompanyHeader />
        <div className={style["main-section"]}>
          <div className={style["review-section"]}>
            <RatesSection />
            <ReviewSection />
          </div>
          <EventsSection />
        </div>
      </main>
      <MobileNav user={user} />
    </>
  );
};

const CompanyHeader = () => (
  <>
    <div
      className={style.banner}
      style={{ background: "transparent !important" }}
    >
      <Skeleton className="w-full h-full bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
    </div>
    <div className={style["profile-info"]}>
      <div className={style["profile-picture"]}>
        <Skeleton className="w-full h-full rounded-full bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
      <div
        className={style["profile-container"]}
        // style={{
        //   justifyContent: "space-between !important",
        //   // marginTop: "50px",
        // }}
      >
        <div className={style["profile-info-text-up"]}>
          <div className={style["company-name-container"]}>
            <Skeleton className="w-[100%] md:w-[250px] h-[20px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
          <div className={style["subscriber-count"]}>
            <Skeleton className="w-[100%] md:w-[350px] h-[20px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
          <div className={style["desc-text"]}>
            <Skeleton className="w-[100%] md:w-[450px] h-[35px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
        </div>

        <div className={style["subscribe-section"]}>
          {/* <div className={style["contact-button"]}> */}
          <Skeleton className="rounded-md w-[250px] h-[30px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          {/* </div> */}
        </div>
      </div>
    </div>
    <div
      className={style["profile-info-text-down"]}
      // style={{
      //   transform: "translateY(60px)",
      //   position: "relative",
      //   left: "-120px",
      // }}
    >
      <div className={style["company-name-container"]}>
        <Skeleton className="w-[150px]  h-[20px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
      <div className={style["subscriber-count"]}>
        <Skeleton className="w-[200px]  h-[20px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
      <div className={style["desc-text"]}>
        <Skeleton className="w-[300px]  h-[35px] mb-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
    </div>
  </>
);

// // Example of a StatsSkeleton component
const RatesSection = () => (
  <div className={style["rates-section"]}>
    <div className="h-[1px] w-full bg-gray-200"></div>
    <div className="flex justify-between my-3">
      <div>
        {/* <p className="sm:text-[16px] text-[14px] mb-2 font-bold">
          {companyDetails?.company?.category === "fuelPrices"
            ? "Fuel Prices"
            : "Exchange Rates"}
        </p> */}
        <Skeleton className="rounded-md w-[150px] h-[30px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>

      <div className="">
        <Skeleton className="rounded-md w-[100px] md:w-[150px] h-[35px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
    </div>
    <div className={style.stats}>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div className={style["stat-card"]} key={index}>
            <Skeleton className="rounded-md w-full  h-full bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
        );
      })}
    </div>
    <div className="h-[1px] w-full bg-gray-200"></div>
  </div>
);

const ReviewSection = () => (
  <>
    <div>
      <div className={styles["headline-rating-review"]}>
        <Skeleton className="rounded-md w-[100px]  h-[20px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
        <Skeleton className="rounded-md w-[70px]  h-[20px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
      <div className={styles["info-section"]}>
        <div className={styles["average-rating"]}>
          <p className={styles["average-number"]}>
            <Skeleton className="rounded-md w-[70%] md:w-[90px]  h-[90px] md:h-[75px] md:mt-3 relative left-[-25px] md:left-[-115px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </p>
          <div className={styles["total-rating"]}>
            <Skeleton className="rounded-md w-[40px] relative right-10 bottom-2 h-[20px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
        </div>

        <div className={styles["star-progress-sec"]}>
          <Skeleton className="rounded-md w-full  h-[90px] md:h-[75px] my-2 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />

          <div className={styles["total-rating-mini"]}>
            <Skeleton className="rounded-md w-[70px]  h-[20px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
        </div>
      </div>
    </div>
  </>
);

const EventsSection = () => (
  <div className={style["events-section"]}>
    <div className={style.events}>
      <Skeleton className="rounded-md w-full md:w-[420px] h-[400px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
    </div>
  </div>
);

export default SkeletonComponent;
