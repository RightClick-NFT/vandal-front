import { utils, constants, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import NFT_ABI from "../contracts/NFT.json";
import NFT_VANDAL_ADDRESS from "../contracts/addresses.json";

export const Ranking = () => {
  const { chainId } = useEthers();

  const nftInterface = new utils.Interface(NFT_ABI);
  const nftAddress = chainId
    ? NFT_VANDAL_ADDRESS[String(chainId)]["NFT_VANDAL_ADDRESS"]
    : constants.AddressZero;
  const nftContract = new Contract(nftAddress, nftInterface);

  return (
    <div>
      <ul className="tree-view">
        <p>In prod</p>
      </ul>
    </div>
  );
};
