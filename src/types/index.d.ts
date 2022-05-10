type Message = {
  userId: string;
  content: string;
  createdAt: string;
};

type User = {
  _id: string;
  uid: string;
  signInProvider: string;
  type: string;
  email: string;
  name: string;
  photoUrl: string;
  notifications: Notification[];
};

type Room = {
  _id: string;
  messages: Message[];
  chatters: Chatter[];
};

type Chatter = {
  chatterId: string;
  name: string;
  avatar: string;
  type: string;
};

type Company = {
  _id: string;
  images: string[];
  email: string;
  name: string;
  phoneNumber: string;
  industries: [];
  address: string;
  locations: [];
  size: string;
  contactName: string;
  summary: string;
  accountStatus: 'pending' | 'rejected' | 'fullfilled';
  notifications: Notification[];
};

export type Notification = {
  message: string;
  createdAt: Date;
  redirectUrl: string;
  isRead: boolean;
  _id: string;
};

type Admin = {
  _id: string;
  name: string;
  username: string;
};
