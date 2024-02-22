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
