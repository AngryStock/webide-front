import { useState } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import PageChatRoom from './pages/chatroom/PageChatRoom';
import Main from './pages/main/Main';

function App() {
    const [roomId, setRoomId] = useState('');

    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" replace />}></Route>
            <Route
                path="/"
                element={<Main roomId={roomId} setRoomId={setRoomId} />}
            ></Route>
            <Route
                path="/pagechatroom"
                element={<PageChatRoom roomId={roomId} setRoomId={setRoomId} />}
            ></Route>
        </Routes>
    );
}

export default App;
