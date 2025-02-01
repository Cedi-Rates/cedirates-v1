"use client"
import React, { useState, useEffect } from 'react'
import { getExchangeRates, getNavRates } from "@/utils/helpers/api";
import Image from 'next/image';
import Link from 'next/link';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

type Rate = {
    company: string;
    rates: { label: string; value: string }[];
};

const NavRates = () => {
    const [liveCompanyRates, setCompanyRates] = useState<any>([]);
    const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    useEffect(() => {
        async function fetchAndSetRates() {
            const rates = await getNavRates();
            setCompanyRates(rates)
        }

        fetchAndSetRates();
    }, [])
    // Rotate companies every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsRotating(true);
            setTimeout(() => {
                setCurrentCompanyIndex((prevIndex) =>
                    prevIndex === liveCompanyRates.length - 1 ? 0 : prevIndex + 1
                );
                setIsRotating(false);
            }, 500); // Rotate animation duration
        }, 8000);

        return () => clearInterval(interval);
    }, [liveCompanyRates?.length]);

    return (
        <Link href={`https://cedirates.com/company/${liveCompanyRates[currentCompanyIndex]?.company.url}`}>
            <div
                className="flex flex-row gap-3 w-max pe-2"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    overflow: "hidden",
                    transform: isRotating ? "translateY(10%)" : "translateY(0)",
                    opacity: isRotating ? 0 : 1,
                    transition: "transform 0.4s ease, opacity 0.3s ease",
                }}
            >
                <div className="flex flex-row w-max items-center gap-1">
                    {
                        liveCompanyRates.length > 0 ? (
                            <Image
                                alt={`Logo for ${liveCompanyRates[currentCompanyIndex]?.company?.companyName}`}
                                className="h-4 w-4 rounded-full"
                                src={liveCompanyRates[currentCompanyIndex]?.company?.image}
                                width={200}
                                height={200}
                                style={{
                                    display: isRotating ? "none" : "block",
                                    transition: "opacity 0.3s ease",
                                    opacity: isRotating ? 0 : 1,
                                }}
                            />
                        ) : (
                            <div
                                className="w-max"
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    backgroundColor: "#E0E0E0",
                                    animation: "pulse 1.5s ease-in-out infinite",
                                }}
                            />
                        )
                    }
                    {liveCompanyRates[currentCompanyIndex] ? (
                        <p className="text-paragraph-sm-semibold">
                            {liveCompanyRates[currentCompanyIndex]?.company?.companyName}
                        </p>
                    ) : (
                        <div
                            style={{
                                width: "60px",
                                height: "1.2rem",
                                backgroundColor: "#e0e0e0",
                                borderRadius: "4px",
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-2">
                    {liveCompanyRates[currentCompanyIndex]
                        ?
                        <>
                            {liveCompanyRates[currentCompanyIndex]['petrol'] ?
                                <><span className="flex flex-row items-center gap-1">
                                    <p className="text-paragraph-sm-medium capitalize text-text-text-quarternary">
                                        Petrol:
                                    </p>
                                    <p className="text-paragraph-sm-semibold flex flex-row items-center">₵{liveCompanyRates[currentCompanyIndex]?.petrol?.toFixed(2) ?? '00.00'} {liveCompanyRates[currentCompanyIndex]?.petrolInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : liveCompanyRates[currentCompanyIndex]?.petrolInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}</p>
                                </span>
                                    <span className="flex flex-row items-center gap-1">
                                        <p className="text-paragraph-sm-medium capitalize text-text-text-quarternary">
                                            Diesel:
                                        </p>
                                        <p className="text-paragraph-sm-semibold flex flex-row items-center">₵{liveCompanyRates[currentCompanyIndex]?.diesel?.toFixed(2) ?? '00.00'} {liveCompanyRates[currentCompanyIndex]?.dieselInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : liveCompanyRates[currentCompanyIndex]?.dieselInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}</p>
                                    </span></>
                                : <><span className="flex flex-row items-center gap-1">
                                    <p className="text-paragraph-sm-medium capitalize text-text-text-quarternary">
                                        Buying:
                                    </p>
                                    <p className="text-paragraph-sm-semibold flex flex-row items-center">₵{liveCompanyRates[currentCompanyIndex]?.dollarRates?.buyingRate?.toFixed(2) ?? '00.00'} {liveCompanyRates[currentCompanyIndex]?.dollarRates?.buyingInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : liveCompanyRates[currentCompanyIndex]?.dollarRates?.buyingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}</p>
                                </span>
                                    <span className="flex flex-row items-center gap-1">
                                        <p className="text-paragraph-sm-medium capitalize text-text-text-quarternary">
                                            Selling:
                                        </p>
                                        <p className="text-paragraph-sm-semibold flex flex-row items-center">₵{liveCompanyRates[currentCompanyIndex]?.dollarRates?.sellingRate?.toFixed(2) ?? '00.00'}  {liveCompanyRates[currentCompanyIndex]?.dollarRates?.sellingInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : liveCompanyRates[currentCompanyIndex]?.dollarRates?.sellingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}</p>
                                    </span>
                                    </>}
                        </>
                        : [1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "70px",
                                    height: "1.2rem",
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: "4px",
                                    marginTop: "0.15rem",
                                }}
                            />
                        ))}
                </div>
            </div>
        </Link>
    )
}

export default NavRates
