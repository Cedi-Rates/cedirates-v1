"use client";
import { getInitials } from "@/utils/helpers/helperfunctions";
import { UserDetailsType } from "@/utils/types";
import React from "react";

type Props = {
  user: UserDetailsType;
};

const Avatar = ({ user }: Props) => {
  return (
    <div className="rounded-full bg-primary text-white h-9 w-9 md:h-10 md:w-10 xl:h-12 xl:w-12 flex items-center justify-center">
      <p className="text-[18px] md:text-[22px] text-thin">
        {getInitials(user)}
      </p>
    </div>
  );
};

export default Avatar;
