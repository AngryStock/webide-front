import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
  name: 'folder',
  initialState: [],
  reducers: {
    setFolder(state, action) {
      console.log(action.payload);
    },
  },
});

export const {} = folderSlice.actions;

export default folderSlice.reducer;
