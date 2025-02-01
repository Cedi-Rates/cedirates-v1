import { AdType } from "./types";

const cediD = require("../assets/images/Ads/desktop/desktop-ad.jpg").default;
const cediM = require("../assets/images/Ads/mobile/mobile-ad.png").default;
const kobinaD = require("../assets/images/Ads/desktop/CediRate-Desktop - Kobina Koomson.jpg").default;
const kobinaM = require("../assets/images/Ads/mobile/CediRate-Phone - Kobina Koomson.jpg").default;
const jermaineD = require("../assets/images/Ads/desktop/Leaderboard - Jermaine Antwi.png").default;
const jermaineM = require("../assets/images/Ads/mobile/Mobile Leaderboard - Jermaine Antwi.png").default;
const codeFestM = require("@/assets/images/Ads/mobile/banner_mobile-version - Sedem Balfour.png").default;
const codeFestD = require("@/assets/images/Ads/desktop/banner_desktop - Sedem Balfour.png").default;
const zippyD = require('@/assets/images/Ads/desktop/ZippyCedi Rate Desktop - Sydney Quartey.jpg').default;
const zippyM = require('@/assets/images/Ads/mobile/ZippyCedi RateMobile - Sydney Quartey.jpg').default;
const afriD = require('@/assets/images/Ads/desktop/Afriswap-desktop.png').default;
const afriM = require('@/assets/images/Ads/mobile/Afriswap-mobile.png').default;

export const ads:AdType[] = [
    { 
        id:1, 
        name: "shaq", 
        mobileImage: kobinaM, 
        desktopImage: kobinaD, 
        url: "https://onelink.to/pq5wpt" 
    },
    { 
        id:2, 
        name: "zest", 
        mobileImage: jermaineM, 
        desktopImage: jermaineD, 
        url: "https://www.tryzest.shop/?utm_source=cedirates&utm_medium=advertising&utm_campaign=free-store-growth&utm_content=sign-up"  
    },
    {
        id:3,
        name: "Code and Cocktails Fest",
        mobileImage: codeFestM ,
        desktopImage: codeFestD,
        url: "https://codeandcocktails.live"
    },
    {
        id:4,
        name: "Zippy",
        mobileImage: zippyM,
        desktopImage: zippyD,
        url: "http://www.zippy.com.gh"
    },
    {
        id:5,
        name: "AfriSwap",
        mobileImage: afriM, 
        desktopImage: afriD,
        // url: "https://wa.me/+233594918198"
        url: "http://www.afriswap.com"
    }
];

export function showAdsFairly(adsList:AdType[], numAdsToShow:number) {
    for (let i = adsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [adsList[i], adsList[j]] = [adsList[j], adsList[i]];
    };

    const adsToDisplay = adsList.slice(0, numAdsToShow);

    adsToDisplay.forEach(ad => {
        console.log("Displaying ad:", ad);
    });
};