import { Dispatch, SetStateAction, useRef, useState } from 'react';

interface LoginModalProps {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

function LoginModal({ setIsLoginModalOpen, setIsLogin }: LoginModalProps) {
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const loginHandler = () => {
    localStorage.setItem('wschat.sender', userid);
    setIsLogin(true);
    setIsLoginModalOpen(false);
  };

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const useridRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full" onClick={closeLoginModal}></div>
      <form className="w-[380px] h-[350px] bg-black  rounded-[20px] z-10 p-10">
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
          placeholder="비밀번호 확인"
          ref={passwordRef}
          autoComplete="off"
        />
        <div className="w-full flex justify-center items-center">
          <div
            className="w-[150px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer"
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
