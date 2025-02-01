"use client";

import React, { forwardRef, useState, useCallback } from "react";

import { motion, AnimationProps } from "framer-motion";

import { tv } from "tailwind-variants";

import { ExclamationCircle } from "@medusajs/icons";

interface InputFocusBlurProps extends React.ComponentProps<"input"> {
  feedbackError?: string;
}

const EIXO_X_PLACEHOLDER = 24;
const STANDARD_DURATION = 0.3;

const inputFocusBlurStyles = tv({
  slots: {
    baseStyle: `w-full h-[42px] px-3 flex items-center rounded-[0.375rem] border border-neutral-200 focus-within:ring-indigo-100 focus-within:ring-[3px] focus-within:border-indigo-600 
        bg-neutral-100 transition-all duration-200 relative data-[filled=true]:border-border-600`,
    inputStyle: `flex-1 h-full py-2 outline-none text-sm text-neutral-700 bg-transparent relative z-[9999] placeholder:sr-only 
        disabled:cursor-not-allowed w-full data-[filled=true]:bg-[#fff]`,
    placeholderStyle: `text-sm text-neutral-500 absolute left-3`,
    feedbackErrorStyle: `flex items-center gap-1 text-xs text-red-300 mt-1`,
  },

  variants: {
    error: {
      true: {
        baseStyle: `border-red-300`,
      },
    },
    disabled: {
      true: {
        baseStyle: `bg-neutral-800 cursor-not-allowed`,
      },
    },
  },
});

const { baseStyle, inputStyle, placeholderStyle, feedbackErrorStyle } =
  inputFocusBlurStyles();

export const InputFocusBlur = forwardRef<HTMLInputElement, InputFocusBlurProps>(
  ({ placeholder, feedbackError = "", disabled, value, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const [internalValue, setInternalValue] = useState("");

    const handle = useCallback((type: "focus" | "blur") => {
      setIsFocus(type === "focus");
    }, []);

    function observeFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
      setInternalValue(event.target.value);
    }

    const isFilled = internalValue.length > 0 || !!value;
    const isFocusOrFilled = isFocus || isFilled;

    const isError = feedbackError.length > 0 && !disabled;

    const placeholderAnimation: AnimationProps["animate"] = isFocusOrFilled
      ? {
          x: EIXO_X_PLACEHOLDER,
          filter: "blur(4px)",
          opacity: 0,
        }
      : {
          x: 0,
        };

    return (
      <div className="w-full">
        <div
          className={baseStyle({ error: isError, disabled })}
          data-filled={isFilled}
        >
          <input
            ref={ref}
            type="text"
            className={inputStyle()}
            placeholder={placeholder}
            onFocus={() => handle("focus")}
            onBlur={() => handle("blur")}
            onChange={observeFieldChange}
            disabled={disabled}
            value={value}
            {...props}
          />

          <motion.span
            className={placeholderStyle()}
            initial={{
              x: 0,
            }}
            animate={placeholderAnimation}
            transition={{
              easings: ["easeOut"],
              duration: STANDARD_DURATION,
            }}
          >
            {placeholder}
          </motion.span>
        </div>

        {isError && (
          <motion.span
            className={feedbackErrorStyle()}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: STANDARD_DURATION,
            }}
          >
            <ExclamationCircle scale={12} />
            {feedbackError}
          </motion.span>
        )}
      </div>
    );
  }
);

InputFocusBlur.displayName = "InputFocusBlur";
