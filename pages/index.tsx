import NextLink from 'next/link'
import type { NextPage } from "next";


import game from "../assets/photos/Home/group1757.png";
import ecom from "../assets/photos/Home/group1758.png";
import art from "../assets/photos/Home/group1759.png";
import luxury from "../assets/photos/Home/group1761.png";
import int from "../assets/photos/Home/group1762.png";
import loyal from "../assets/photos/Home/group1763.png";
import banner1 from "../assets/photos/Home/group1784.png";
import banner2 from "../assets/photos/Home/group1809.png";
import nft from "../assets/photos/Home/nft.png";
import arrow from "../assets/photos/Home/arrow.png";

const Home: NextPage = () => {
  return (
    <div className="home">
        <div className="page1">
          <h1>
            Be Part of the
            <br />
            DECENTRALIZED REVOLUTION
          </h1>
            {/* <button>Connect Wallet</button> */}
            
            
          {/* <video src={apevid} muted autoPlay loop></video> */}
        </div>
        <div className="page2">
          <h2>NFT DIGITAL ASSET OF ‘UNIQUENESS’</h2>
          <p>
            NFTs are currently talking the digital art and collectables world by
            storm with over $2.5 billion sales already. when everyone worldwide
            believed Bitcoin as the digital answer to currency, NFTs are now
            pitched as the digital answer to collectibles. the world is
            accepting the change of light now from a common to celectibles,
            brands, influencer every human can and are the part of NFT
            revolution “Tokenizing” these real-world tangible assets allows them
            to be bought, sold, and traded more efficiently while reducing the
            probability of fraud NFTs. each with its own unique identifying
            characteristics, idea, feeling, with your unpublished works you can
            now monetize the value of your art through royalities. you can be
            the first one to create a market for the future star.
          </p>
          <div className="middle">
            <h2>
              Join The Mirage army and Be the first to hear about Mirageverse
              Update{" "}
            </h2>
            <p>No Mess. No Clutter. Only you.</p>
          </div>
          <button>Join the revolution </button>
          <h1>I’m interested </h1>
          <div className="subscribe-input">
            <input type="email" placeholder="Enter your email" />
            <div className="subscribe-btn">
              <p>subscribe</p>
              <div className="circle">.</div>
            </div>
          </div>
        </div>
        <div className="page3">
          <h2>Your “All In One” Marketplace</h2>
          <div className="box">
            <div className="box-div">
              <div className="box-inner">
                <img src={game} alt="" />
                <h3>Gaming & Sports</h3>
              </div>
              <div className="box-inner">
                <img src={luxury} alt="" />
                <h3>
                  Luxury Brands &<br /> digital Collectibles
                </h3>
              </div>
            </div>
            <div className="box-div">
              <div className="box-inner">
                <img src={ecom} alt="" />
                <h3>E-commerce</h3>
              </div>

              <div className="box-inner">
                <img src={int} alt="" />
                <h3>
                  Entertainment &<br /> Animation
                </h3>
              </div>
            </div>
            <div className="box-div">
              <div className="box-inner">
                <img src={art} alt="" />
                <h3>Art & More</h3>
              </div>
              <div className="box-inner">
                <img src={loyal} alt="" />
                <h3>
                  Loyalty, Rewards &<br /> Incentives
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="page4">
          <img src={banner1} alt="" />
          <div className="subscribe-input">
            <input type="email" placeholder="Enter your email" />
            <div className="circle-arrow">
              <img src={arrow} alt="" />
            </div>
          </div>
          <h2>
            Are you Going to Change the World ?<br />
            Own your NFT
          </h2>
          <img src={banner2} alt="" />
        </div>
        <div className="page5">
          <div className="page5-left_section">
            <img src={nft} alt="" />
          </div>
          <div className="page5-right_section">
            <h2>
              So,
              <br />
              What is an NFT?
            </h2>
            <p>
              The advent of blockchain technology brought forward emotional
              commerce through NFTs - Non fungible Tokens
            </p>
            <p>
              The artwork associated with an NFT is stored on a decentralized
              file system and gives the collector the value of owning a unique
              collectible that no one else in the world does and is also
              traceable on the Blockchain, which is an immutable decentralized
              ledger of information.
            </p>
            <button>
              Learn More <img src={arrow} alt="" />
            </button>
          </div>
        </div>
        <div className="page6">
          <div className="page6-left">
            <h2>
              Hey Mirage,
              <br />I want this to be...
            </h2>
            <p>
              Mirage Army is committed to amaze you, <br /> We would also like
              to know what features you want us to drop! <br /> The
              possibilities are endless.... Don’t hesitate go on
            </p>
          </div>
          <div className="page6-right">
            <form action="">
              <label htmlFor="">Where Should we Contact you?</label>
              <input type="email" placeholder="Enter your email" />
              <label htmlFor="">What NFT are you Thinking of?</label>
              <select name="nftType" placeholder="Select NFT Type">
                <option value="ArtNFT">Art NFT</option>
                <option value="GamingNFT">Gaming NFTs</option>
                <option value="CollectibleNFT">Collectible NFTs</option>
              </select>
              <textarea
                name="description"
                id=""
                cols="40"
                rows="5"
                placeholder="Tell us more about your NFTs"
              ></textarea>
              <button>
                Send Message <img src={arrow} alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Home;