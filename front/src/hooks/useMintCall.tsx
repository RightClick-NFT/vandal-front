
import { utils, constants, Contract } from "ethers";
import { useContractCall, useEthers, useContractFunction } from "@usedapp/core";
import NFT_ABI from "../contracts/NFT.json";
import NFT_VANDAL_ADDRESS from "../contracts/addresses.json";

export const useMintCall =  () => {
    const { chainId } = useEthers();

    const nftInterface = new utils.Interface(NFT_ABI);
    const nftAddress = chainId
      ? NFT_VANDAL_ADDRESS[String(chainId)]["NFT_VANDAL_ADDRESS"]
      : constants.AddressZero;
    const nftContract = new Contract(nftAddress, nftInterface);


    const [priceToMint] =
    useContractCall(
      nftAddress && {
          abi: nftInterface, // ABI interface of the called contract
          address: nftAddress, // On-chain address of the deployed contract
          method: "getCurrentPriceToMint", // Method to be called
          args: [], // Method arguments - address to be checked for balance
        }
    ) ?? [];

    const { send: mintVandal, state: mintVandalState, events: mintVandalEvent } = useContractFunction(
        nftContract,
        "mint",
        { transactionName: "mint" }
      );

    return { mintVandal, mintVandalState, mintVandalEvent, priceToMint }
}