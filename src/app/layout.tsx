import type {Metadata} from "next";

import {ToastContainer} from "react-toastify";

import Header from "./components/Header";
import "./globals.css";
import Footer from "./components/Footer";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Adviency - ferpy ",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="grid min-h-screen grid-rows-[auto,1fr,auto]">
        <ToastContainer
          closeOnClick
          draggable
          pauseOnFocusLoss
          pauseOnHover
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          position="bottom-right"
          rtl={false}
          theme="dark"
        />
        <Header />
        <main className="py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
