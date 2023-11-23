
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from 'next/link';

export function Navbar() {

    return (
        
            <div>
                <NextLink href='/'>
                    <h1>Mirage</h1>
                </NextLink>
                <div>
                    <NextLink href='/buy'>
                        <h3>Buy</h3>
                    </NextLink>
                    <NextLink href='/sell'>
                        <h3>Sell</h3>
                    </NextLink>
                </div>
                <div>
                    <ConnectWallet/>
                   
                </div>
            </div>
    )
};