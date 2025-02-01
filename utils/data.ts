export const fuelFaqs = [
    {
        value: "item-1",
        question: "How often do fuel prices change?",
        answer: "There are two main pricing windows for changing fuel prices each month. This usually happens at the beginning of the month (from the 1st) and the middle of the month (from the 16th)."
    },
    {
        value: "item-2",
        question: "How can I check historical prices for a company?",
        answer: "You can check historical price data by tapping on the company's name to open its full profile and chart. This will display past price trends and movements, on average Petrol is selling for ₵[averagePetrol] per litre while Diesel is ₵[averageDiesel] per litre."
    },
    {
        value: "item-3",
        question: "Why do filling stations have different names for fuel?",
        answer: `<b style="font-weight: bold;">Premium Motor Spirit (PMS):</b> This is Petrol which is used in regular cars, motorcycles, and small engines. Some brand names include V-Power, Super-XP and <a style="text-decoration: underline; color: #1896FE;" href="/company/jp/">J-Supreme</a>. <br/> <b>Automotive Gas Oil (AGO):</b> This is another name for regular Diesel which is used in trucks, buses, generators, and some big SUVs. If your car is diesel-powered, never use petrol.`
    },
    {
        value: "item-4",
        question: "What is RON 91 and RON 95?",
        answer: `"RON" stands for Research Octane Number, which measures how well petrol resists knocking (a bad engine problem). RON 91 works fine for most cars and motorbikes in Ghana. RON 95 gives more power and is recommended for newer or performance-focused cars.`
    },
    {
        value: "item-5",
        question: "What are the biggest filling stations in Ghana?",
        answer: `The top 3 filling stations in Ghana are <a style="text-decoration: underline; color: #1896FE;" href="/company/goil/">Goil,</a> <a style="text-decoration: underline; color: #1896FE;" href="/company/staroil/">StarOil</a> and Vivo Energy (<a style="text-decoration: underline; color: #1896FE;" href="/company/shell/">Shell</a>).`
    },
    {
        value: "item-6",
        question: "What is the best lubricant?",
        answer: "Most of the top filling stations sell their own branded lubricants with various formulations. Consult with your mechanic on which lubricant to use for your vehicle."
    },

];

export const exchangeFaqs = [
    {
        value: "item-1",
        question: "Explain the buying and selling rate",
        answer: `The <b>Buying Rate</b> is used to change Dollars (or Pounds & Euros) to Cedis. <b>Example</b>: If the buying rate is [dollarBuying] cedis, it means the bank or forex bureau will give you [dollarBuying] cedis for every 1 dollar you give to them. <br /> The <b>Selling Rate</b> is used to change Ghanaian Cedis to Dollars (or Pounds & Euros). <b>Example</b>: If the selling rate is [dollarSelling] cedis, it means you need to give [dollarSelling] cedis to get 1 dollar from the bank or forex bureau.`
    },
    {
        value: "item-2",
        question: "How can I check historical prices for a company?",
        answer: "You can check historical price data by tapping on the company's name to open its full profile and chart. This will display past price trends and movements."
    },
    {
        value: "item-3",
        question: "Why are the rates different?",
        answer: `<a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">Banks</a> and <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/forex-bureaus/">forex bureaus</a> make a profit by selling currency at a higher price than they buy it. The difference between the buying and selling rate is called the spread, and the midpoint is known as the midrate`
    },
    {
        value: "item-4",
        question: "How much is $100 dollars worth in Ghana cedis now?",
        answer: `$100 is currently equivalent to GHS [dollarBuyingMultiplied]. For real-time conversions and the latest rates, use our <a style="text-decoration: underline; color: #1896FE;" href="/currency-converter/">Currency Converter</a>.`
    },
    {
        value: "item-5",
        question: "How much do I need in cedis to get 100 dollars?",
        answer: `You need ₵[dollarSellingMultiplied] to get $100. For real-time conversions and the latest rates, use our <a style="text-decoration: underline; color: #1896FE;" href="/currency-converter/">Currency Converter</a>.`
    },
];

