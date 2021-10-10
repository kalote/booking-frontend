import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Button from "@mui/material/Button";

const Connect = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1, // Mainet
      1337, // Ganache
    ],
  });

  const { account, activate, active, deactivate, library } = useWeb3React();

  const handleConnect = async () => {
    try {
      if (!active) await activate(injectedConnector);
      else await deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const jsx = (
    <Button variant="contained" color="secondary" onClick={handleConnect}>
      {active ? "Disconnect" : "Connect to MetaMask"}
    </Button>
  );

  return { jsx, active, account, library };
};

export default Connect;
