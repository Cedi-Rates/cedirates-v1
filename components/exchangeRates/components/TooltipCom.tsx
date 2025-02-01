import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsInfo } from "react-icons/bs";

const TooltipCom = ({ content }: { content: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="bg-[#3a3a3a52] rounded-full ml-1">
          <span className=" text-[1rem] text-white right-5 top-[14.5px] rounded-full cursor-pointer">
            <BsInfo />
          </span>
        </TooltipTrigger>
        <TooltipContent className="z-50">
          <div className="w-40">
            <p>{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCom;
