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
        <div className="Card">           
                <ThirdwebNftMedia metadata={nft.metadata} height={'70%'} width={"100%"} style={{"objectFit":"cover"}} />
            <div className="card-text">
                <div className="name-token">
                <h3 >{nft.metadata.name}</h3> 
                <p >ID #{nft.metadata.id}</p>
                </div>                          
                {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                    <section></section>
                ) : directListing && directListing[0] ? (                
                            <h3>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</h3>                                                
                ) : auctionListing && auctionListing[0] ? (
                    <div className="flex gap-7 ">
                            <p>Minimum Bid</p>
                            <p className="text-white">{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</p>
                    </div>
                ) : (
                    <div>
                         <h3>Not Listed</h3>                   
                    </div>
                )}
            </div>
                
        </div>
    )
};