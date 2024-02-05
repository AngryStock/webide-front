import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>}></Route>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
}

export default App;
