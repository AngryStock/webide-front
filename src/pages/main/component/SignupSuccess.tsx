import { Dispatch, SetStateAction } from 'react';

interface SignupSuccessProps {
  setIsSignupSuccessOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function SignupSuccess({ setIsSignupSuccessOpen, setIsLoginModalOpen }: SignupSuccessProps) {
  const closeSignupSuccess = () => {
    setIsSignupSuccessOpen(false);
  };

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full" onClick={closeSignupSuccess}></div>
      <div className="w-[380px] h-[350px] bg-black  rounded-[20px] z-10 p-10">
        <div className=" text-2xl text-white text-center mb-10">
          <span className="font-bold">king</span>
          <span>ide</span>
        </div>
        <div className=" text-xl text-white text-center mb-10">회원가입에 성공하셨습니다.</div>
        <div className=" text-xl text-white text-center mb-10">로그인을 해주세요.</div>
        <div className="w-full flex justify-center items-center">
          <div
            className="w-[150px] h-10 rounded-[20px] font-bold flex justify-center items-center cursor-pointer"
            style={{ backgroundColor: '#D9D9D9' }}
            onClick={() => {
              setIsSignupSuccessOpen(false);
              setIsLoginModalOpen(true);
            }}
          >
            로그인 하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccess;
