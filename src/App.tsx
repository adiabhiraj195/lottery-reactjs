import './App.css';
import React from 'react';
import ConnectWallet from './components/connect-wallet-button/connect-button';
import useContract from './hooks/useContract';

function App() {
  const { chainId, enterLottery } = useContract();
  console.log("hii")
  console.log(chainId)

  return (
    <div className="App">
      {/* <div>{chainId}</div> */}
      <ConnectWallet />
      <button onClick={async () => await enterLottery()}>
        Enter Lottery
      </button>
      {/* <ConnectWalletScnd /> */}
    </div>
  );
}

export default App;
