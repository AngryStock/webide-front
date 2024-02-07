import { Dispatch, SetStateAction, useRef, useState } from 'react';
import axios from 'axios';

interface SignupModalProps {
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignupSuccessOpen: Dispatch<SetStateAction<boolean>>;
}

function SignupModal({ setIsSignupModalOpen, setIsSignupSuccessOpen }: SignupModalProps) {
  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const [name, setName] = useState('');
  const [userid, setUserid] = useState('');
  const [isUserid, setIsUserid] = useState(false);
  const [isAreadyUserid, setIsAreadyUserid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [phoneNumber, setPhoneNumer] = useState('');

  const useridRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const passwordHandler = (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    setPassword(value);
    setIsPassword(regex.test(value));
    passwordCheck(value);
  };

  const passwordConfirmHandler = (value: string) => {
    setPasswordConfirm(value);
    passwordCheck(value);
  };

  const passwordCheck = (value: string) => {
    if (password === value) {
      setIsPasswordConfirm(true);
    } else {
      setIsPasswordConfirm(false);
    }
  };

  const useridConfirm = async () => {
    await axios
      .get(`http://localhost:8080/duplicate/${userid}`)
      .then((res: any) => {
        if (res.data === '') {
          setIsAreadyUserid(false);
          setIsUserid(true);
        } else {
          setIsAreadyUserid(true);
          setIsUserid(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signupApi = async () => {
    if (isUserid && !isAreadyUserid && isPasswordConfirm && isPassword && name.length >= 1) {
      await axios
        .post(`http://localhost:8080/signup`, {
          name: name,
          loginId: userid,
          password: password,
          mobileNumber: phoneNumber,
        })
        .then((res: any) => {
          if (res.data.httpCode === 200) {
            setIsSignupModalOpen(false);
            setIsSignupSuccessOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (name.length < 1) {
      if (nameRef.current) nameRef.current.focus();
    } else if (!isUserid || isAreadyUserid) {
      if (useridRef.current) {
        useridRef.current.focus();
      }
    } else if (!isPassword) {
      if (passwordRef.current) passwordRef.current.focus();
    } else if (!isPasswordConfirm) {
      if (passwordConfirmRef.current) passwordConfirmRef.current.focus();
    }
  };
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full" onClick={closeSignupModal}></div>
      <div className="w-[380px] h-[589px] bg-black  rounded-[20px] z-10 p-10">
        <form>
          <div className=" text-2xl text-white text-center mb-10">
            <span className="font-bold">king</span>
            <span>ide</span>
          </div>

          <input
            className="w-full h-10 rounded-[20px]  px-5 mb-10 text-white"
            style={{ backgroundColor: '#212426' }}
            type="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="이름"
            ref={nameRef}
          />
          <div className={`${(!isUserid && userid.length > 0) || isUserid ? 'none' : 'mb-10'} w-full flex`}>
            <input
              className="h-10 rounded-[20px]  px-5 mr-[10px] text-white"
              style={{ backgroundColor: '#212426' }}
              type="text"
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
                setIsUserid(false);
                setIsAreadyUserid(false);
              }}
              ref={useridRef}
              placeholder="아이디"
              autoComplete="off"
            />
            <div
              className="w-[80px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: '#D9D9D9' }}
              onClick={() => {
                useridConfirm();
              }}
            >
              중복확인
            </div>
          </div>
          {isAreadyUserid ? (
            <div className="text-xs text-red-500 h-9 mt-1 w-full  px-5">이미 사용중인 아이디 입니다.</div>
          ) : (
            !isUserid &&
            userid.length > 0 && <div className="text-xs text-red-500 h-9 mt-1 w-full  px-5">중복확인을 해주세요.</div>
          )}
          {isUserid && (
            <div className="text-xs text-green-500 h-9 mt-1 w-full  px-5">사용할 수 있는 아이디 입니다.</div>
          )}

          <input
            className={`${
              !isPassword && password.length > 0 ? 'none' : 'mb-10'
            } w-full h-10 rounded-[20px] px-5 text-white`}
            style={{ backgroundColor: '#212426' }}
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => {
              passwordHandler(e.target.value);
            }}
            placeholder="비밀번호"
            autoComplete="off"
          />
          {!isPassword && password.length > 0 && (
            <div className="text-xs text-red-500 h-9 mt-1 w-full  px-5">
              비밀번호는 8자 이상, 16자 이하의 영문, 숫자 및 특수문자를 조합하여 사용해야 합니다.
            </div>
          )}
          <input
            className={`${
              !isPasswordConfirm && passwordConfirm.length > 0 ? 'none' : 'mb-10'
            } w-full h-10 rounded-[20px]  px-5  text-white`}
            style={{ backgroundColor: '#212426' }}
            type="password"
            value={passwordConfirm}
            ref={passwordConfirmRef}
            onChange={(e) => {
              passwordConfirmHandler(e.target.value);
            }}
            placeholder="비밀번호 확인"
            autoComplete="off"
          />
          {!isPasswordConfirm && passwordConfirm.length > 0 && (
            <div className="text-xs text-red-500 h-9 mt-1 px-5">비밀번호가 일치하지 않습니다.</div>
          )}
          <input
            className="w-full h-10 rounded-[20px]  px-5 mb-10 text-white"
            style={{ backgroundColor: '#212426' }}
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumer(e.target.value);
            }}
            placeholder="휴대폰번호"
          />
          <div className="w-full flex justify-center items-center">
            <div
              className="w-[150px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: '#D9D9D9' }}
              onClick={() => {
                signupApi();
              }}
            >
              회원가입
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
