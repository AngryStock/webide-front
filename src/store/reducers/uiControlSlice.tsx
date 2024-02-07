import { createSlice } from '@reduxjs/toolkit';

export const uiControlSlice = createSlice({
  name: 'uiControl',
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

export const { isTerminalOpenHandler, isChattingOpenHandler } = uiControlSlice.actions;

export default uiControlSlice.reducer;
