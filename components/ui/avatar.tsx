"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import AvatarIndicator from "./avatarIcons/avatarIndicator";
import BadgeIcon from "./avatarIcons/badge";

const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];
const sizeToPX = ['24px', '32px', '40px', '48px', '56px', '64px', '96px', '128px'];
const textSizeToPX = ['10px', '14px', '16px', '18px', '20px', '24px', '30px', '48px'];
const indicatorSizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
type Indicator = 'online' | 'offline' | 'badge' | 'none';

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size: Size;
  name?: string;
  image?: string;
  indicator?: Indicator;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, indicator, name, image, ...props }, ref) => {
  const sizeIndex = sizes.findIndex(s => s === size);
  const avatarSize = sizeIndex !== -1 ? sizeToPX[sizeIndex] : sizeToPX[3];
  const textSize = sizeIndex !== -1 ? textSizeToPX[sizeIndex] : textSizeToPX[3];

  // Extract initials from the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "flex shrink-0 bg-backgroundInfo overflow-visible rounded-full",
        className
      )}
      style={{
        height: avatarSize,
        width: avatarSize,
      }}
      {...props}
    >
      {indicator === 'badge' && indicatorSizes.includes(size) && <BadgeIcon size={size as Size} />}
      {indicator === 'online' && indicatorSizes.includes(size) && <AvatarIndicator size={size as Size} mode='active' />}
      {indicator === 'offline' && indicatorSizes.includes(size) && <AvatarIndicator size={size as Size} mode='inactive' />}

      {image ? (
        <AvatarImage className="h-full w-full rounded-full" src={image} alt={name} />
      ) : (
        <AvatarFallback className="h-full w-full text-xl font-semibold text-primary" style={{ fontSize: textSize }}>
          {name ? getInitials(name) : "?"}
        </AvatarFallback>
      )}
    </AvatarPrimitive.Root>
    </div>
  );
});

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };