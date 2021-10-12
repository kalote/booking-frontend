import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";

import { useContract, useGetRoom } from "../blockchainHooks/utils";
import { formatAddress, isPassedOneHour } from "../utils/all";

const Room: React.FC<RoomProps> = ({ roomId, prefix }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [roomToDisplay, setRoomToDisplay] = useState<Room>();
  const [refresh, setRefresh] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, error, room] = useGetRoom(roomId, refresh);

  const contract = useContract();
  const { account, library } = useWeb3React();

  useEffect(() => {
    if (room || refresh) {
      setRoomToDisplay(room as Room);
      setRefresh(false);
    }
  }, [refresh, room]);

  const handleBooking = async (roomId: number) => {
    if (account) {
      setIsBooking(true);
      const when = new Date().getTime();
      try {
        await contract?.methods
          .book(roomId, library.utils.toBN(when))
          .send({ from: account })
          .once("receipt", (receipt) => {
            setIsBooking(false);
            setRefresh(true);
          });
      } catch (error) {
        setIsBooking(false);
        console.log("error booking:", error);
      }
    }
  };

  const handleCancel = async (roomId: number) => {
    if (account) {
      setIsCancelling(true);
      try {
        await contract?.methods
          .cancel(roomId)
          .send({ from: account })
          .once("receipt", (receipt) => {
            setIsCancelling(false);
            setRefresh(true);
          });
      } catch (error) {
        setIsCancelling(false);
        console.log("error cancelling:", error);
      }
    }
  };

  if (error) {
    return (
      <Typography gutterBottom variant="h5">
        An error occured: {error}
      </Typography>
    );
  }

  return !roomToDisplay ? (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <CircularProgress />
      </CardContent>
    </Card>
  ) : (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {roomToDisplay.company} - {prefix + roomToDisplay.id}
        </Typography>
        {roomToDisplay.booked ? (
          <Typography variant="body2" color="text.secondary">
            This room is already booked by{" "}
            {formatAddress(roomToDisplay.bookedBy)}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You can book this room by clicking the button below.
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ flexGrow: 1 }}>
        <LoadingButton
          color="success"
          loadingPosition="start"
          fullWidth={!roomToDisplay.booked}
          disabled={roomToDisplay.booked}
          loading={isBooking}
          onClick={() => handleBooking(parseInt(roomToDisplay.id))}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ flexGrow: 1 }}
        >
          Book
        </LoadingButton>
        {roomToDisplay.booked && roomToDisplay.bookedBy === account && (
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            loading={isCancelling}
            onClick={() => handleCancel(parseInt(roomToDisplay.id))}
            startIcon={<CancelIcon />}
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Cancel
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Room;
