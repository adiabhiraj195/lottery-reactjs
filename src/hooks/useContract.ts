import { useEffect, useState } from "react";
import { abi, contractAddresses } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

const useContract = () => {
    const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis();
    const chainId: number = parseInt(chainIdHex as string);

    const lotteryAddress: string = contractAddresses[31337][0];

    const v = "10000000000000000";


    const {
        runContractFunction: enterLottery,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        msgValue: v.toString(),
        params: {},
    })
    // console.log(enterTxResponse, isLoading, isFetching)
    const {
        runContractFunction: getEntranceFee,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getInterval } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getInterval",
        params: {},
    })
    const { runContractFunction: getLastTimeStamp } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getLastTimeStamp",
        params: {},
    })
    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    })

    async function getLotteryEntranceFee() {
        return (await getEntranceFee() as string)?.toString();
        // setMinEntranceFee(ethers.formatUnits(fee, "ether"));
        // console.log(fee)
    }





    return {
        chainId,
        enterLottery,
        getPlayersNumber,
        getRecentWinner,
        getInterval,
        getLotteryEntranceFee,
        getLastTimeStamp,
        getLotteryState,
        isLoading,
        contractAddress: lotteryAddress,

    }
}

export default useContract;