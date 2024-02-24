import { createSlice } from '@reduxjs/toolkit';

interface File {
  name: string;
  language: string;
  value: string;
}
interface EditorState {
  [key: string | number]: File;
}

const initialState: EditorState = {};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addEditor(state, action) {
      const { key, file } = action.payload;
      state[key] = file;
    },
    deleteEditor(state, action) {
      delete state[action.payload];
    },
    renameEditor(state, action) {
      const { key, name } = action.payload;
      state[key].name = name;
      const lastDotIndex = name.lastIndexOf('.');
      state[key].language = name.substring(lastDotIndex + 1, name.length);
    },
  },
});

export const { addEditor, deleteEditor, renameEditor } = editorSlice.actions;

export default editorSlice.reducer;
