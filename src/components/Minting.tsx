import { BigNumber } from "ethers";
import { FormEvent, useRef } from "react";
import { MintPrice } from "../hooks/useMintPrice";
import { useMintCall } from "../hooks/useMintCall";
import { TxStatus } from "../hooks/useTxStatus";
import { useEthers } from "@usedapp/core";

export const Minting = () => {
  const _inputs = useRef({});
  const _txSent = useRef(false);
  const { account } = useEthers();
  const isConnected = account !== undefined;

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addr = _inputs.current[0];
    const tokid: BigNumber = BigNumber.from(_inputs.current[1]);
    const tag = _inputs.current[2];
    mintVandal(addr, tokid, tag, { value: BigNumber.from(priceToMint.toString()) });
    _txSent.current = true;
  };

  const { mintVandal, mintVandalState, mintVandalEvent, priceToMint } =
    useMintCall();

  return (
    <>
      <div className="Minting">
        <MintPrice />
        <form style={{}} onSubmit={(e) => handleInputSubmit(e)}>
          {" "}
          <label className="label-style">
            address:
            <input
              type="text"
              name="address"
              onChange={(e) => {
                _inputs.current[0] = e.target.value;
              }}
            />{" "}
          </label>
          <label className="label-style">
            tokenId:
            <input
              type="text"
              name="tokenId"
              onChange={(e) => {
                _inputs.current[1] = e.target.value;
              }}
            />{" "}
          </label>
          <label className="label-style">
            tag:
            <input
              type="text"
              name="tag"
              placeholder="Maximum 30 characters"
              onChange={(e) => {
                _inputs.current[2] = e.target.value;
              }}
            />{" "}
          </label>
          {isConnected ? <button style={{width:"100%"}} type="submit" >Mint</button> : (
                       <button style={{width:"100%"}} type="submit" disabled >Mint</button>
          )}
        </form>

      </div>

      <div
        className="returnedTx"
        style={{ position: "absolute", left: "55%", top: "60%" }}
      >
        {_txSent.current ? (
          <TxStatus currentStatus={mintVandalState} event={mintVandalEvent} />
        ) : null}
      </div>
    </>
  );
};