export const banksFaqs = [
    {
        value: "item-1",
        question: "What are the BoG exchange rates?",
        answer: `The interbank exchange rate posted by the <a style="text-decoration: underline; color: #1896FE;" href="/company/bank-of-ghana/">Bank of Ghana</a> (currently ₵[bankDollarSelling]) is the rate that banks use when trading large amounts of foreign currencies with one another. Unfortunately, this rate is pretty much always reserved for banks, and other relevant institutions that trade currencies in huge quantities, which means the average person making a smaller forex conversion will be given a higher rate.`
    },
    {
        value: "item-2",
        question: "Explain the buying and selling rate",
        answer: `The <b>Buying Rate</b> is used to change Dollars (or Pounds & Euros) to Cedis. <b>Example</b>: If the buying rate is [dollarBuying] cedis, it means the bank or forex bureau will give you [dollarBuying] cedis for every 1 dollar you give to them. <br /> The <b>Selling Rate</b> is used to change Ghanaian Cedis to Dollars (or Pounds & Euros). <b>Example</b>: If the selling rate is [dollarSelling] cedis, it means you need to give [dollarSelling] cedis to get 1 dollar from the bank or forex bureau.`
    },
    {
        value: "item-3",
        question: "How does BoG calculate rates?",
        answer: "Each working day, all banks submit data on all spot US$/GH¢ transactions concluded on the reporting day before 3:30 pm. The data covers all spot transactions on the interbank markets as well as transactions with their clients that have nominal values of US$10,000 or more, mutually reflective of prevailing market conditions."
    },
    {
        value: "item-4",
        question: "Which bank in Ghana would be good to open a Dollar account with?",
        answer: "Most banks offer Foreign Currency Accounts and Foreign Exchange Accounts to facilitate your international transactions subject to applicable rules. Some banks may require additional documentation to complete transactions, for more information, contact any of the banks listed on this page."
    },
    {
        value: "item-5",
        question: "What are the bank exchange rates?",
        answer: "We show the cash exchange rates for commercial banks by default. Where cash is unavailable, we show the transfer rates instead, which are the exchange rates for online bank transactions. These are indicative rates and should be used as a guide only."
    },
    {
        value: "item-6",
        question: "What are the fees for foreign account bank transfers?",
        answer: `Most banks will not charge a fee if you are withdrawing cedis from your foreign currency account, however they have lower exchange rates than you’d find in <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/forex-bureaus/">forex bureaus</a> for example. If you deposited the foreign currency as cash, you can typically withdraw the amount at no fee, however if it was a wire transfer then there will be a fee of about 3%.`
    },
    {
        value: "item-7",
        question: "Can a foreigner open a bank account in Ghana online?",
        answer: "Some banks offer this option, but most require in-person verification."
    },
];

export const forexBureausFaqs = [
    {
        value: "item-1",
        question: "Why don’t we show more forex bureaus?",
        answer: `<a style="text-decoration: underline; color: #1896FE;" href="/company/bank-of-ghana/">Bank of Ghana</a> has directed forex bureaus to <a style="text-decoration: underline; color: #1896FE;" href="https://x.com/CediRates/status/1795105067445449120">stop displaying exchange rates</a> in front of their premises and on social media.`
    },
    {
        value: "item-2",
        question: "Explain the buying and selling rate",
        answer: `The <b>Buying Rate</b> is used to change Dollars (or Pounds & Euros) to Cedis. <b>Example</b>: If the buying rate is [dollarBuying] cedis, it means the bank or forex bureau will give you [dollarBuying] cedis for every 1 dollar you give to them. <br /> The <b>Selling Rate</b> is used to change Ghanaian Cedis to Dollars (or Pounds & Euros). <b>Example</b>: If the selling rate is [dollarSelling] cedis, it means you need to give [dollarSelling] cedis to get 1 dollar from the bank or forex bureau.`
    },
    {
        value: "item-3",
        question: "How can I pay for forex transactions?",
        answer: `Most forex bureaus require a cash exchange (up to $10k) at their premises however some accept mobile money or <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">bank</a> transfers. Tap on a forex bureau for more details including their location and how to contact them.`
    },
    {
        value: "item-4",
        question: "Do I need an ID to change money?",
        answer: "You will be required to provide identification documents before conducting any transaction with a forex bureau. Identification documents include passport, driver's licence, voter's ID and the National ID card."
    },
    {
        value: "item-5",
        question: "How much is the dollar on the black market?",
        answer: "The average forex bureau rate is ₵[forexDollarSelling]. The black market operates outside BoG regulations, and rates vary. We recommend using the licensed forex bureaus listed on CediRates for safety."
    },
];

export const cardPaymentFaqs = [
    {
        value: "item-1",
        question: "Why are the rates different when making payments online?",
        answer: `The rates for online card payments are set by <a style="text-decoration: underline; color: #1896FE;" href="/company/visa/">Visa</a> and <a style="text-decoration: underline; color: #1896FE;" href="/company/mastercard/">Mastercard</a>. There is also a processing fee (about 3.5%) charged by your <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">bank</a> or financial institution. The rates we show already include the average fee, but it may vary so tap on a bank for more details and contact information.`
    },
    {
        value: "item-2",
        question: "Is there any difference between Visa and Mastercard?",
        answer: "Both cards allow you to make online payments and cash withdrawals at any Visa or Mastercard enabled ATM as well as POS terminals. These cards each have a validity period of three years after which you can renew to continue use."
    },
    {
        value: "item-3",
        question: "Can I withdraw money from Ghana ATMs using a Visa / Mastercard?",
        answer: "Yes, most ATMs accept international cards 24 hours a day, but fees may apply."
    },
];

