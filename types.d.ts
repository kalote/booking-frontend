type Room = {
  id: string;
  company: string;
  booked: boolean;
  bookedBy: string;
  bookedAt: string;
  0: string;
  1: string;
  2: boolean;
  3: string;
  4: string;
};

type Rooms = Room[];

type TabProps = {
  company: string;
  prefix: string;
};

type RoomProps = {
  roomId: number;
  prefix: string;
};
