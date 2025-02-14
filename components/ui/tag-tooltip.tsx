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
    content: string
    icon: ReactNode
};

const TagTooltip = (
    { content, icon }: TooltipProps
) => {
    return (
        <div>
            <div className='hidden sm:block'>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            {icon}
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
                        {icon}
                    </PopoverTrigger>
                    <PopoverContent className='w-60 mx-4 text-sm'>
                        {content}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default TagTooltip