export const moneyTransferFaqs = [
    {
        value: "item-1",
        question: "Which money transfer is best for Ghana?",
        answer: `Popular options include <a style="text-decoration: underline; color: #1896FE;" href="/company/lemfi/">LemFi,</a> <a style="text-decoration: underline; color: #1896FE;" href="/company/western-union/">Western Union,</a> and <a style="text-decoration: underline; color: #1896FE;" href="/company/afriex/">Afriex.</a>`
    },
    {
        value: "item-2",
        question: "How are recipients notified of a transfer?",
        answer: `For mobile money transfers: A text message from the provider. For other services some (e.g., <a style="text-decoration: underline; color: #1896FE;" href="/company/taptap-send/">Taptap Send</a>) send an extra SMS with sender details.`
    },
    {
        value: "item-3",
        question: "How can I transfer money from Ghana to the USA or UK using MoMo?",
        answer: "Most money transfer services do not support sending money from Ghana to the USA, UK or Canada. This is why most listings have the selling rate blank, we will update once this feature is supported."
    },
    {
        value: "item-4",
        question: "What is the exchange rate for money transfer to Ghana?",
        answer: "The average rate for money transfers to Ghana is [remittanceDollarBuying]. This means if you send $100, the recipient will get ₵[remittanceBuyingMultiplied]. "
    },
    {
        value: "item-5",
        question: "How do recipients receive their money?",
        answer: "Recipients receive the money in their mobile wallet and receive a text notification. The money will be in the same account as their other mobile money, and they can use the mobile money in any way they like - to withdraw cash at a mobile money agent, to pay bills or to top up airtime."
    },
    {
        value: "item-6",
        question: "What is a mobile wallet?",
        answer: "Mobile wallets are offered by mobile network providers (like MTN) in many African countries. They allow anyone that owns a mobile phone to store money on their phone. Recipients can withdraw funds from or add funds to their mobile wallets at any nearby mobile money agent."
    },
    {
        value: "item-7",
        question: "How much does it cost to send money to Ghana?",
        answer: "The fees incurred when sending money to Ghana varies depending on the amount you're sending, the payment method, and the delivery option you choose. "
    },
    {
        value: "item-8",
        question: "How can I pay for my money transfer?",
        answer: `You can pay for your money transfer with multiple payment options, including using a debit card or credit card or paying with your <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">bank</a> account. Some countries also offer additional payment methods like mobile wallets. Keep in mind that the payment method you choose may affect the speed of your transfer and the associated fees.`
    },
    {
        value: "item-9",
        question: "How far does $100 go in Ghana?",
        answer: "$100 can cover food, transport, and essentials for several days, depending on lifestyle and location."
    },
];

export const cryptoFaqs = [
    {
        value: "item-1",
        question: "What Is P2P Trading in Crypto and How Does it Work?",
        answer: `P2P is short for peer-to-peer, meaning a user trades directly with another user, and we show the exchange rates for Tether (USDT). It’s pretty flexible as you can choose your preferred payment method such as MTN Mobile Money, Telecel Cash, ATMoney and <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">Bank</a> Transfer.`
    },
    {
        value: "item-2",
        question: "What is Tether (USDT)?",
        answer: "Launched in 2014 by Tether Limited, Tether (USDT) is a token with stable value relative to the US dollar, enabling users to retain and transfer value on the blockchain. As a stablecoin, Tether is pegged to the value of 1 US dollar and claims to be fully backed by Tether’s assets and reserves."
    },
    {
        value: "item-3",
        question: "As a P2P Trader, how am I protected?",
        answer: "Most P2P platforms have escrow services in place for all trades, ensuring safe and fair trading. When an order is created, the amount of crypto being traded will be automatically reserved in escrow and only released when the transaction is successfully completed on both ends."
    },
];

export const fintechFaqs = [
    {
        value: "item-1",
        question: "Can I invest in stocks or crypto using a fintech app in Ghana?",
        answer: "Some apps allow investment, but regulations vary."
    },
    {
        value: "item-2",
        question: "What is a virtual card?",
        answer: `Virtual cards are similar to online payment cards issued by <a style="text-decoration: underline; color: #1896FE;" href="/company/visa/">Visa</a> or <a style="text-decoration: underline; color: #1896FE;" href="/company/mastercard/">Mastercard</a> but these do not have to be connected to a <a style="text-decoration: underline; color: #1896FE;" href="/exchange-rates/usd-to-ghs/banks/">bank</a> account. They can be used to pay for subscription services such as Apple Music, and Netflix or buying <a style="text-decoration: underline; color: #1896FE;" href="/fuel-prices/gh/">fuel</a>.`
    },
];

