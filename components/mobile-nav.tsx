"use client";

import { Newspaper, DollarSign, Fuel, User, Watch, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProgressBarLink } from "@/app/progress-bar";
import AuthDialog from "./auth/AuthDialog";

export function MobileNav({
  user,
  show = true,
}: {
  user: any;
  show?: boolean;
}) {
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { pathname } = window.location;
      setCurrentPath(pathname);
    }
  }, []);

  const navigation = [
    {
      name: "News",
      href: "/",
      icon: Newspaper,
      path: "/",
    },
    {
      name: "Forex",
      href: "/exchange-rates/usd-to-ghs/",
      icon: DollarSign,
      path: "/exchange-rates/usd-to-ghs/",
    },
    {
      name: "Fuel",
      href: "/fuel-prices/gh/",
      icon: Fuel,
      path: "/fuel-prices/gh/",
    },
    {
      name: "Login",
      href: "#",
      icon: User,
      path: "#",
    },
    {
      name: "Watchlist",
      href: "/watchlist",
      icon: Star,
      path: "/watchlist",
    },
  ];

  const filteredNavigation = user?.email
    ? navigation.filter((item) => item.name !== "Login")
    : navigation.filter((item) => item.name !== "Watchlist");

  
  if (!show) return null;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 shadow-t bg-white md:hidden">
        <div className="h-16 flex justify-around">
          {filteredNavigation.map((item) => (
            <ProgressBarLink key={item.name} href={item.path}>
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-16",
                  currentPath === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
                onClick={
                  item.name === "Login"
                    ? (e) => {
                        e.preventDefault();
                        setIsDialogOpen(true);
                      }
                    : undefined
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            </ProgressBarLink>
          ))}
        </div>
      </nav>

      <AuthDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
