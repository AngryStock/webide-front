import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthApi } from '@/api/api-util';

interface LoginModalProps {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function LoginModal({ setIsLoginModalOpen }: LoginModalProps) {
  const navigate = useNavigate();

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const useridRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const loginHandler = async () => {
    await AuthApi.post('/login', { loginId: userid, password: password })
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization.replace('Bearer ', '');
        localStorage.setItem('access_token', token);
        localStorage.setItem('token_type', 'Bearer');
        const base64Url = token.split('.')[1]; // 토큰을 '.' 기준으로 나누고, payload 부분(인덱스 1)을 가져옵니다.
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL 인코딩을 Base64로 변환
        const payload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
        );
        localStorage.setItem('user', payload);
        navigate('/redirect');
      })

      .catch((err) => {});
  };

  return (
    <div className="absolute w-full h-full flex justify-center items-center z-10">
      <div className="absolute w-full h-full" onClick={closeLoginModal}></div>
      <form className="w-[380px] h-[350px] bg-black  rounded-[20px] z-20 p-10">
        <div className=" text-2xl text-white text-center mb-10">
          <span className="font-bold">king</span>
          <span>ide</span>
        </div>
        <input
          className="w-full h-10 rounded-[20px]  px-5 mb-10 text-white"
          style={{ backgroundColor: '#212426' }}
          type="text"
          value={userid}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="아이디"
          ref={useridRef}
        />
        <input
          className="w-full h-10 rounded-[20px]  px-5 mb-10 text-white"
          style={{ backgroundColor: '#212426' }}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호"
          ref={passwordRef}
          autoComplete="off"
        />
        <div className="w-full flex justify-center items-center">
          <div
            className="w-[150px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer text-black"
            style={{ backgroundColor: '#D9D9D9' }}
            onClick={() => {
              loginHandler();
            }}
          >
            로그인
          </div>
        </div>
      </form>
    </div>
  );
}
export default LoginModal;
