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
import { ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
          <div>
            <div
              className={
                "flex gap-3 max-sm:w-full w-[640px] flex-col items-start justify-center relative -top-[100px]"
              }
            >
              {/* <p className="text-paragraph-md-semibold">Convert Any Amount</p> */}
              <Card className="w-full sm:p-4 p-2 shadow-sm bg-background-bg-secondary rounded-2xl">
                <CardContent>
                  <div className="">
                    {/* Input 1 */}
                    <div className="flex gap-0 bg-white p-2 rounded-xl flex-col">
                      <p className="text-paragraph-md-semibold mb-1 px-1">
                        Amount
                      </p>
                      <div className="bg-white flex flex-row items-center">
                        <Select>
                          <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                            <SelectValue>
                              <span
                                className={`bg-black rounded-full h-6 w-6 object-cover flex items-center justify-center`}
                              />
                              USD
                            </SelectValue>
                          </SelectTrigger>
                        </Select>
                        <div className="relative flex items-center w-full justify-end flex-row">
                          <Input
                            type="tel"
                            inputMode="decimal"
                            placeholder=""
                            className="!border-none !p-0 !w-auto !min-w-0 !max-w-full text-right border-transparent focus:!ring-offset-0 focus:border-transparent focus:!ring-0 focus:!outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="relative py-1.5 items-center flex">
                      <div className="absolute left-1/2 -translate-x-1/2 z-10">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 !rounded-full border-border-border-secondary hover:!bg-white !border"
                        >
                          <ArrowUpDown className="h-4 w-4 text-icon-icon-tertiary" />
                        </Button>
                      </div>
                      <div className="h-px bg-border left-1/2 translate-x-1/2 my-4 w-1/2" />
                    </div>

                    {/* Input 2 */}
                    <div className="flex gap-0 bg-white p-2 rounded-xl flex-col">
                      <p className="text-paragraph-md-semibold mb-1 px-1">
                        Converted to
                      </p>
                      <div className="bg-white flex flex-row items-center">
                        <Select>
                          <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                            <SelectValue>
                              <span
                                className={`bg-black rounded-full h-6 w-6 object-cover flex items-center justify-center`}
                              />
                              GHS
                            </SelectValue>
                          </SelectTrigger>
                        </Select>
                        <div className="relative flex items-center w-full justify-end flex-row">
                          <Input
                            type="tel"
                            inputMode="decimal"
                            placeholder=""
                            className="!border-none !p-0 !w-auto !min-w-0 !max-w-full text-right border-transparent focus:!ring-offset-0 focus:border-transparent focus:!ring-0 focus:!outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Current rate */}
                    <div className="flex items-end gap-2 justify-between">
                      <div className="flex flex-row items-end  gap-2">
                        <Select>
                          <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none mt-4 relative top-[7px]">
                            <SelectValue placeholder="Select rate type" />
                          </SelectTrigger>
                        </Select>

                        <p className="text-paragraph-sm-regular sm:text-paragraph-md-regular px-1">
                          rate
                        </p>
                      </div>
                      <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold px-1">
                        <Skeleton className="w-5 h-5 rounded-xl" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
