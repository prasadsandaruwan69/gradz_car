import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminWrapper from "../components/AdminWrapper";

export const metadata = {
  title: "Gradz Car - Premium Automotive Imports",
  description:
    "Experience luxury and performance with Gradz Car, Sri Lanka's premier automotive importer specializing in meticulously verified vehicles from Japan and global markets.",
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
      <body className="antialiased font-['SUSE_Mono']">
        {/* AdminWrapper will decide whether to show Navbar/Footer */}
        <AdminWrapper>
          {children}
        </AdminWrapper>
      </body>
    </html>
  );
}
