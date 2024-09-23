import React from 'react'
import ConnectWallet from '../connect-wallet-button'
// give it some style digi bitch  

export default function Header() {

    return (
        <nav className='flex items-center justify-between'>
            <div>app_name</div>
            <div><ConnectWallet /></div>
        </nav>
    )
}
