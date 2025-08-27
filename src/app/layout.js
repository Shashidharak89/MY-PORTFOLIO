import './globals.css'; // Global styles
import Script from 'next/script';

export const metadata = {
  title: 'Shashidhara K - Portfolio',
  description: 'Personal Portfolio built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Google Analytics Scripts */}
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

        {/* Your content */}
        <main style={{ paddingTop: '60px' }}>{children}</main>
      </body>
    </html>
  );
}
