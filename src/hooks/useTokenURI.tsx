import { utils, constants } from "ethers";
import { useContractCall, useEthers } from "@usedapp/core";
import NFT_ABI from "../contracts/NFT.json";
import NFT_VANDAL_ADDRESS from "../contracts/addresses.json";


export const TokenURI_ = (props: any) => {
  const { chainId } = useEthers();
  const tokid = props.tokenId;

  const nftInterface = new utils.Interface(NFT_ABI);
  const nftAddress = chainId
    ? NFT_VANDAL_ADDRESS[String(chainId)]["NFT_VANDAL_ADDRESS"]
    : constants.AddressZero;

  const returnedSVG =
    useContractCall({
      abi: nftInterface, // ABI interface of the called contract
      address: nftAddress, // On-chain address of the deployed contract
      method: "tokenURI", // Method to be called
      args: [tokid], // Method arguments - address to be checked for balance
    }) ?? [];

  return (
    <div className="tokenDisplay">
      {/* // Some can return data: JSON object. In that case, img src fails */}
      {String(returnedSVG).slice(0, 15).includes("data:image") ? (
        <img alt="Your RightClick NFT" src={`${returnedSVG}`} />
      ) : (
        String(returnedSVG).slice(0, 250)
      )}
    </div>
  );
};
