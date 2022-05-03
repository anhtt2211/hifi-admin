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
  chatters: User[];
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
  _id: string;
};
