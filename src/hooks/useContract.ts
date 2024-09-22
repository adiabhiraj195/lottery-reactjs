import { useEffect, useState } from "react";
import { abi, contractAddresses } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

const useContract = () => {
    const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis();
    const chainId: number = parseInt(chainIdHex as string);

    const [minEntranceFee, setMinEntranceFee] = useState("0")

    // const lotteryAddress: string = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const lotteryAddress: string = contractAddresses[31337][0]; //have to handel it for improve dynamics
    // console.log(lotteryAddress)

    const {
        runContractFunction: enterLottery,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        msgValue: minEntranceFee,
        params: {},
    })

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

    async function lotteryEntranceFee() {
        const fee: string = (await getEntranceFee() as string).toString();
        setMinEntranceFee(ethers.formatUnits(fee, "ether"));
        // console.log(fee)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            lotteryEntranceFee();
        }
    }, [isWeb3Enabled])



    return {
        chainId,
        minEntranceFee,
        enterLottery,
        getPlayersNumber,
        getRecentWinner,
        getInterval
    }
}

export default useContract;