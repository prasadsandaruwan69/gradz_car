// app/layout.js
import "./globals.css";
import ClientLayout from './ClientLayout';

export const metadata = {
  title: "Grand Carz - Premium Automotive Imports",
  description: "Experience luxury and performance with Grand Carz, Sri Lanka's premier automotive importer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=SUSE+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-['SUSE_Mono'] bg-black text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}