"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id, title, description, action, link, ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid">
              <div className="flex items-center justify-between">
                {title && <ToastTitle>{title}</ToastTitle>}
                <ToastClose />
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              <div className="space-x-4 space-y-2">
                {action}
                {link}
              </div>
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}