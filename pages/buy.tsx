import React from "react";

import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

export default function Buy() {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data, isLoading } = useNFTs(contract);

    return (
        <div>
            <h1>Buy NFTs</h1>
            <h2>Browse and buy NFTs from this collection.</h2>
            <NFTGrid 
                isLoading={isLoading} 
                data={data} 
                emptyText={"No NFTs found"}
            />
        </div>
    )
}; 