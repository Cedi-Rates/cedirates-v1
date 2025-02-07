import React, { ReactNode } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BsInfo } from "react-icons/bs";
import Link from 'next/link';

interface TooltipProps {
    content: ReactNode
    icon: ReactNode
};

const InfoTooltip = (
    { content, icon }: TooltipProps
) => {
    return (
        <div>
            <div className='hidden sm:block'>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className="absolute text-[1rem] bg-icon-icon-disabled text-white right-5 top-[14.5px] rounded-full cursor-pointer">
                                {icon}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent className="z-50">
                            <div className="w-40">
                                {content}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className='sm:hidden'>
                <Popover>
                    <PopoverTrigger>
                        <span className="absolute text-[1rem] bg-icon-icon-disabled text-white right-5 top-[14.5px] rounded-full cursor-pointer">
                            {icon}
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className='w-60 mx-4'>
                        {content}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default InfoTooltip
