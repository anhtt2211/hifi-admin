import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from 'react-dom';
import { RootState } from '../store';

interface ChattingState {
  loading?: boolean;
  room?: Room | undefined;
}

const initialState: ChattingState = {
  loading: false,
  room: undefined,
};

export const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    setRoomsState: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
  },
});

export const { setRoomsState } = chattingSlice.actions;

export const $chatting = (state: RootState) => state.chatting;

export default chattingSlice.reducer;
