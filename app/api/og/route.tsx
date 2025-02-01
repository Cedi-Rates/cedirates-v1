import { getCompany } from "@/utils/helpers/api";
import moment from "moment";
import { ImageResponse } from "next/og";
import { fileURLToPath } from "url";
import template from "@/assets/images/template small.png";
import Image from "next/image";

moment.suppressDeprecationWarnings = true;

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const gellix = await fetch(
    new URL("../../../assets/fonts/Gellix-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const gellixBold = await fetch(
    new URL("../../../assets/fonts/Gellix-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const hasCompany = searchParams.has('company');
  const company = hasCompany
    ? searchParams.get('company')?.slice(0, 100)
    : 'A Company';

  const companyDetails = getCompany(company ?? ''
  );

  return new ImageResponse(
    (
      <div
        tw="h-full w-full items-center flex flex-col justify-center"
        style={{
          backgroundImage:
            "url('https://cediratesstorage.blob.core.windows.net/cedirates/image1724931067764-CediRates-Company-Template.jpg')",
          // `url(${template})`,
          // backgroundSize: "1140px 630px",
          backgroundSize: "900px 473px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          tw="flex flex-row items-center justify-center"
        >
          <Image
            tw="h-28 w-28 rounded-full mr-4"
            src={(await companyDetails).company.image}
            alt={(await companyDetails).company.companyName}
          />
          <div tw="flex flex-col">
            <p
              tw="text-white opacity-100 !m-0 h-min text-[48px]"
              style={{ fontFamily: "GellixBold" }}
            >
              {(await companyDetails).company.companyName}
            </p>
            <p
              tw="text-white -mt-5 !m-0 text-slate-300 text-[28px]"
              style={{ fontFamily: "Gellix" }}
            >
              {(await companyDetails).company.category.replace(/([A-Z])/g, (match) => ` ${match}`)
                .replace(/^./, (match) => match.toUpperCase())
                .trim()} Today
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 900,
      height: 473,
      fonts: [
        {
          name: "Gellix",
          data: gellix,
          style: "normal",
        },
        {
          name: "GellixBold",
          data: gellixBold,
          style: "normal",
        }
      ],
    }
  );
}