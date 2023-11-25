
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import user from "../assets/user(1).png"
import logo from '../assets/photos/logo.png'

export function Navbar() {
    const address = useAddress()
    return (
            <div>
                <nav>
    <img src={logo.src} alt="Logo" />
    <ul>
        <NextLink href={'/'} style={{ textDecoration: 'none' }}><li>Home</li></NextLink>
        <NextLink href={'/buy'} style={{ textDecoration: 'none' }}><li>Buy</li></NextLink>
        <NextLink href={'/sell'} style={{ textDecoration: 'none' }}><li>Sell</li></NextLink>
        <NextLink href={'/aboutus'} style={{ textDecoration: 'none' }}><li>About us</li></NextLink>
        <li className="py-2 flex items-center gap-4">
           <ConnectWallet />
           {address && 
           <NextLink href={`/profile/${address}`}><img src={user.src} alt="" /></NextLink>      } 
            </li>
    </ul>
    </nav>
    </div>
    )
};