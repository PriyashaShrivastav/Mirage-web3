import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useMinimumNextBid,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../const/addresses";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

export default function TokenPage({ nft, contractMetadata }: Props) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const [bidValue, setBidValue] = useState<string>();

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  async function buyListing() {
    let txResult;

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  }

  async function createBidOffer() {
    let txResult;
    if (!bidValue) {
      return;
    }

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
      });
    } else {
      throw new Error("No listing found");
    }
    return txResult;
  }

  return (
    <>
      <div className="max-h-full flex justify-center">
        <div className="flex w-3/5  h-fit border border-gray-400 border-solid p-10 rounded-3xl">
          <div className="w-1/2 flex gap-28 flex-col items-center justify-center">
            <div isLoaded={!loadingMarketplace && !loadingDirectListing}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="90%"
                height="90%"
              />
              
            </div>
          </div>
          <div className="w-3/6">
            <h3 className="text-[#00D0DD]">{contractMetadata.name}</h3>
            <h1 className="text-black text-3xl">{nft.metadata.name}</h1>
            <Link href={`/profile/${nft.owner}`}>
              <div>
                <h3 className="text-[#00D0DD]">
                  <span className="text-black w-28">Owned By:</span>{" "}
                  {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                </h3>
              </div>
            </Link>
            <div className="my-7 w-full border border-gray-400 border-solid p-4  rounded-3xl">
              <h1 className="text-sm text-black flex mb-3">Current Price:</h1>
              <div isLoaded={!loadingMarketplace && !loadingDirectListing} className="text-3xl text-black ">
                {directListing && directListing[0] ? (
                  <h2 className="flex mb-3">
                    <img src="https://logowik.com/content/uploads/images/polygon-matic-icon3725.logowik.com.webp" alt="" className="w-14"/>
                    {directListing[0]?.currencyValuePerToken.displayValue}
                    {" " + directListing[0]?.currencyValuePerToken.symbol}
                  </h2>
                ) : auctionListing && auctionListing[0] ? (
                  <h2 className="flex mb-3">
                    <img src="https://logowik.com/content/uploads/images/polygon-matic-icon3725.logowik.com.webp" alt="" className="w-14"/>
                    {auctionListing[0]?.buyoutCurrencyValue.displayValue}
                    {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                  </h2>
                ) : (
                  <h2 className="flex mb-3">
                    <img src="https://logowik.com/content/uploads/images/polygon-matic-icon3725.logowik.com.webp" alt="" className="w-14"/>
                    Not for sale</h2>
                )}
              </div>
              <div
            isLoaded={
              !loadingMarketplace || !loadingDirectListing || !loadingAuction
            }
          >
            <div className="mb-3">
              <Web3Button
              className="mb-3"
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => buyListing()}
                isDisabled={
                  (!auctionListing || !auctionListing[0]) &&
                  (!directListing || !directListing[0])
                }
              >
                Buy at asking price
              </Web3Button>
              <h4 className="text-black px-20 my-3">OR</h4>
              <div className="flex gap-10 ">
                <input
                className="rounded-xl text-black border border-black border-solid pl-3"
                  defaultValue={
                    auctionListing?.[0]?.minimumBidCurrencyValue
                      ?.displayValue || 0
                  }
                  
                  onChange={(e) => setBidValue(e.target.value)}
                />
                <Web3Button
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={async () => await createBidOffer()}
                  isDisabled={!auctionListing || !auctionListing[0]}
                >
                  Place Bid
                </Web3Button>
              </div>
            </div>
          </div>
            </div>
            <div className=" border border-gray-400 border-solid h-36 rounded-3xl ">
                <h2 className="text-black text-xl px-7 -z-10 py-2">
                  Description:{" "}
                </h2>
                <p className="text-black px-4 py-3">
                  {nft.metadata.description}
                </p>
              </div>
          </div>
        </div>
      </div>     
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
