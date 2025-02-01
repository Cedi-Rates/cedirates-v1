"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineChevronRight,
  MdOutlineHomeWork,
  MdOutlineHome,
} from "react-icons/md";
import HomeDialog from "./dialogs/home-dialog";
import OtherDialog from "./dialogs/other-dialog";

const LocationDetails = () => {
  const [homeDialog, setHomeDialog] = useState(false);
  const [otherDialog, setOtherDialog] = useState(false);

  const [updatedHome, setUpdatedHome] = useState(null);
  const [updatedOther, setUpdatedOther] = useState(null);

  return (
    <div className="mt-6">
      <h2 className="text-paragraph-sm-medium text-[#818181] leading-2 my-2">
        Places
      </h2>
      <div className="rounded-[12px] bg-[#f2f7f899] border-0">
        {/* Home Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setHomeDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineHome size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Home
              </h2>
            </div>
            <div>
              <div>
                <div className="text-[#818181] flex">
                  <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                    {updatedHome ?? "Add"}
                  </p>
                  <MdOutlineChevronRight size={25} />
                </div>
              </div>
            </div>
          </div>
          <HomeDialog
            open={homeDialog}
            handleClose={() => setHomeDialog(false)}
            setInfoFunc={setUpdatedHome}
          />
        </>

        {/* Other Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setOtherDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineHomeWork size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Other
              </h2>
            </div>
            <div>
              <div>
                <div className="text-[#818181] flex">
                  <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                    {updatedOther ?? "Add"}
                  </p>
                  <MdOutlineChevronRight size={25} />
                </div>
              </div>
            </div>
          </div>
          <OtherDialog
            open={otherDialog}
            handleClose={() => setOtherDialog(false)}
            setInfoFunc={setUpdatedOther}
          />
        </>
      </div>
    </div>
  );
};

export default LocationDetails;
