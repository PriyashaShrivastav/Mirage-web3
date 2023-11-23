import React from "react";
import logo from '../assets/photos/logo.png'
import Footer from "../components/Footer";
import specsguy from '../assets/photos/specsguy.png'
import noti from '../assets/photos/noti.png'
import msg from '../assets/photos/message.png'
import user from '../assets/photos/user.jpeg'
import Card from "../components/Card";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

export default function Buy() {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data, isLoading } = useNFTs(contract);

    return (        
            <>
    <div className="nft-marketplace">
      <div className="page-layout">
        <div className="content-left">
            <img src={logo.src} alt="" />
            <div className="marketplace">  
                    <li className="sidebar-heading">Marketplace</li>             
                    <li>Market</li>
                    <li>Active Bid</li>
                    <li>Saved</li>               
            </div>
            <div className="account">
            <li className="sidebar-heading">Account</li>   
                    <li>My Collection</li>
                    <li>Wallet</li>
                    <li>History</li>
                    <li>Settings</li>
            </div>
        </div>
        <div className="content-middle">
          <div className="topbar">
            <input type="text" placeholder="search"/>
            <div className="wallet">1234 ETH</div>
            <div className="notification">
              <img src={noti.src} alt="" />
              <img src={msg.src} alt="" />
              </div>           
          </div>
          <div className="create-nft">
            <div className="create-nft-left">
            <h1>Create your <br/> own NFT</h1>
            <button className="button1">Start Sale</button>
            <button className="button2">Learn More</button>
            </div>
            <img src={specsguy.src} alt="" />
          </div>
          <div className="cards-section">
            <h1>HOT DROPS</h1>
            <div className="card" style={{"display":"flex","gap":"30px","flex-wrap":"wrap"}}>
            <NFTGrid 
                isLoading={isLoading} 
                data={data} 
                emptyText={"No NFTs found"}
            />
            </div>           
          </div>
        </div>
        <div className="content-right">
          <div className="user"><img src={user.src} alt="" style={{"width": "50px","border-radius": "20px"}}/> Hello, Adam</div>
        </div>
      </div>
      
    </div>
    {/* <Footer /> */}
    </>
        
    )
}; 