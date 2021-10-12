import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Room from "./Room";

const TabBooking: React.FC<TabProps> = ({ company, prefix }) => {
  let rooms = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (company === "PEPSI") {
    rooms = rooms.map((room) => room + 10);
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {rooms.map((room) => (
          <Grid item key={room} md={4}>
            <Room roomId={room} prefix={prefix} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TabBooking;
