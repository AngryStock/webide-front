import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import PageChatRoom from './pages/chatroom/PageChatRoom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store/hooks';
import { defaultChatRoomMessagePush } from './store/reducers/defaultChatRoomSlice';

function App() {
  const dispatch = useAppDispatch();
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('wschat.sender')) return;

    axios
      .get('http://localhost:8080/chat/rooms')
      .then((res) => {
        const defaultRoom = res.data.find((room: any) => room.name === 'defaultChatRoom');
        if (!defaultRoom) {
          return axios.post('http://localhost:8080/chat/room', null, { params: { name: 'defaultChatRoom' } });
        }
        return defaultRoom;
      })
      .then((result) => {
        const roomId = result.data ? result.data.roomId : result.roomId;
        setRoomId(roomId);
        axios.get(`http://localhost:8080/chat/roomId/${roomId}`).then((res) => {
          console.log(res.data);
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
