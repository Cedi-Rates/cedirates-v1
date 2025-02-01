"use client"
import React, { useState } from 'react';
import { forexCompanyFaqs, fuelCompanyFaqs } from '@/utils/data';
import { CompleteCompanyDetailsType } from '@/utils/types';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"  

type Props = {
    companyDetails: CompleteCompanyDetailsType;
};

const Faqs = ({ companyDetails }: Props) => {
    const faqData = companyDetails.company?.category === 'exchangeRates' ? forexCompanyFaqs : fuelCompanyFaqs;

    return (
        <div>
            <div className="mb-10">
                <p className="text-paragraph-md-bold text-start tracking-normal mb-2">
                    Frequently Asked Questions About {companyDetails.company?.companyName}.
                    {/* <span
                        onClick={handleFaqs}
                        className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer font-medium"
                    >
                        {faqs ? 'Hide' : 'Show'}
                    </span> */}
                </p>
                    <Accordion type="single" collapsible>
                        {faqData.map((item) => (
                            <AccordionItem key={item.value} value={item.value}>
                                <AccordionTrigger className="fill-[#0d1421] text-start text-paragraph-sm-medium hover:!no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="fill-[#58667e] text-[#58667e] text-[14px] text-start tracking-normal">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
            </div>
        </div>
    )
}

export default Faqs
