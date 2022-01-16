// import './App.css';
import { ChainId, DAppProvider, Config } from '@usedapp/core'
import { Main } from './components/Main';
import "./index.css";
import "98.css"

const config: Config = {
  supportedChains: [ChainId.Hardhat, ChainId.Mainnet],
  multicallAddresses: {
    [ChainId.Hardhat]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
  }  
}

function App() {
  return (
    <DAppProvider config={config}>
      <Main />
    </DAppProvider>
  );
}

export default App;
