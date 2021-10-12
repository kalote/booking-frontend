import { useWeb3React } from "@web3-react/core";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import Header from "../components/Header";
import TabsManagement from "../components/TabsManagement";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Booking = () => {
  const { active } = useWeb3React();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
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
          <Container maxWidth="lg">{active && <TabsManagement />}</Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Booking;
