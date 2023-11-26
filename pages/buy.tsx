import React from "react";
import specsguy from "../assets/photos/specsguy.png";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import NextLink from "next/link";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <>
      <div className="nft-marketplace">
        <div className="page-layout">
          <div className="content-left  pt-4">
            <div className="marketplace">
              <li
                className="sidebar-heading"
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                Marketplace
              </li>
              <li className="text-[#00D0DD]">Market</li>
              <li
                className="hover:text-[#00D0DD]"
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                Active Bid
              </li>
              <li
                className="hover:text-[#00D0DD] "
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                Saved
              </li>
            </div>
            <div className="account">
              <li className="sidebar-heading">Account</li>
              <li className="hover:text-[#00D0DD]">My Collection</li>
              <li
                className="hover:text-[#00D0DD]"
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                Wallet
              </li>
              <li
                className="hover:text-[#00D0DD]"
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                History
              </li>
              <li
                className="hover:text-[#00D0DD]"
                onClick={() => {
                  alert("Coming Soon");
                }}
              >
                Settings
              </li>
            </div>
          </div>
          <div className="content-middle">
            <div className="create-nft">
              <div className="create-nft-left">
                <h1>
                  Sell your <br /> own NFT
                </h1>
                <NextLink href={"/sell"}>
                  <button className="button1 hover:scale-125">
                    Start Sale
                  </button>
                </NextLink>
                <NextLink href={"/aboutus"}>
                  <button className="button2 hover:scale-125">
                    Learn More
                  </button>
                </NextLink>
              </div>
              <img src={specsguy.src} alt="" />
            </div>
            <div className="cards-section">
              <h1 className="text-3xl border-b-2">HOT DROPS</h1>
              {/* <div className="card" style={{"display":"flex","gap":"30px","flex-wrap":"wrap"}}> */}
              <NFTGrid
                isLoading={isLoading}
                data={data}
                emptyText={"No NFTs found"}
              />
              {/* </div>            */}
            </div>
          </div>
          {/* <div className="content-right">
          <div className="user"><img src={user.src} alt="" style={{"width": "50px","border-radius": "20px"}}/> Hello, Adam</div>
        </div> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
