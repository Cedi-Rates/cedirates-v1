"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineSpeed,
  MdOutlineChevronRight,
  MdOutlineCommute,
} from "react-icons/md";

import VehicleDialog from "./dialogs/vehicle-dialog";
import DriverDialog from "./dialogs/driver-dialog";
import { UserContext } from "../SettingsPage";

const VehicleDetails = () => {
  const [vehicleDialog, setVehicleDialog] = useState(false);
  const [driverDialog, setDriverDialog] = useState(false);

  const [updatedVehicle, setUpdatedVehicle] = useState({
    year: "",
    make: "",
    model: "",
  });
  const [updatedDriverType, setUpdatedDriverType] = useState("");

  return (
    <div className="mt-6">
      {" "}
      <h2 className="text-paragraph-sm-medium text-[#818181] leading-2 my-2">
        Garage
      </h2>
      <div className="rounded-[12px] bg-[#f2f7f899] border-0">
        {/* Vehicle Dialog */}
        <>
          {" "}
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setVehicleDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineCommute size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Vehicle
              </h2>
            </div>
            <div>
              {/* <DialogTrigger className="flex items-center gap-2 text-[#808080]">
                {formData.vehicle &&
                formData.vehicle?.year &&
                formData.vehicle?.make &&
                formData.vehicle?.model
                  ? `${formData.vehicle.year} ${formData.vehicle.make} ${formData.vehicle.model}`
                  : "ADD"}
                <MdOutlineChevronRight />
              </DialogTrigger> */}

              <div>
                <div className="text-[#818181] flex">
                  <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                    {updatedVehicle?.year === "" ||
                    updatedVehicle?.make === "" ||
                    updatedVehicle?.model === ""
                      ? "Add"
                      : `${updatedVehicle?.year} ${updatedVehicle?.make} ${updatedVehicle?.model}`}
                  </p>
                  <MdOutlineChevronRight size={25} />
                </div>
              </div>
            </div>
          </div>{" "}
          <VehicleDialog
            open={vehicleDialog}
            handleClose={() => setVehicleDialog(false)}
            setInfoFunc={setUpdatedVehicle}
          />
        </>

        {/* Driver Type Dialog */}
        <>
          <div
            className="flex justify-between p-4 border-0 border-b-2 border-[#fff] cursor-pointer"
            onClick={() => setDriverDialog(true)}
          >
            <div className="flex flex-row items-center gap-3">
              <MdOutlineSpeed size={18} color="#818181" />
              <h2 className="text-paragraph-sm-medium md:text-paragraph-md-medium text-[#363636]">
                Driver
              </h2>
            </div>
            <div>
              <div>
                <div className="text-[#818181] flex">
                  <p className="text-paragraph-sm-regular md:text-paragraph-md-regular capitalize text-left">
                    {updatedDriverType ? updatedDriverType : "Add"}
                  </p>
                  <MdOutlineChevronRight size={25} />
                </div>
              </div>
            </div>
          </div>{" "}
          <DriverDialog
            open={driverDialog}
            handleClose={() => setDriverDialog(false)}
            setInfoFunc={setUpdatedDriverType}
          />
        </>
      </div>
    </div>
  );
};

export default VehicleDetails;
