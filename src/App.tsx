import { Web3ReactProvider } from "@web3-react/core";
import Booking from "./pages/Booking";
import Web3 from "web3";

function getLibrary(provider: any) {
  return new Web3(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Booking />
    </Web3ReactProvider>
  );
};

export default App;
