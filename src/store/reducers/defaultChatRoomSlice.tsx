import { createSlice } from '@reduxjs/toolkit';

export interface defaultChatRoom {
  type: string;
  sender: string;
  message: string;
  createAt: string;
  id: number;
}

export const defaultChatRoomSlice = createSlice({
  name: 'defaultChatRoom',
  initialState: [],
  reducers: {
    defaultChatRoomMessagePush(state: defaultChatRoom[], action) {
      action.payload.forEach((el: defaultChatRoom) => {
        state.push(el);
      });
    },
    setChatHistory(state: defaultChatRoom[], action) {
      return action.payload;
    },
  },
});

export const { defaultChatRoomMessagePush, setChatHistory } = defaultChatRoomSlice.actions;

export default defaultChatRoomSlice.reducer;
