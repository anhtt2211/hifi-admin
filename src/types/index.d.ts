type SkillTag = {
  _id: string;
  text: string;
};
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
type WorkLocation = {
  _id: string;
  officeName?: string;
  city?: string;
  address?: string;
};

type Company = {
  _id: string;
  images: string[];
  email: string;
  name: string;
  phoneNumber: string;
  industries: [];
  address: string;
  locations: WorkLocation[];
  logo: string;
  size: string;
  contactName: string;
  summary: string;
  accountStatus: 'pending' | 'rejected' | 'fullfilled';
  notifications: Notification[];
};

type Notification = {
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
type Category = {
  _id: string;
  name: string;
  imageUrl: any;
  subcategories: Subcategory[];
};
type Subcategory = {
  _id: string;
  name: string;
};

export type {
  Category,
  Subcategory,
  SkillTag,
  Admin,
  Company,
  Room,
  User,
  Message,
  Chatter,
  Notification,
  WorkLocation,
};
