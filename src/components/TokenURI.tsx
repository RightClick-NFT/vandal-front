import { TokenURI_ } from "../hooks/useTokenURI";
import { useState } from "react";
import { useEthers } from "@usedapp/core";


export const TokenURI = () => {
  const [tokenid, setInputs] = useState("");
  const [onOff, setOnOff] = useState(false);
  const { account } = useEthers();
  const isConnected = account !== undefined;

  const handleInputSubmit = () => {
    setOnOff(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(event.target.value);
  };

  return (
    <div className="TokenURI">
      {onOff ? (
        <>
          <TokenURI_ tokenId={tokenid} />
          <form onSubmit={handleInputSubmit}>
            {" "}
            <label className="label-style">
              tokenId:
              <input
                type="text"
                name="tokenId"
                onChange={handleInputChange}
              />{" "}
            </label>
            <button type="submit">View</button>
          </form>
        </>
      ) : (
        <form onSubmit={handleInputSubmit}>
          {" "}
          <label className="label-style">
            tokenId:
            <input
              type="text"
              name="tokenId"
              onChange={handleInputChange}
            />{" "}
          </label>
          {isConnected ? (
            <button type="submit">
              View
            </button>
          ) : (
            <button type="submit" disabled>
              View
            </button>
          )}
        </form>
      )}
    </div>
  );
};
