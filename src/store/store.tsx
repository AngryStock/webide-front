import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import defaultChatRoomSliceReducer from './reducers/defaultChatRoomSlice';
import editorSliceReducer from './reducers/editorSlice';
import fileTreeSliceReducer from './reducers/fileTreeSlice';
import folderSliceReducer from './reducers/folderSlice';
import uiControlSliceReducer from './reducers/uiControlSlice';
import userSliceReducer from './reducers/userSlice';

const reducer = combineReducers({
  uiControl: uiControlSliceReducer,
  defaultChatRoom: defaultChatRoomSliceReducer,
  fileTree: fileTreeSliceReducer,
  user: userSliceReducer,
  editor: editorSliceReducer,
  folder: folderSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['uiControl', 'fileTree', 'editor', 'folder'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
