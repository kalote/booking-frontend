import { AbiItem } from "web3-utils";
import Web3 from "web3";

import { bookingAddress } from "../../contract/configContract";
import Booking from "../../contract/Booking.json";
import { Booking as BookingType } from "../../../types/web3-v1-contracts/Booking";

let BookingInstance: BookingType;

let isInit = false;

export const BookingContract = () => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  BookingInstance = new web3.eth.Contract(
    Booking.abi as AbiItem[],
    bookingAddress
  ) as any as BookingType;
  isInit = true;
};

export const getRoomCount = async () => {
  if (!isInit) {
    await BookingContract();
  }
  return await BookingInstance.methods.roomCount().call();
};

export const getRoom = async (id: number) => {
  if (!isInit) {
    await BookingContract();
  }
  return BookingInstance.methods.rooms(id).call();
};
