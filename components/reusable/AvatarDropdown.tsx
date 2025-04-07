"use client";
import React from "react";
import { PopoverContent } from "@/components/ui/popover";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaCog } from "react-icons/fa";
import { RiLayout5Fill, RiLogoutCircleRFill } from "react-icons/ri";
import { UserDetailsType } from "@/utils/types";
import { ProgressBarLink } from "@/app/progress-bar";
import { logUserOut } from "@/utils/helpers/api";
import { useToast } from "../ui/use-toast";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const CEDIRATES_USER = "cedirates_user";
type Props = {
  user: UserDetailsType;
};

const AvatarDropdown = ({ user }: Props) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // const logout = await axios.delete(`/api/v1/auth/logout`);
      const logout = await logUserOut();
      if (logout.success === true) {
        toast({
          variant: "success",
          title: "Logout Successful",
        });
        // console.log("Logout successful:", logout);
        sessionStorage.removeItem(CEDIRATES_USER);

        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <ProgressBarLink href={"/settings"}>
        <DropdownMenuItem className="cursor-pointer py-3">
          <span>
            <FaCog />
          </span>
          Edit Profile
        </DropdownMenuItem>
      </ProgressBarLink>
      {user?.role === "admin" && (
        <a
          href="https://admin.cedirates.com"
          className="flex items-center gap-3"
        >
          <DropdownMenuItem className="cursor-pointer py-3">
            <span>
              <RiLayout5Fill />
            </span>
            Admin Dashboard
          </DropdownMenuItem>
        </a>
      )}
      <DropdownMenuItem
        className="cursor-pointer text-center text-red-600 font-semibold py-3 !hover:text-red-600"
        onClick={handleLogout}
      >
        <span>
          <RiLogoutCircleRFill />
        </span>
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default AvatarDropdown;
