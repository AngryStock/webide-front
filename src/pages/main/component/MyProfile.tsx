import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthApi } from '@/api/api-util';
import { useAppDispatch } from '@/store/hooks';
import { setChatHistory } from '@/store/reducers/defaultChatRoomSlice';

interface MyProfileProps {
  setIsMyProfileOpen: Dispatch<SetStateAction<boolean>>;
}

function MyProfile({ setIsMyProfileOpen }: MyProfileProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [userid, setUserId] = useState('');
  const [phoneNumber, setPhoneNumer] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    let userData: any;
    if (user) {
      userData = JSON.parse(user);
    }
    if (!userData) {
      return;
    } else {
      setName(userData.name);
      setUserId(userData.loginId);
      setPhoneNumer(userData.mobileNumber);
    }
  }, []);

  const closeMyProfile = () => {
    setIsMyProfileOpen(false);
  };
  const signoutHandler = () => {
    AuthApi.get('/member/withdrawal')
      .then((res: any) => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        dispatch(setChatHistory([]));
        navigate('/redirect');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full" onClick={closeMyProfile}></div>
      <div className="w-[380px]  bg-black  rounded-[20px] z-10 p-10">
        <div className=" text-2xl text-white text-center mb-[50px]">
          <span className="font-bold">king</span>
          <span>ide</span>
        </div>
        <div className=" rounded-[20px] p-10 mb-10" style={{ border: 'solid 2px #212426' }}>
          <div className="text-white mb-[5px]">이름</div>
          <input
            className="w-full h-10 rounded-[20px]  px-5 mb-5 text-white"
            style={{ backgroundColor: '#212426' }}
            type="text"
            value={name}
            onChange={(e) => {}}
            placeholder="이름"
            readOnly
          />
          <div className="text-white mb-[5px]">아이디</div>
          <input
            className="w-full h-10 rounded-[20px]  px-5 mb-5 text-white"
            style={{ backgroundColor: '#212426' }}
            type="text"
            value={userid}
            onChange={(e) => {}}
            placeholder="아이디"
            readOnly
          />
          <div className="text-white mb-[5px]">휴대폰번호</div>
          <input
            className="w-full h-10 rounded-[20px]  px-5  text-white"
            style={{ backgroundColor: '#212426' }}
            type="text"
            value={phoneNumber}
            onChange={(e) => {}}
            placeholder="휴대폰번호"
            readOnly
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            className="w-[150px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer text-black"
            style={{ backgroundColor: '#D9D9D9' }}
            onClick={() => {
              signoutHandler();
            }}
          >
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
