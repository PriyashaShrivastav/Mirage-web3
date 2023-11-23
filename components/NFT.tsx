import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { 
    MARKETPLACE_ADDRESS, 
    NFT_COLLECTION_ADDRESS 
} from "../const/addresses";
import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";

type Props = {
    nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
    const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { data: directListing, isLoading: loadingDirectListing } = 
        useValidDirectListings(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
        });

  
    const { data: auctionListing, isLoading: loadingAuction} = 
        useValidEnglishAuctions(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
        });

    return (
        <div>
            <div>
                <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
            </div>
            <div>Token ID #{nft.metadata.id}</div>
            <div>{nft.metadata.name}</div>

            <div>
                {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                    <section></section>
                ) : directListing && directListing[0] ? (
                    <div>
                        <div>
                            <h2>Price</h2>
                            <h2>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</h2>
                        </div>
                    </div>
                ) : auctionListing && auctionListing[0] ? (
                    <div>
                        <div>
                            <h1>Minimum Bid</h1>
                            <h1>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</h1>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h2>Price</h2>
                            <h2>Not Listed</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};