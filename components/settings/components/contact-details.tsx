"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineMailOutline,
  MdOutlineChevronRight,
  MdOutlineLocalPhone,
} from "react-icons/md";

import EmailDialog from "./dialogs/email-dialog";
import PhoneDialog from "./dialogs/phone-dialog";
import { UserContext } from "../SettingsPage";

const ContactDetails = () => {
  const [emailDialog, setEmailDialog] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);

  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  return (
    <div className="mt-6">
      <h2 className="text-paragraph-sm-medium text-[#818181] leading-2 my-2">
        Contacts
      </h2>
      <div className="rounded-[12px] bg-[#f2f7f899] border-0">
        {/* Email Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setEmailDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineMailOutline size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Email
              </h2>
            </div>
            <div>
              <div className="text-[#818181] flex">
                <p className="block text-paragraph-sm-regular md:text-paragraph-md-regular text-left xs:hidden">
                  {updatedEmail
                    ? updatedEmail.length > 15
                      ? `${updatedEmail.slice(0, 15)}...`
                      : updatedEmail
                    : "Add"}
                </p>

                <p className="hidden text-paragraph-sm-regular md:text-paragraph-md-regular text-left xs:block">
                  {updatedEmail ? updatedEmail : "Add"}
                </p>
                <MdOutlineChevronRight size={25} />
              </div>
            </div>
          </div>
          <EmailDialog
            open={emailDialog}
            handleClose={() => setEmailDialog(false)}
            setInfoFunc={setUpdatedEmail}
          />
        </>

        {/* Phone Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setPhoneDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineLocalPhone size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Phone
              </h2>
            </div>
            <div>
              <div className="text-[#818181] flex">
                <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                  {updatedPhone ? updatedPhone : "Add"}
                </p>
                <MdOutlineChevronRight size={25} />
              </div>
            </div>
          </div>
          <PhoneDialog
            open={phoneDialog}
            handleClose={() => setPhoneDialog(false)}
            setInfoFunc={setUpdatedPhone}
          />
        </>
      </div>
    </div>
  );
};

export default ContactDetails;
