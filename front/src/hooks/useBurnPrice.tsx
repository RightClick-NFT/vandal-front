import { utils, constants } from "ethers";
import { useContractCall, useEthers } from "@usedapp/core";
import NFT_ABI from "../contracts/NFT.json";
import NFT_VANDAL_ADDRESS from "../contracts/addresses.json";
import { useRef } from "react";

export const BurnPrice =  () => {

    const { chainId } = useEthers();
    const price = useRef("Connect Wallet");


    const nftInterface = new utils.Interface(NFT_ABI);
    const nftAddress = chainId
      ? NFT_VANDAL_ADDRESS[String(chainId)]["NFT_VANDAL_ADDRESS"]
      : constants.AddressZero;

    const priceToMint =
    useContractCall(
      nftAddress && {
          abi: nftInterface, // ABI interface of the called contract
          address: nftAddress, // On-chain address of the deployed contract
          method: "getCurrentPriceToBurn", // Method to be called
          args: [], // Method arguments - address to be checked for balance
        }
    ) ?? [];

    if (priceToMint.length == 1) {
      price.current = utils.formatUnits(priceToMint[0])
    }

    return <p>Current price to burn: {price.current}</p>
}