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
    "0x8174b276DD113Be090132cA156EFE47e3164A768"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  //Add these for auction section
  const [bidValue, setBidValue] = useState<string>();

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  async function buyListing() {
    let txResult;

    //Add for auction section
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
    <div>
      <div>
        <div>
          <div>
            <div isLoaded={!loadingMarketplace && !loadingDirectListing}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div>
            <h2>Description:</h2>
            <h2>{nft.metadata.description}</h2>
          </div>
          <div>
            <h2>Traits:</h2>
            <div>
              {Object.entries(nft?.metadata?.attributes || {}).map(
                ([key, value]) => (
                  <div key={key}>
                    <h3>{value.trait_type}</h3>
                    <h3>{value.value}</h3>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div>
          {contractMetadata && (
            <div>
              <div>
                <MediaRenderer
                  src={contractMetadata.image}
                  height="32px"
                  width="32px"
                />
              </div>
              <h3>{contractMetadata.name}</h3>
            </div>
          )}
          <div>
            <div>{nft.metadata.name}</div>
            <Link href={`/profile/${nft.owner}`}>
              <div>
                <h3>
                  {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                </h3>
              </div>
            </Link>
          </div>

          <div>
            <h2>Price:</h2>
            <div isLoaded={!loadingMarketplace && !loadingDirectListing}>
              {directListing && directListing[0] ? (
                <h2>
                  {directListing[0]?.currencyValuePerToken.displayValue}
                  {" " + directListing[0]?.currencyValuePerToken.symbol}
                </h2>
              ) : auctionListing && auctionListing[0] ? (
                <h2>
                  {auctionListing[0]?.buyoutCurrencyValue.displayValue}
                  {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                </h2>
              ) : (
                <h2>Not for sale</h2>
              )}
            </div>
            <div isLoaded={!loadingAuction}>
              {auctionListing && auctionListing[0] && (
                <div>
                  <h2>Bids starting from</h2>
                  <h3>
                    {auctionListing[0]?.minimumBidCurrencyValue.displayValue}
                    {" " + auctionListing[0]?.minimumBidCurrencyValue.symbol}
                  </h3>
                  <h3></h3>
                </div>
              )}
            </div>
          </div>
          <div
            isLoaded={
              !loadingMarketplace || !loadingDirectListing || !loadingAuction
            }
          >
            <div>
              <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => buyListing()}
                isDisabled={
                  (!auctionListing || !auctionListing[0]) &&
                  (!directListing || !directListing[0])
                }
              >
                Buy at asking price
              </Web3Button>
              <h4>or</h4>
              <div>
                <input
                  defaultValue={
                    auctionListing?.[0]?.minimumBidCurrencyValue
                      ?.displayValue || 0
                  }
                  type={"number"}
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
      </div>
    </div>
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
    fallback: "blocking", // can also be true or 'blocking'
  };
};
