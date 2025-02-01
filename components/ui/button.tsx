import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CiCirclePlus } from "react-icons/ci";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-spacing-4 whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary !text-white hover:bg-primary-brand-primary-600 active:bg-primary-brand-primary-700 disabled:bg-primary-brand-primary-50 disabled:text-primary-brand-primary-300",
        destructive:
          "bg-background-bg-error-solid !text-white hover:bg-destructive/90",
        outline:
          "border border-primary-brand-primary-500 bg-background-bg-primary !text-text-text-brand hover:bg-primary-brand-primary-50 active:bg-primary-brand-primary-100 disabled:border-none disabled:bg-background-bg-disabled disabled:text-text-text-disabled",
        secondary:
          "bg-background-bg-secondary !text-secondary-foreground hover:bg-background-bg-secondary-hover active:bg-background-bg-secondary-press disabled:bg-background-bg-disabled disabled:text-text-text-disabled",
        ghost: "!text-text-text-brand hover:bg-background-bg-brand-primary-hover active:bg-background-bg-primary-press disabled:bg-background-bg-disabled disabled:text-text-text-disabled",
        link: "underline-offset-4 hover:underline text-primary",
        secOutline: "border border-border-border-secondary text-text-text-secondary hover:bg-background-bg-secondary-hover",
        tabs: "!text-[#737373] hover:!text-primary"
      },
      size: {
        default: "h-10 px-spacing-12 py-2.5 text-paragraph-sm-semibold rounded-radius-lg",
        sm: "h-8 px-spacing-12 py-spacing-6 text-paragraph-sm-semibold rounded-radius-md",
        md: "h-10 px-spacing-12 py-2.5 text-paragraph-sm-semibold rounded-radius-lg",
        lg: "h-12 px-spacing-16 py-3.5 text-paragraph-sm-semibold rounded-radius-lg",
        icon: "h-10 w-10 rounded-radius-lg",
        smIcon: "h-8 w-8 p-spacing-8 rounded-radius-md",
        mdIcon: "h-10 w-10 rounded-radius-lg",
        lgIcon: "h-12 w-12 rounded-radius-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leading?: boolean;
  trailing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className, variant, size, asChild = false, leading = false, trailing = false, children, ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leading && <CiCirclePlus className="h-4 w-4" />}
        {children}
        {trailing && <CiCirclePlus className="h-4 w-4" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
