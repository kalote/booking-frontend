import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type TabProps = {
  company: string;
  prefix: string;
};

const TabBooking: React.FC<TabProps> = ({ company, prefix }) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="span">
                  {company} - {prefix + card}
                </Typography>
              </CardContent>
              <CardActions>
                <LoadingButton
                  color="secondary"
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  Book
                </LoadingButton>
                <LoadingButton
                  color="secondary"
                  loadingPosition="start"
                  startIcon={<CancelIcon />}
                  variant="contained"
                >
                  Cancel
                </LoadingButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TabBooking;
