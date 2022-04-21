import { Message } from '@/models/message';

interface ChattingState {
  loading?: boolean;
  messages: Message[];
  roomId: string;
}

const initialState: ChattingState = {
  loading: false,
  messages: [],
  roomId: '',
};