export const forexCompanyFaqs = [
    {
        value: "item-1",
        question: "How much is 1 dollar in ghana cedis?",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
    },
    {
        value: "item-2",
        question: "What is the exchange rate of dollar to cedis?",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae tempore ab error repudiandae sequi a reiciendis tenetur sunt quod, sit excepturi amet repellendus recusandae consectetur? Quae aut quam perspiciatis."
    },
    {
        value: "item-3",
        question: "How much is dollar to cedis?",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae tempore ab error repudiandae sequi a reiciendis tenetur sunt quod, sit excepturi amet repellendus recusandae consectetur? Quae aut quam perspiciatis."
    },
];

export const fuelCompanyFaqs = [
    {
        value: "item-1",
        question: "What Is Name?",
        answer: "Find fuel prices from Shell, Goil and TotalEnergies all listed for free"
    },
    {
        value: "item-2",
        question: "We Provide Live and Historic Fuel Price Charts for Free",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae tempore ab error repudiandae sequi a reiciendis tenetur sunt quod, sit excepturi amet repellendus recusandae consectetur? Quae aut quam perspiciatis."
    },
    {
        value: "item-3",
        question: "How Much is Fuel in Ghana Today?",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae tempore ab error repudiandae sequi a reiciendis tenetur sunt quod, sit excepturi amet repellendus recusandae consectetur? Quae aut quam perspiciatis."
    },
    {
        value: "item-4",
        question: "Team",
        answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae tempore ab error repudiandae sequi a reiciendis tenetur sunt quod, sit excepturi amet repellendus recusandae consectetur? Quae aut quam perspiciatis."
    },
];

export const currencyConverterFaqs = [
    {
        value: "item-1",
        question: "How much is 1 dollar to cedis?",
        answer: `1 dollar in Ghana today is [] when converting from dollar to cedis`
    },
    {
        value: "item-2",
        question: "How much is 100 dollars to cedis?",
        answer: `One hundred dollars in Ghana today is when converting from dollar to cedis`
    },
    {
        value: "item-3",
        question: "What is the forex rate today?",
        answer: `The forex rate today is when converting from dollar to cedis in Ghana`
    },
    {
        value: "item-4",
        question: "How much is 100 cedis to dollar?",
        answer: `100 Ghana Cedis is [] when converting to dollars`
    },
    {
        value: "item-5",
        question: "What are the Bank of Ghana interbank exchange rates?",
        answer: "BoG tracks how banks are exchanging money each working day by 2pm, and then publishes the average value. This helps people know the general rate at which money was exchanged on that day."
    },
    {
        value: "item-6",
        question: "What are the rates used for online payments like Netflix or Shein?",
        answer: " Online purchases are made using Visa rates with a bank fee of about 7%"
    },
];

const Faqs = [
    {
        value: "item-1",
        question: "",
        answer: ""
    },
    {
        value: "item-2",
        question: "",
        answer: ""
    },
    {
        value: "item-3",
        question: "",
        answer: ""
    },
    {
        value: "item-4",
        question: "",
        answer: ""
    },
    {
        value: "item-5",
        question: "",
        answer: ""
    },
    {
        value: "item-6",
        question: "",
        answer: ""
    },
    {
        value: "item-7",
        question: "",
        answer: ""
    },
];

export const seoData = {
    default: {
        title: '{currency} to Cedi Exchange Rate Today | CediRates',
        description: 'Check the {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis from banks and forex bureaus in Ghana near you, updated on CediRates.'
    },
    bank: {
        title: '{currency} to Cedis Bank Rates Today | CediRates',
        description: 'Compare Bank {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis for the bank in Ghana near you, updated on CediRates.'
    },
    cardPayment: {
        title: '{currency} to Cedis Card Payment Rates Today | CediRates',
        description: 'Compare Card Payment {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis using card debit or credit cards issued in Ghana, updated on CediRates.'
    },
    crypto: {
        title: '{currency} to Cedis Crypto Exchange Rates Today | CediRates',
        description: 'Compare Crypto Exchanges {currency} to Cedi rate for today. Latest P2P exchange rates for crypto exchanges that support Ghana, updated on CediRates.'
    },
    fintech: {
        title: '{currency} to Cedis Fintech Rates Today | CediRates',
        description: 'Compare Fintech {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis for fintechs that support Ghana, updated on CediRates.'
    },
    forex: {
        title: '{currency} to Cedis Forex Bureau Rates Today | CediRates',
        description: 'Compare Forex Bureau {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis for the forex bureau in Ghana near you, updated on CediRates.'
    },
    moneyTransfer: {
        title: '{currency} to Cedis Money Transfer Rates Today | CediRates',
        description: 'Compare Money Transfer {currency} to Cedi rate for today. Latest exchange rates for {currency}s to Cedis when sending money to Ghana, updated on CediRates.'
    },
}