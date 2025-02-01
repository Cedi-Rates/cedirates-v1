import React from "react";
import Header from "@/components/navbar/Header";
import styles from "@/assets/styles/currencyConverter.module.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BiTransferAlt } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MobileNav } from "@/components/mobile-nav";

export interface LoadingProps {
  user: any;
}

export function loading({ user }: LoadingProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.div1}>
            <p className={styles.h1}>Convert from US Dollar to Ghanaian Cedi</p>
            <p>CediRates Currency Converter</p>
          </div>
          <div className={styles.div3}>
            <form>
              <div>
                <div className="grid w-full flex-[100%] items-center gap-1.5">
                  <Label htmlFor="email" className="font-semibold">
                    Amount
                  </Label>
                  <Input required inputMode="decimal" className="max-w-none" />
                </div>
                <div className="w-full flex flex-row gap-[10px] items-center">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="font-semibold">
                      From
                    </Label>
                    <Select value="">
                      <SelectTrigger className="w-full font-medium">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            className="font-medium"
                            value="jnjnj"
                          ></SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-[999px] mt-4 aspect-square px-0"
                  >
                    <BiTransferAlt color="#1697FD" size={24} />
                  </Button>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="font-semibold">
                      To
                    </Label>
                    <Select value="">
                      <SelectTrigger className="w-full font-medium">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            className="font-medium"
                            value="jnknk"
                          ></SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center gap-spacing-4 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary !text-white hover:bg-primary-brand-primary-600 active:bg-primary-brand-primary-700 disabled:bg-primary-brand-primary-50 disabled:text-primary-brand-primary-300 h-10 px-spacing-12 py-2.5 rounded-radius-lg w-full sm:w-auto font-semibold"
                type="submit"
              >
                Convert
              </button>
            </form>
          </div>
          <div
            className={styles.div2}
            style={{
              paddingTop: "160px",
            }}
          >
            <Skeleton className="w-full h-[350px] rounded-xl" />
          </div>
        </div>
      </main>
      <MobileNav user={user} />
    </>
  );
}

export default loading;
