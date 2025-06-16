// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Shashidhara K Portfolio',
  description: 'Portfolio website built with Next.js and CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
