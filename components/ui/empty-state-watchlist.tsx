import { cn } from "@/lib/utils";
import { Button } from "./button";

export const EmptyState: (props: any) => React.ReactNode = () => (
  <div className="w-full sm:max-w-md mx-auto flex flex-col space-y-2 px-2 my-16 ">
    <NotFoundVisual />

    <h3 className="font-semibold text-xl mb-2 text-center">
      Your watchlist is empty
    </h3>
    <p className="text-center text-black/60">
      Start building your personalized watchlist by adding your favorite
      companies from the Fuel Prices or Exchange Rates page.
    </p>

    <div className="flex justify-center space-x-5 !my-5">
      <a href="/exchange-rates">
        <Button>Exchange Rates</Button>
      </a>
      <a href="/fuel-prices">
        <Button>Fuel Prices</Button>
      </a>
    </div>
  </div>
);

const NotFoundVisual = () => {
  return (
    <div className="relative w-[200px] sm:w-[250px] h-[150px] sm:h-[200px] rounded-[8px] bg-blue-100 z-0 self-center ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-4 z-10">
        <NotFoundVisualCard className="-translate-x-8" />
        <NotFoundVisualCard className="translate-x-8" />
        <NotFoundVisualCard className="-translate-x-8" />
      </div>
    </div>
  );
};

const NotFoundVisualCard: (props: any) => React.ReactNode = ({
  className,
}: {
  className?: string;
}) => (
  <>
    <div
      className={cn(
        className,
        " space-y-1 sm:space-y-2 bg-white w-full p-1 rounded-[8px] z-60 flex shadow-[0_2px_6px_#00000010] items-center "
      )}
    >
      <div className="h-6 w-6 mr-2 sm:h-8 sm:w-8 bg-blue-300 rounded-[4px]  " />

      <div className="space-y-1 sm:space-y-2  w-full flex flex-col ">
        <div className="h-[6px] sm:h-2 bg-blue-200 w-1/4 rounded-full" />
        <div className="h-[6px] sm:h-2 bg-indigo-100 w-1/2 rounded-full" />
      </div>
    </div>
  </>
);
