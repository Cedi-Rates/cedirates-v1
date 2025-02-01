import React from "react";
import Image from "next/image";
const eventItem = require('../../assets/images/dummy-event.png')
import style from "../../assets/styles/company.module.css";

const EventItem = () => {
  return (
    <div className={style.event}>
      <Image
        className={style.eventImage}
        src={eventItem}
        alt="eventImage"
      />
      <div className={style.eventDetails}>
        <p className={style.eventTitle}>The allied event 2023</p>
        <p className={style.eventDesc}>
          Join us for a day of cars, entertainment, and community! Admire
          stunning vehicles
        </p>
        <div className={style.badge} style={{ width: "fit-content" }}>
          13 Jun 2023
        </div>
      </div>
    </div>
  );
};

export default EventItem;
