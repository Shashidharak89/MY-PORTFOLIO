import './globals.css'; // Global styles


export const metadata = {
  title: 'My Portfolio',
  description: 'Personal Portfolio built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        
        <main style={{ paddingTop: '60px' }}>{children}</main>
      </body>
    </html>
  );
} 
