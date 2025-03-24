import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import {ThemeProvider} from "../components/ThemeProvider.jsx"
import { ModeToggle } from "@/components/ThemToggler";
import NavBar from "@/components/NavBar";
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
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
