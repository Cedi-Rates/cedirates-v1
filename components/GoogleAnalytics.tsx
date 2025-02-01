import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TZGP35WG71"
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TZGP35WG71', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
