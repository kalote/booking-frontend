import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1, // Mainet
      1337, // Ganache
    ],
  });

  const { error, account, activate, active, deactivate } = useWeb3React();

  const handleConnect = async () => {
    try {
      if (!active) await activate(injectedConnector);
      else await deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injectedConnector);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injectedConnector);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injectedConnector);
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Booking System - React / Solidity
        </Typography>
        <Box component="div">
          {active ? (
            <Typography variant="body1" sx={{ p: 2 }}>
              {account}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ p: 2 }}>
              Not connected
            </Typography>
          )}
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={handleConnect}>
            {active ? "Disconnect" : "Connect to MetaMask"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
