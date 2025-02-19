import { getCompanyDetails } from "@/utils/helpers/api";
import moment from "moment";
import { ImageResponse } from "next/og";
import { fileURLToPath } from "url";

moment.suppressDeprecationWarnings = true;
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const inter = await fetch(
    new URL("../../../assets/fonts/Inter-SemiBold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL("../../../assets/fonts/Inter-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const hasCompany = searchParams.has('company');
  const company = hasCompany
    ? searchParams.get('company')?.slice(0, 100)
    : 'A Company'
    ;

  const companyDetails = await getCompanyDetails(company ?? '');

  return new ImageResponse(
    (
      <div
        tw="h-full w-full items-center flex flex-col justify-center"
        style={{
          backgroundImage:
            "url('https://cediratesstorage.blob.core.windows.net/cedirates/image1724931067764-CediRates-Company-Template.jpg')",
          backgroundSize: "900px 473px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          tw="flex flex-row items-center justify-center"
        >
          <img
            tw="h-28 w-28 rounded-full mr-4"
            src={companyDetails.company?.image}
            alt={companyDetails.company?.companyName}
          />
          <div tw="flex flex-col">
            <p
              tw="text-white opacity-100 !m-0 h-min text-[48px]"
              style={{ fontFamily: "InterBold" }}
            >
              {companyDetails.company?.companyName}
            </p>
            <p
              tw="text-white -mt-5 !m-0 text-slate-300 text-[28px]"
              style={{ fontFamily: "Inter" }}
            >
              {companyDetails.company?.category.replace(/([A-Z])/g, (match) => ` ${match}`)
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
          name: "Inter",
          data: inter,
          style: "normal"
        },
        {
          name: "InterBold",
          data: interBold,
          style: "normal",
        }
      ]
    }
  );
}