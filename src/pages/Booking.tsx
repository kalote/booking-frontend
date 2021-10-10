import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Connect from "../components/contract/Connect";
import FullWidthTabs from "../components/FullWidthTabs";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Booking = () => {
  const { jsx: connectJsx, active, account } = Connect();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
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
          <Box>{connectJsx}</Box>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Booking System for COLA Companies
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Use the connect button on the top right corner to use the booking
              system.
            </Typography>
          </Container>
          <Container maxWidth="lg">{active && <FullWidthTabs />}</Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Booking;
