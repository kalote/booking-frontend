import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbiItem } from "web3-utils";
import { bookingAddress } from "../contractInfo/configContract";
import Booking from "../contractInfo/Booking.json";
import { Booking as BookingType } from "../../types/web3-v1-contracts/Booking";

export const useContract = () => {
  const [contract, setContract] = useState<BookingType>();

  const { library } = useWeb3React();

  useEffect(() => {
    setContract(
      new library.eth.Contract(
        Booking.abi as AbiItem[],
        bookingAddress
      ) as any as BookingType
    );
  }, [library.eth.Contract]);

  return contract;
};

export const useGetRoom = (roomId: number, refresh: boolean) => {
  const [room, setRoom] = useState<Room>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const contract = useContract();

  useEffect(() => {
    const init = async () => {
      try {
        const r = await contract?.methods.rooms(roomId).call();
        setRoom(r);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    init();
  }, [contract?.methods, roomId, refresh]);

  return [loading, error, room];
};

export const useGetRooms = (company: string) => {
  const [rooms, setRooms] = useState<Rooms>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const contract = useContract();
  let [inc, limit] = company === "COKE" ? [0, 10] : [10, 20];

  useEffect(() => {
    const init = async () => {
      let allRooms: Rooms = [];
      try {
        for (let i = inc; i < limit; i++) {
          const room = await contract?.methods.rooms(i).call();
          if (room) allRooms.push(room);
        }
        setRooms(allRooms);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    init();
  }, [inc, limit, contract?.methods]);

  return [loading, error, rooms];
};
