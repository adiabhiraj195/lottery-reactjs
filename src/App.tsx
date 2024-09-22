import './App.css';
import React from 'react';
// import ConnectWallet from './components/connect-button';
import ConnectWalletScnd from './components/connect-wallet-button/connect-button-scnd';
import { log } from 'console';
import useContract from './hooks/useContract';

function App() {
  const { chainIdHex } = useContract();
  // log("hii")

  return (
    <div className="App">
      <div>{parseInt(chainIdHex as string)}</div>
      {/* <ConnectWallet />  */}
      <ConnectWalletScnd />
    </div>
  );
}

export default App;
