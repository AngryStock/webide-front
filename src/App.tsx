import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import PageChatRoom from './pages/chatroom/PageChatRoom';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>}></Route>
      <Route path="/" element={<Main />}></Route>
      <Route path="/pagechatroom" element={<PageChatRoom />}></Route>
    </Routes>
  );
}

export default App;
