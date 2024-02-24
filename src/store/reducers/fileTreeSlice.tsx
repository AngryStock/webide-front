import { createSlice, current } from '@reduxjs/toolkit';

export const fileTreeSlice = createSlice({
  name: 'fileTree',
  initialState: [
    {
      id: 1,
      parent: 0,
      droppable: true,
      text: 'kingide',
    },
    {
      id: 2,
      parent: 1,
      text: 'package.json',
      data: {
        fileType: 'json',
        fileSize: '0.5MB',
        value: '{ "name":"webide-front","version":"0.1.0","private":true}',
      },
    },
    {
      id: 3,
      parent: 1,
      text: 'README.md',
      data: {
        fileType: 'md',
        fileSize: '4.8MB',
        value: '',
      },
    },

    {
      id: 4,
      parent: 0,
      droppable: true,
      text: 'main',
    },
    {
      id: 5,
      parent: 4,
      droppable: true,
      text: 'image',
    },
    {
      id: 6,
      parent: 4,
      text: 'server.js',
      data: {
        fileType: 'js',
        fileSize: '2.1MB',
        value: 'function heeil(a, b) { return a + b; }',
      },
    },
    {
      id: 7,
      parent: 4,
      text: 'server.java',
      data: {
        fileType: 'java',
        fileSize: '2.1MB',
        value: '',
      },
    },
    {
      id: 8,
      parent: 4,
      text: 'server.html',
      data: {
        fileType: 'html',
        fileSize: '2.1MB',
        value: '<html lang="ko"> <head><title>React App</title></head> ',
      },
    },
    {
      id: 9,
      parent: 4,
      text: 'server.css',
      data: {
        fileType: 'css',
        fileSize: '2.1MB',
        value: '',
      },
    },
    {
      id: 10,
      parent: 4,
      text: 'server.yaml',
    },
    {
      id: 11,
      parent: 5,
      text: 'jsfileimage.png',
      data: {
        fileType: 'png',
        fileSize: '2.1MB',
      },
    },
    {
      id: 12,
      parent: 5,
      text: 'jsfileimage.jpg',
      data: {
        fileType: 'jpg',
        fileSize: '2.1MB',
      },
    },
    {
      id: 13,
      parent: 5,
      text: 'javafileimage.gif',
      data: {
        fileType: 'gif',
        fileSize: '2.1MB',
      },
    },
    {
      id: 14,
      parent: 1,
      droppable: true,
      text: 'kingide',
    },
    {
      id: 15,
      parent: 14,
      droppable: true,
      text: 'kingide',
    },
    {
      id: 16,
      parent: 15,
      droppable: true,
      text: 'kingide',
    },
  ],
  reducers: {
    fileAdd(state, action) {
      if (action.payload.droppable) {
        state.push({
          id: state[state.length - 1].id + 1,
          parent: action.payload.id,
          text: 'untitle.txt',
          data: { fileType: 'txt', fileSize: '' },
        });
      } else {
        state.push({
          id: state[state.length - 1].id + 1,
          parent: action.payload.parent,
          text: 'untitle.txt',
          data: { fileType: 'txt', fileSize: '' },
        });
      }
    },
    folderAdd(state, action) {
      if (action.payload.droppable) {
        state.push({
          id: state[state.length - 1].id + 1,
          parent: action.payload.id,
          text: 'untitle',
          droppable: true,
        });
      } else {
        state.push({
          id: state[state.length - 1].id + 1,
          parent: action.payload.parent,
          text: 'untitle',
          droppable: true,
        });
      }
    },
    fileDelete(state, action) {
      const deletefile = (items: any, id: any) => {
        const target = items.map((item: any) => item.parent === id);
        target.forEach((item: any) => {
          if (item.droppable) {
            deletefile(items, item.id);
          }
        });
        return items.filter((item: any) => item.id !== id);
      };
      return deletefile(current(state), action.payload.id);
    },
    fileTreehandleDrop(state, action) {
      return action.payload;
    },
    setFileText(state, action) {
      const target = state.find((el) => el.id === action.payload.id);
      const filename = action.payload.text;
      const lastDotIndex = filename.lastIndexOf('.');
      if (target) {
        target.text = filename;
        if (lastDotIndex !== -1 && target.data) {
          target.data.fileType = filename.substring(lastDotIndex + 1, filename.length);
        } else if (lastDotIndex === -1 && target.data) {
          target.data.fileType = '';
        }
      }
    },
  },
});

export const { fileAdd, fileDelete, fileTreehandleDrop, setFileText, folderAdd } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
