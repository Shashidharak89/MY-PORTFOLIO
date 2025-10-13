import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Shashidhara K - Portfolio',
  description: 'Personal Portfolio built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 🪪 Google AdSense Verification Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-4934238485595915"
        />
      </head>

      <body>
        {/* 🧠 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZZC27635YG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZZC27635YG');
          `}
        </Script>

        {/* 💰 Google AdSense Script */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4934238485595915"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 🧩 Main content */}
        <main style={{ paddingTop: '60px' }}>{children}</main>
      </body>
    </html>
  );
}
