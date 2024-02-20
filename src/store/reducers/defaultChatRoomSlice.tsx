import { createSlice } from '@reduxjs/toolkit';

interface defaultChatRoom {
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
      console.log(action.payload);
      action.payload.forEach((el: defaultChatRoom) => {
        state.push(el);
      });
    },
  },
});

export const { defaultChatRoomMessagePush } = defaultChatRoomSlice.actions;

export default defaultChatRoomSlice.reducer;
