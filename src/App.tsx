import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import PageChatRoom from './pages/chatroom/PageChatRoom';
import { useState } from 'react';

function App() {
  const [roomId, setRoomId] = useState('');

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
      <Route path="/" element={<Main roomId={roomId} setRoomId={setRoomId} />}></Route>
      <Route path="/pagechatroom" element={<PageChatRoom roomId={roomId} />}></Route>
    </Routes>
  );
}

export default App;
