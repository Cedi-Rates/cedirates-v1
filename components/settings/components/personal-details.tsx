"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineChevronRight,
  MdOutlinePersonAddAlt,
  MdOutlineCake,
  MdPersonOutline,
} from "react-icons/md";
import { format } from "date-fns";

import NameDialog from "./dialogs/name-dialog";
import BirthdayDialog from "./dialogs/birthday-dialog";
import GenderDialog from "./dialogs/gender-dialog";
import { UserContext } from "../SettingsPage";

const PersonalDetails = () => {
  const [nameDialog, setNameDialog] = useState(false);
  const [birthdayDialog, setBirthdayDialog] = useState(false);
  const [genderDialog, setGenderDialog] = useState(false);

  const [nameObject, setNameObject] = useState({
    firstName: "",
    lastName: "",
  });
  const [updatedGender, setUpdatedGender] = useState("");
  const [updatedBirthday, setUpdatedBirthday] = useState<number | Date>();

  return (
    <div className="mt-6">
      <h2 className="text-paragraph-sm-medium text-[#818181] leading-2 my-2">
        Basics
      </h2>
      <div className="rounded-[12px] bg-[#f2f7f899] border-0">
        {/* Name Dialog */}
        <>
          <div
            className="flex justify-between p-4  border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setNameDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdPersonOutline size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Name
              </h2>
            </div>
            <div className="text-[#818181] flex">
              <p className="block text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left xs:hidden">
                {nameObject?.firstName && nameObject?.lastName
                  ? nameObject?.firstName?.length +
                      nameObject?.lastName?.length >
                    15
                    ? `${
                        nameObject?.firstName || ""
                      } ${nameObject?.lastName?.slice(0, 5)}...`
                    : `${nameObject?.firstName || ""} ${
                        nameObject?.lastName || ""
                      }`
                  : "Add"}
              </p>
              <p className="hidden text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left xs:block">
                {nameObject?.firstName === "" || nameObject?.lastName === ""
                  ? "Add"
                  : `${nameObject?.firstName} ${nameObject?.lastName}`}
              </p>
              <MdOutlineChevronRight size={25} />
            </div>
          </div>
          <NameDialog
            open={nameDialog}
            handleClose={() => setNameDialog(false)}
            setInfoFunc={setNameObject}
          />
        </>

        {/* Birthday Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setBirthdayDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineCake size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Birthday
              </h2>
            </div>
            <div className="text-[#818181] flex">
              <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                {updatedBirthday ? format(updatedBirthday, "PPP") : "Add"}
              </p>

              <MdOutlineChevronRight size={25} />
            </div>
          </div>{" "}
          <BirthdayDialog
            open={birthdayDialog}
            handleClose={() => setBirthdayDialog(false)}
            setInfoFunc={setUpdatedBirthday}
          />
        </>

        <>
          {/* Gender Dialog */}
          <div
            className="flex justify-between p-4 border-0 cursor-pointer"
            onClick={() => setGenderDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlinePersonAddAlt size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Gender
              </h2>
            </div>
            <div className="text-[#818181] flex">
              <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                {updatedGender ? updatedGender : "Add"}
              </p>

              <MdOutlineChevronRight size={25} />
            </div>
          </div>
          <GenderDialog
            open={genderDialog}
            handleClose={() => setGenderDialog(false)}
            setInfoFunc={setUpdatedGender}
          />
        </>
      </div>
    </div>
  );
};

export default PersonalDetails;
