import axios from "axios";

// interface any {
//   averageDollar: {
//     buyingRate: number;
//     sellingRate: number;
//   };
//   averageEuro: {
//     buyingRate: number;
//     sellingRate: number;
//   };
//   averagePound: {
//     buyingRate: number;
//     sellingRate: number;
//   };
//   date: string;
// }

interface ExchangeRates {
  buying: string[];
  selling: string[];
  date: string[];
  [key: string]: string[];
}

interface FuelPrices {
  petrol: string[];
  diesel: string[];
  premium: string[];
  date: string[];
  [key: string]: string[];
}

export const getChartData = async (name: any, tab: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/exchangerates/getall/${name}/?page=1&limit=10000`
    );
    const { data }: any = response.data;

    const arrays: ExchangeRates = {
      buying: [],
      selling: [],
      date: [],
    };

    const temp = Array.isArray(data)
      ? data.filter((item: any) => item?.rates[tab])
      : [];

    temp.forEach((item: any) => {
      arrays["buying"].push(
        (Math.floor(item?.rates[tab].buyingRate * 100) / 100).toFixed(2) ?? ""
      );
      arrays["selling"].push(
        (Math.floor(item?.rates[tab].sellingRate * 100) / 100).toFixed(2) ?? ""
      );
      arrays["date"].push(item.date);
    });

    const chartData = {
      labels: arrays["date"],
      datasets: [
        {
          label: "Buying",
          data: arrays.buying,
        },
        {
          label: "Selling",
          data: arrays.selling,
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFuelChartData = async (name: any): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/fuelprices/getall/${name}/?page=1&limit=10000`
    );
    const { data }: any = response.data;

    const arrays: FuelPrices = {
      petrol: [],
      diesel: [],
      premium: [],
      date: [],
    };

    const temp = Array.isArray(data)
      ? data.filter((item: any) => item?.prices)
      : [];

    temp.forEach((item: any) => {
      arrays["petrol"].push(item?.prices.petrol?.toFixed(2) ?? "");
      arrays["diesel"].push(item?.prices.diesel?.toFixed(2) ?? "");
      arrays["premium"].push(item?.prices.premium?.toFixed(2) ?? "");
      arrays["date"].push(item.date);
    });

    const chartData = {
      labels: arrays["date"],
      datasets: [
        {
          label: "Petrol",
          data: arrays.petrol,
        },
        {
          label: "Diesel",
          data: arrays.diesel,
        },
        {
          label: "Premium",
          data: arrays.premium,
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error(error);
    return false;
  }
};
