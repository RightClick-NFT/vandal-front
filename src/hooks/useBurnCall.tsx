import { utils, constants, Contract } from "ethers";
import { useContractCall, useEthers, useContractFunction } from "@usedapp/core";
import NFT_ABI from "../contracts/NFT.json";
import NFT_VANDAL_ADDRESS from "../contracts/addresses.json";

export const useBurnCall =  () => {

    const { chainId } = useEthers();

    const nftInterface = new utils.Interface(NFT_ABI);
    const nftAddress = chainId
      ? NFT_VANDAL_ADDRESS[String(chainId)]["NFT_VANDAL_ADDRESS"]
      : constants.AddressZero;
    const nftContract = new Contract(nftAddress, nftInterface);

    const [priceToBurn] =
    useContractCall(
      nftAddress && {
          abi: nftInterface, // ABI interface of the called contract
          address: nftAddress, // On-chain address of the deployed contract
          method: "getCurrentPriceToBurn", // Method to be called
          args: [], // Method arguments - address to be checked for balance
        }
    ) ?? [];

    const { send: burnVandal, state: burnVandalState, events: burnVandalEvent } = useContractFunction(
        nftContract,
        "burn",
        { transactionName: "burn" }
      );


    return { burnVandal, burnVandalState, burnVandalEvent, priceToBurn }
}