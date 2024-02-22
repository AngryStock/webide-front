import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import PageChatRoom from './pages/chatroom/PageChatRoom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store/hooks';
import { defaultChatRoomMessagePush } from './store/reducers/defaultChatRoomSlice';
import { AuthApi } from './api/api-util';

function App() {
  const dispatch = useAppDispatch();

  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user')) return;

    AuthApi.get('/chat/rooms')
      .then((res) => {
        const defaultRoom = res.data.find((room: any) => room.name === 'defaultChatRoom');
        if (!defaultRoom) {
          return AuthApi.post('/chat/room', null, { params: { name: 'defaultChatRoom' } });
        }
        return defaultRoom;
      })
      .then((result) => {
        const roomId = result.data ? result.data.roomId : result.roomId;
        setRoomId(roomId);
        AuthApi.get(`/chat/roomId/${roomId}`).then((res) => {
          dispatch(defaultChatRoomMessagePush(res.data));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>}></Route>
      <Route path="/" element={<Main roomId={roomId} />}></Route>
      <Route path="/pagechatroom" element={<PageChatRoom roomId={roomId} />}></Route>
    </Routes>
  );
}

export default App;
