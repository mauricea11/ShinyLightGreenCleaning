import type { AppProps } from "next/app";
import { Lora } from "next/font/google";
import "@/styles/globals.css";
import useLuxy from "@/hooks/useLuxy";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useLuxy();

  return (
    <div className={lora.variable + " font-lora"}>
      {/* Navbar OUTSIDE luxy wrapper so it stays fixed */}
      <Component {...pageProps} />
    </div>
  );
}
