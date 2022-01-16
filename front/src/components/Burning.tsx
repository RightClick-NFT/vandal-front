import { BigNumber } from "ethers";
import { FormEvent, useRef } from "react";
import { BurnPrice } from "../hooks/useBurnPrice";
import { useBurnCall } from "../hooks/useBurnCall";
import { TxStatus } from "../hooks/useTxStatus";
import { useEthers } from "@usedapp/core";

export const Burning = () => {
  const _inputs = useRef({});
  const _txSent = useRef(false);
  const { account } = useEthers();
  const isConnected = account !== undefined;

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tokid = _inputs.current[0];
    const msg = _inputs.current[1];
    burnVandal(tokid, msg, { value: BigNumber.from(priceToBurn.toString()) });
    _txSent.current = true;
  };

  const { burnVandal, burnVandalState, burnVandalEvent, priceToBurn } =
    useBurnCall();

  return (
    <div className="Burning">
      <BurnPrice />
      <form onSubmit={(e) => handleInputSubmit(e)}>
        {" "}
        <label className="label-style">
          tokenId:
          <input
            type="text"
            name="tokenId"
            onChange={(e) => {
              _inputs.current[0] = e.target.value;
            }}
          />{" "}
        </label>
        <label className="label-style">
          your tag:
          <input
            type="text"
            name="msg"
            placeholder="Maximum 30 characters"
            onChange={(e) => {
              _inputs.current[1] = e.target.value;
            }}
          />{" "}
        </label>{" "}
        {isConnected ? (
          <button style={{ width: "100%" }} type="submit">
            Burn
          </button>
        ) : (
          <button style={{ width: "100%" }} type="submit" disabled>
            Burn
          </button>
        )}
      </form>
      <div
        className="returnedTx"
        style={{ position: "absolute", right: "70%", top: "85%" }}
      >
        {_txSent.current ? (
          <TxStatus currentStatus={burnVandalState} event={burnVandalEvent} />
        ) : null}
      </div>
    </div>
  );
};
