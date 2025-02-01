import React, { useState } from "react";
import { RxCopy } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClipboardCopyProps {
  copyText: string;
  size: number;
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ copyText, size }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  const copyTextToClipboard = async (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* Bind our handler function to the onClick button property */}
      <TooltipProvider>
        <Tooltip open={isCopied}>
          <TooltipTrigger>
            <button onClick={handleCopyClick} id="copy-button">
              <RxCopy size={size} color="#676767d4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Copied!</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ClipboardCopy;
