import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis";

const useContract = () => {
    const { chainId: chainIdHex } = useMoralis();

    // console.log(chainId)

    return {
        chainIdHex,
    }
}

export default useContract;