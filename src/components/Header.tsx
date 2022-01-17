import { useEthers } from "@usedapp/core";

export const Header = () => {
  const { account, activateBrowserWallet } = useEthers();
  const isConnected = account !== undefined;

  const onError = (error: Error) => {
    console.log(error.message)
  }

  return (
    <div className="wrapper-header">
      {isConnected ? (
        <button>Connected!</button>
      ) : (
        <div className="wrapper-header-window">
          <div className="window">
            <div className="title-bar">
              <div className="title-bar-text">Enter.exe</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" />
                <button aria-label="Maximize" />
                <button aria-label="Close" />
              </div>
            </div>

            <div style={{textAlign: "center"}} className="window-body">
              <p>To interact with RightClick application</p>
              <button onClick={() => activateBrowserWallet(onError)}>Connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
