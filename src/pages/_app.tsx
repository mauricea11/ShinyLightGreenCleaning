import type { AppProps } from "next/app";
import { Lora } from "next/font/google";
import "@/styles/globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={lora.variable + " font-lora"}>
      <Component {...pageProps} />
    </div>
  );
}
