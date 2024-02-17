import { createSlice } from '@reduxjs/toolkit';

export const defaultChatRoomSlice = createSlice({
  name: 'defaultChatRoom',
  initialState: { isTerminalOpen: true, isChattingOpen: false },
  reducers: {
    isTerminalOpenHandler(state, action) {
      state.isTerminalOpen = action.payload;
    },
    isChattingOpenHandler(state, action) {
      state.isChattingOpen = action.payload;
    },
  },
});

export const { isTerminalOpenHandler, isChattingOpenHandler } = defaultChatRoomSlice.actions;

export default defaultChatRoomSlice.reducer;
