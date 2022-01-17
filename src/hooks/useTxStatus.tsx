import { TransactionStatus } from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import { TokenURI_ } from "./useTokenURI";

export const TxStatus = (props: any) => {
  const logs = useRef("");
  const result = useRef(false);
  const [visible, setVis] = useState("block");

  const tx: TransactionStatus = props.currentStatus;
  const events: any[] = props.event;
  const hash = tx.receipt?.transactionHash;

  const handleClose = () => {
    setVis("none")
    return () => {
      logs.current = "";
      result.current = false;
    }
  }


  useEffect(() => {
    setVis("block");
    if (tx.status === "Success") {
      for (let i = 0; i < events.length; i++) {
        const name = events[i].name;
        if (name === "Vandalized" || name === "CleanedUp") {
          logs.current = events[i].args.vToken.toString();
          result.current = true;
        }
      }
    } else if (tx.status === "Exception") {
        logs.current = tx.errorMessage || "unknown error";
        result.current = true;
    } else if (tx.status === "Fail") {
      logs.current = tx.errorMessage || "unknown error";
      result.current = true;
  }
    
  }, [events]);

  return (
    <div>
      <div className="window" style={{ width: "auto", margin: "auto", position: "absolute", display: visible}}>
        <div className="title-bar">
          <div className="title-bar-text">Transaction.exe</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={handleClose}></button>
          </div>
        </div>
        <div className="window-body">
          <div>Status: {tx.status}</div>
          <div>Transaction hash: {hash}</div>
          {result ? (
            <div>TokenID: {logs.current}</div>
          ) : (
            "No hash generated yet"
          )}
          {result ? <TokenURI_ tokenId={logs.current} /> : "Generating image"}
        </div>
      </div>
    </div>
  );
};
