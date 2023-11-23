import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import '../index.css';
import { Navbar } from "../components/Navbar";
import "../css/Home.css";
import '../css/Navbar.css';
import "../css/NftListing.css";

const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Navbar />
      <Component {...pageProps} />
      
    </ThirdwebProvider>
  );
}

export default MyApp;
