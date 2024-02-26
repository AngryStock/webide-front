import { useCallback, useEffect, useState } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import PageChatRoom from './pages/chatroom/PageChatRoom';
import Main from './pages/main/Main';

function App() {
  const [roomId, setRoomId] = useState('');

  // const handleKeyPress = useCallback((event: any) => {
  //   console.log(`Key pressed: ${event.key}`);
  // }, []);

  // useEffect(() => {
  //   // attach the event listener
  //   document.addEventListener('keydown', handleKeyPress);

  //   // remove the event listener
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
      <Route path="/" element={<Main roomId={roomId} setRoomId={setRoomId} />}></Route>
      <Route path="/pagechatroom" element={<PageChatRoom roomId={roomId} setRoomId={setRoomId} />}></Route>
    </Routes>
  );
}

export default App;
