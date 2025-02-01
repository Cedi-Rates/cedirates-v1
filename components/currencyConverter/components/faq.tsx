import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { addCommasToNumber } from "@/utils/currencyConverterFunc";

interface Props {
  ERD: any;
}

const FAQ: React.FC<Props> = ({ ERD }) => {
  return (
    <div>
      <p className="font-semibold text-2xl">
        Frequently Asked Questions (FAQs)
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-3 hover:no-underline">
            How much is 1 dollar to cedis?
          </AccordionTrigger>
          <AccordionContent>
            1 dollar in Ghana today is{" "}
            <span className="font-semibold text-blue-500">
              {ERD?.averageDollar.buyingRate.toFixed(2)} GHS
            </span>{" "}
            when converting from dollar to cedis
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="py-3 hover:no-underline">
            How much is 100 dollars to cedis?
          </AccordionTrigger>
          <AccordionContent>
            One hundred dollars in Ghana today is{" "}
            <span className="font-semibold text-blue-500">
              {addCommasToNumber(
                `${ERD?.averageDollar.buyingRate.toFixed(2) * 100}`
              )}{" "}
              GHS
            </span>{" "}
            when converting from dollar to cedis
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="py-3 hover:no-underline">
            What is the forex rate today?
          </AccordionTrigger>
          <AccordionContent>
            The forex rate today is{" "}
            <span className="font-semibold text-blue-500">
              {ERD?.averageDollar.buyingRate.toFixed(2)} GHS
            </span>{" "}
            when converting from dollar to cedis in Ghana
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="py-3 hover:no-underline text-start">
            How much is 100 cedis to dollar?
          </AccordionTrigger>
          <AccordionContent>
            100 Ghana Cedis is{" "}
            <span className="font-semibold text-blue-500">
              {addCommasToNumber(
                `${(100 / ERD?.averageDollar.sellingRate).toFixed(2)}`
              )}{" "}
              GHS
            </span>{" "}
            when converting to dollars
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="py-3 hover:no-underline text-start">
            What are the Bank of Ghana interbank exchange rates?
          </AccordionTrigger>
          <AccordionContent>
            BoG tracks how banks are exchanging money each working day by 2pm,
            and then publishes the average value. This helps people know the
            general rate at which money was exchanged on that day.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="py-3 hover:no-underline text-start">
            What are the rates used for online payments like Netflix or Shein?
          </AccordionTrigger>
          <AccordionContent>
            Online purchases are made using Visa rates with a bank fee of about
            7%
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
