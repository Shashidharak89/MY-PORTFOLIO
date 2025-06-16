import './globals.css';

export const metadata = {
  title: 'Shashidhara K | Portfolio',
  description: 'Portfolio built with Next.js, Tailwind, and animations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
