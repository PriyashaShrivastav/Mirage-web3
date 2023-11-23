import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Navbar } from "../components/Navbar";


const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
      <Navbar />
    </ThirdwebProvider>
  );
}

export default MyApp;
