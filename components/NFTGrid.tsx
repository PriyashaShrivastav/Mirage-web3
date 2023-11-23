import type {NFT as NFTType } from "@thirdweb-dev/sdk";
import React from "react";
import NFT from "./NFT";
import Link from "next/link";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    overrideOnclickBehavior?: (nft: NFTType) => void;
    emptyText?: string;
};

export default function NFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "No NFTs found",
}: Props) {
    return (
        <div>
            {isLoading ? (
                [...Array(20)].map((_, index) => (
                    <div key={index} />
                ))
            ) : data && data.length > 0 ? (
                data.map((nft) => 
                    !overrideOnclickBehavior ? (
                        <Link
                            href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
                            key={nft.metadata.id}
                        >
                        <NFT nft={nft} />
                        </Link>
                    ) : (
                        <div
                            key={nft.metadata.id}
                            onClick={() => overrideOnclickBehavior(nft)}
                        >
                            <NFT nft={nft} />
                        </div>
                    ))
            ) : (
                <h3>{emptyText}</h3>
            )}
        </div>
        
    )
};