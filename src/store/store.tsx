import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import uiControlSliceReducer from './reducers/uiControlSlice';
import defaultChatRoomSliceReducer from './reducers/defaultChatRoomSlice';
import fileTreeSliceReducer from './reducers/fileTreeSlice';
import userSliceReducer from './reducers/userSlice';

const reducer = combineReducers({
  uiControl: uiControlSliceReducer,
  defaultChatRoom: defaultChatRoomSliceReducer,
  fileTree: fileTreeSliceReducer,
  user: userSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['uiControl'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
