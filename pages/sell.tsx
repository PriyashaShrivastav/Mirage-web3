import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import NFTGrid from "../components/NFTGrid";
import SaleInfo from "../components/SalesInfo";

export default function Sell() {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);

    const [selectedNFT, setSelectedNFT] = useState<NFTType>();

    return (
        <div>
            <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500  flex items-center justify-center mx-5 rounded-3xl flex-col gap-6 my-4">
        <h1 className="text-5xl font-extrabold text-white py-6 font-sans">
          Sell your NFTs
        </h1>
 
        
      </div>
            <h2 className="text-black text-center text-2xl">Select which NFT to sell below</h2>
            <h2 className="text-black px-10 text-lg">Owned NFTs</h2>
            {!selectedNFT ? (
                <NFTGrid
                    data={data}
                    isLoading={isLoading}
                    overrideOnclickBehavior={(nft) => {
                        setSelectedNFT(nft);
                    }}
                    emptyText={"You don't own any NFTs yet from this collection."}
                />
            ) : (
                <div>
                    <div>
                        <div>
                            {/* <ThirdwebNftMedia
                                metadata={selectedNFT.metadata}
                                width="100%"
                                height="100%"
                            /> */}
                            <div>
                                <div>
                                    <button className="absolute top-50 right-20 bg-black px-4 py-1 rounded-full text-3xl "
                                        onClick={() => {
                                            setSelectedNFT(undefined);
                                        }}
                                    >X</button>
                                </div>
                                <SaleInfo
                                    nft={selectedNFT}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}