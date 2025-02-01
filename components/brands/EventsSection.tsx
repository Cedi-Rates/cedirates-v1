import React from "react";
import style from "../../assets/styles/premiumListing.module.css";
import { CompleteCompanyDetailsType, SingleEventType } from "@/utils/types";
import Calendar from "@/assets/Icons/Calendar";
import EventItem from "../events/item";

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  events: SingleEventType[];
};

const EventsSection = ({ companyDetails, events }: Props) => {
  return(
    <div className={style["events-section"]}>
      <p>Events</p>
      <div className={style.events}>
        {events?.length >= 1 ? (
          events.map((event, index) => (
            <EventItem key={index} {...event} />
          ))
        ) : (
          <div className={style.noEvents}>
            <Calendar />
            <p>
              {companyDetails.company?.companyName} has no upcoming events yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
