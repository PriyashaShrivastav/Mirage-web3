import NextLink from 'next/link'
import type { NextPage } from "next";


const Home: NextPage = () => {
  return (
    <div>
      <div>
        <div>
          <h1>Mirage</h1>
          <NextLink href='/buy'>
            Shop NFT's
          </NextLink>

        </div>
      </div>
    </div>
  );
};

export default Home;