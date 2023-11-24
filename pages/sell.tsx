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
            <h1 >Sell NFTs</h1>
            <h2>Select which NFT to sell below.</h2>
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
                            <ThirdwebNftMedia
                                metadata={selectedNFT.metadata}
                                width="100%"
                                height="100%"
                            />
                            <div>
                                <div>
                                    <button
                                        onClick={() => {
                                            setSelectedNFT(undefined);
                                        }}
                                    >X</button>
                                </div>
                                <h1>{selectedNFT.metadata.name}</h1>
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