
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import logo from '../assets/photos/logo.png'

export function Navbar() {

    return (
        
            <div>
                <nav>
    <img src={logo} alt="Logo" />
    <ul>
        <NextLink href={'/'} style={{ textDecoration: 'none' }}><li>Home</li></NextLink>
        <NextLink href={'/buy'} style={{ textDecoration: 'none' }}><li>Buy</li></NextLink>
        <NextLink href={'/sell'} style={{ textDecoration: 'none' }}><li>Sell</li></NextLink>
        <NextLink href={'/aboutus'} style={{ textDecoration: 'none' }}><li>About us</li></NextLink>
        <li><ConnectWallet /></li>
    </ul>
    </nav>
    </div>
    )
};