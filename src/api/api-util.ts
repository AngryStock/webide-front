import axios from 'axios';

let token_type = localStorage.getItem('token_type');
let access_token = localStorage.getItem('access_token');

export let headers = {
  'Content-Type': 'application/json',
  Authorization: `${token_type} ${access_token}`,
};

export const AuthApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: headers,
});

export const fetchDefaultChatRoomId = async () => {
  try {
    getToken();
    if (!localStorage.getItem('user')) return;
    const res = await AuthApi.get('/chat/rooms');
    const defaultRoom = await res.data.find((room: any) => room.name === 'defaultChatRoom');

    if (!defaultRoom) {
      const result = await AuthApi.post('/chat/room', null, { params: { name: 'defaultChatRoom' } });
      return result.data.roomId;
    }

    const roomId = defaultRoom.data ? defaultRoom.data.roomId : defaultRoom.roomId;
    return roomId;
  } catch (err) {
    console.error(err);
    throw err; // 예외 다시 던지기
  }
};

function getToken() {
  token_type = localStorage.getItem('token_type');
  access_token = localStorage.getItem('access_token');
  headers = {
    'Content-Type': 'application/json',
    Authorization: `${token_type} ${access_token}`,
  };
}
