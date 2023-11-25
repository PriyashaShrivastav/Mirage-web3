import Frame from '../assets/photos/Frame.png'
import arist from '../assets/photos/aristocrateig.png'
import specguys from '../assets/photos/specsguy.png'
import tashi from '../assets/photos/IMG_20230610_230816_043.jpg'
import raghav from '../assets/photos/raghav.jpg';
import kush from '../assets/photos/kush.jpg';
export default function aboutus(){
    return (<>
    <div className="aboutus-page">
      <div id="page1">
            <div className="about">
                <h1>About Mirage</h1>
                <p>Mirage IS GENUINE AND NATIVE PLACE TO SELL THE 
                NFT’S ON OUR DIGITAL PLATFORM. WITHIN THE
                 PURCHASE OF NFT , A STRAIGHT AWAR
                  PEOPRIETORSHIP IS TRANSFERES TO THE SELLER.
                   With Smart contracts on NFTs encode terms and 
                   conditions, rights, and ownership, Polygon keeps
                    track of your ownership record with its secure 
                    blockchain.</p>
            </div>
            <img src={Frame.src} alt="" />
                </div>
                <div id="page2">
                    <h2>Authenticity with 100% Originality</h2>
                    <div className="auth">
                        <img src={specguys.src} />
                    <p>MIRAGE IS ONE OF THE ASIA’S NFT MARKET PLACE. A P2P MARKET PLACE FOR NFT TRADING. Now from a common to celebrities, brands, influencer every human can and are the part of NFT revolution AND GET REGONISED FOR THEIR PASSION FOR ART AND CRETIVITY IN EVERY INDIVIDUAL FIELD. A INDIVIDUAL NOW CAN BUY AND SELL THEIR REAL-WORLD TANGIBLE ASSETS OR TOKENZIAM THEM to be bought, sold, and traded more efficiently. 
                        <br />
                        <br />
                        With your unpublished works you can now monetize the value of your art through Royalities. while reducing the probability of fraud. WE ARE BUILDING A PLACE FOR MORE ARTIST TO GET RECONIZED FOR THEIR MAGNIFICENT TALENT AND EMPOWER THEM INFINTE GROWTH OPPURTNITIES AND FUTHER TO ENTER IN A NEW METAVERCE PLATFORM WITH THE HELP OF THEIS NFT’S. YOU CAN CONNECT, INTERCT, LEARN, SELL OR BUY WITH US FROM ANY CONER OF THE WORLD THE Mirage TEAM IS A GENRATION OF\FROM GENZ WHO ARE REALLY ENTHUSIED ABOUT THE BLOCK CHAIN CONCET AND BELIVIES IN THE CONCPT OF NON-FUNDABLE TOKEN DECENTRALISED THAT HAS UNQIUE PROPERTIES.</p>
                    </div>
                </div>
                <div className="page-3">
                    <h2>
                        STRENGTHING TRUST <br/> IN THE WORLD OF METAVERSE..
                    </h2>
                    <div className="page-3_content">
                        <p>
                            NFTs are currently taking the digital art and collectables world by storm with over $2.5 billion sales already.in this emerging phases nft, Mirage is one of the biggest nft marketplace we are multifariousness by providing nft from different sector like art, entertainment, lifestyle, fashion, sports, and many more. Followed by many high authorised people, singers, dancers, writers, cricketers and very known influencers with their outstanding recognition.
                            <br />
                            <br />
                            Mirage soon to launch their own virtual social interaction space platform. It is a collective virtual space, created by the convergence of virtually enhanced physical and digital reality. In other words, it is device-independent and is not owned by a single vendor. It is an independent virtual economy, enabled by digital currencies and nonfungible tokens. Mirage dream a new generation of positive social space.Where everyone get freedom to explore and learn with no restriction. </p>
                        <img src={arist.src} alt="" />
                    </div>
                </div>
                <div className="page-4">
                    <h2>OUR TEAM</h2>
                    <div className="team-images">
                        <img src={tashi.src} alt="Tashi" />
                        <img src={raghav.src} alt="Raghav" />
                        <img src={kush.src} alt="Kush" /> 
                    </div>
                    <p>Everyone gets the freedom to explore and learn with no restriction.</p>
                </div>
                </div>
    
    </>)
}