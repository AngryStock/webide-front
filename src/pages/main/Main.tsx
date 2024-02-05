import { useState } from 'react';
import SignupModal from './component/SignupModal';

function Main() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isChattingOpen, setIsChattingOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <div className="h-full w-full ">
      {isSignupModalOpen && <SignupModal setIsSignupModalOpen={setIsSignupModalOpen} />}
      <div
        className="w-full h-[32px] px-5 flex justify-between "
        style={{ backgroundColor: '#2F3336', borderBottom: 'solid 1px #141617' }}
      >
        <button className="flex justify-center items-center text-white">
          <span className="font-bold">king</span>
          <span>ide</span>
        </button>
        <div className="flex justify-around items-center">
          <button
            className="text-white mr-5 text-sm"
            onClick={() => {
              setIsSignupModalOpen(true);
            }}
          >
            회원가입
          </button>
          <button className="text-white text-sm">로그인</button>
        </div>
      </div>
      <div className="w-full flex" style={{ height: 'calc(100% - 32px)' }}>
        <div className="w-[237px]  h-full" style={{ borderRight: 'solid 1px #141617' }}>
          <div
            className="flex justify-between items-center h-[32px] px-5"
            style={{ backgroundColor: '#2F3336', borderBottom: 'solid 1px #141617' }}
          >
            <span
              className="text-sm text-white
            "
            >
              프로젝트
            </span>
            <button className="material-symbols-outlined text-white">add</button>
          </div>
          <div className="h-full" style={{ backgroundColor: '#212426', height: 'calc(100% - 32px)' }}></div>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-2/3">
            <div
              className="w-full h-[32px]"
              style={{ backgroundColor: '#212426', borderBottom: 'solid 1px #141617' }}
            ></div>
            <div
              className="w-full"
              style={{ backgroundColor: '#212426', borderBottom: 'solid 1px #141617', height: 'calc(100% - 32px)' }}
            ></div>
          </div>
          <div className="w-full h-1/3">
            <div
              className="flex justify-start items-center h-[30px] "
              style={{ backgroundColor: '#2F3336', borderBottom: 'solid 1px #141617' }}
            >
              <button
                className="w-[100px] h-full text-sm text-white flex justify-center items-center"
                style={{
                  borderRight: 'solid 1px #141617',
                  backgroundColor: `${isTerminalOpen ? '#141617' : '#2F3336'}`,
                }}
                onClick={() => {
                  setIsTerminalOpen(true);
                  setIsChattingOpen(false);
                }}
              >
                터미널
              </button>
              <button
                className="w-[100px] h-full text-sm text-white flex justify-center items-center"
                style={{
                  borderRight: 'solid 1px #141617',
                  backgroundColor: `${isChattingOpen ? '#141617' : '#2F3336'}`,
                }}
                onClick={() => {
                  setIsTerminalOpen(false);
                  setIsChattingOpen(true);
                }}
              >
                채팅
              </button>
            </div>
            <div className="w-full" style={{ height: 'calc(100% - 30px)', backgroundColor: '#141617' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
