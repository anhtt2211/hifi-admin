type Message = {
  userId: string;
  content: string;
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
};

type Room = {
  _id: string;
  messages: Message[];
  chatters: User[];
};

export type { Message, User, Room };
