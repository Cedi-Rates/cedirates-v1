import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  addCommasToNumber,
  convertCurrency
} from "@/utils/currencyConverterFunc";

interface Props {
  from: any;
  to: any;
  ERD: any;
}

const Tables: React.FC<Props> = ({ from, to, ERD }) => {
  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <div className="flex flex-row overflow-x-scroll w-max md:w-full gap-10 sm:gap-16 md:gap-10 xl:gap-16 px-[10px] sm:px-[20px] md:px-[30px] lg:px-[35px] xl:px-0">
        <div className="w-[95vw] md:w-full">
          <h1 className="bg-[#F1F5F9] text-center pt-3 px-2 rounded-t-xl w-full text-[24px] font-bold">
            Convert {from.fullName} to {to.fullName}
          </h1>
          <Table className="bg-white">
            <TableHeader className="bg-[#F1F5F9] w-full">
              <TableRow className="border-none">
                <TableHead className="text-center text-[16px]">
                  {from.emoji} {from.shortName.toUpperCase()}
                </TableHead>
                <TableHead className="text-center text-[16px]">
                  {to.emoji} {to.shortName.toUpperCase()}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  1 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(1, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  5 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(5, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  10 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(10, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  25 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(25, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  50 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(50, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  100 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(100, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  500 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(500, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  1,000 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(1000, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  5,000 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(5000, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  10,000 {from.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(10000, from, to, ERD))}{" "}
                  {to.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="w-[95vw] md:w-full">
          <h1 className="bg-[#F1F5F9] text-center pt-3 px-2 rounded-t-xl w-full text-[24px] font-bold">
            Convert {to.fullName} to {from.fullName}
          </h1>
          <Table className="bg-white">
            <TableHeader className="bg-[#F1F5F9] w-full">
              <TableRow className="border-none">
                <TableHead className="text-center text-[16px]">
                  {to.emoji} {to.shortName.toUpperCase()}
                </TableHead>
                <TableHead className="text-center text-[16px]">
                  {from.emoji} {from.shortName.toUpperCase()}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  1 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(1, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  5 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(5, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  10 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(10, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  25 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(25, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  50 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(50, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  100 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(100, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  500 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(500, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  1,000 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(1000, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  5,000 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(5000, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="font-semibold py-2 text-center text-blue-500">
                  10,000 {to.shortName.toUpperCase()}
                </TableCell>
                <TableCell className="text-center py-2 font-semibold">
                  {addCommasToNumber(convertCurrency(10000, to, from, ERD))}{" "}
                  {from.shortName.toUpperCase()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
