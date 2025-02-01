'use client'
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { IoIosInformationCircleOutline, IoMdClose } from 'react-icons/io'
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from '@/assets/images/iconlogo.svg'
import Marquee from "react-fast-marquee"

const alertVariants = cva(
  "w-full text-paragraph-sm-regular",
  {
    variants: {
      variant: {
        default: "bg-primary-brand-primary-500 text-white [&>svg]:text-white",
        destructive: "bg-background-bg-error-solid text-white dark:border-destructive [&>svg]:text-white",
        success: "bg-background-bg-success-solid text-white",
        warning: "bg-background-bg-warning-solid text-white",
        secondary: "bg-background-bg-quarternary text-text-text-primary",
        main: "bg-primary-brand-secondary-500 text-white"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> { }

function Alert({ className, variant, children, ...props }: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      <div className="h-10 max-w-[1450px] mx-auto py-spacing-6 px-spacing-16 lg:px-spacing-96 lg:py-spacing-12 flex items-center justify-between">
        <div className="flex-1 items-center flex gap-spacing-12 truncate">
          <div className="flex-none flex items-center justify-center gap-spacing-12">
            <Image src={logo} alt='Icon-Logo' />
          </div>
          <div className="sm:hidden text-paragraph-sm-regular leading-5">
            <Marquee autoFill pauseOnHover pauseOnClick>
              {children} <span className="px-5">{children}</span>
            </Marquee>
          </div>
          <div className="hidden sm:flex text-paragraph-sm-regular leading-5">
            {children}
          </div>
        </div>
        <IoMdClose
          className="cursor-pointer h-6 w-6 flex-shrink-0"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

export { Alert, alertVariants }




