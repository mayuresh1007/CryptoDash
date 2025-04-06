// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Crypto Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <NavBar />
            {children}
            <ToastContainer position="top-right" autoClose={2000} />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
