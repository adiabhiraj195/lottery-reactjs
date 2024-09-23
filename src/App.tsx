import './App.css';
import useContract from './hooks/useContract';
import Header from './components/header';
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { ethers } from 'ethers';

function App() {
  const { isWeb3Enabled } = useMoralis()
  const {
    chainId,
    enterLottery,
    getLotteryEntranceFee,
    getPlayersNumber,
    getRecentWinner,
    contractAddress

  } = useContract()

  const [enterFee, setEnterFee] = useState("0")
  const [numberOfPlayer, setNumberOfPlayer] = useState("0")
  const [recentWinner, setRecentWinner] = useState<any>()

  async function updateUIValues() {
    const entranceFeeFromCall = await getLotteryEntranceFee()
    const numPlayersFromCall = (await getPlayersNumber() as string)?.toString()
    const recentWinnerFromCall = await getRecentWinner()
    setEnterFee(entranceFeeFromCall);
    setNumberOfPlayer(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }


  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled])

  // const { CountdownTimer} = useTimer();
  // const [interval, setInterval] = useState("0");
  // const [sessionCreatedTime, setSessionCreatedTime] = useState("0");

  // const initialTime = parseInt(interval) - (new Date().getTime()) - parseInt(sessionCreatedTime);
  // console.log(initialTime, "initial date")



  // async function getLotteryTimer() {
  //   const intervalOfSession = (await getInterval() as string)?.toString();
  //   const timeWhenSessionCreated = (await getLastTimeStamp() as string)?.toString();
  //   setInterval(intervalOfSession);
  // setSessionCreatedTime(timeWhenSessionCreated);
  // console.log(intervalOfSession, timeWhenSessionCreated);
  // }
  // useEffect(() => {
  //   getLotteryTimer();
  // }, [])


  //TODO
  // add timer 

  // TODO
  // when timer reaches to zero 
  //enter lottery closed and
  // ask for who is the winner  
  if (!contractAddress) {
    return <div> Connect to supported chain</div>
  }
  return (
    <div className="App">

      <Header />

      <div className='intract-with-contract'>
        <div>solve timer problem
          {/* timer for intervalOfSession  */}
        </div>

        <button
          className='bg-blue-700 text-white'
          onClick={async () => {

            await enterLottery({
              onSuccess: () => console.log("entered"),
              onError: (error) => console.log(error),
            });


          }}
        >
          Particepate in Lottery
        </button>

        <div>Enter Lottery Fee: {ethers.formatUnits(enterFee, "ether")}ETH</div>

        <div>Previous Session Winner: {recentWinner}</div>

        <div>Players in Session: {numberOfPlayer}</div>
      </div>
    </div>
  );
}

export default App;
