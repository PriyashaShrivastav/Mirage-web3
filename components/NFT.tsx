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
<<<<<<< Updated upstream
                <ThirdwebNftMedia metadata={nft.metadata}  />
=======
                <ThirdwebNftMedia metadata={nft.metadata} height={'70%'} width={"100%"} />
>>>>>>> Stashed changes
            <div className=".card-text">
                <p>Token ID #{nft.metadata.id}</p>
                <h3>{nft.metadata.name}</h3>
                {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                    <section></section>
                ) : directListing && directListing[0] ? (                
                            <h3>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</h3>                    
                ) : auctionListing && auctionListing[0] ? (
                    <div>
                            <p>Minimum Bid</p>
                            <p>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</p>
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