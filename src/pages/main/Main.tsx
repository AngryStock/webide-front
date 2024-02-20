import { useEffect, useState } from 'react';
import SignupModal from './component/SignupModal';
import SignupSuccess from './component/SignupSuccess';
import LoginModal from './component/LoginModal';
import ChatRoom from './component/ChatRoom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { isTerminalOpenHandler, isChattingOpenHandler } from '../../store/reducers/uiControlSlice';
import MyProfile from './component/MyProfile';
import MyTreeView from './component/MyTreeView';
import FileMenu from './component/FileMenu';

interface MainProps {
  roomId: string;
}

function Main({ roomId }: MainProps) {
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('wschat.sender')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const isTerminalOpen = useAppSelector((state) => {
    if (state.uiControl.isTerminalOpen === undefined) {
      return true;
    } else {
      return state.uiControl.isTerminalOpen;
    }
  });
  const isChattingOpen = useAppSelector((state) => {
    if (state.uiControl.isChattingOpen === undefined) {
      return false;
    } else {
      return state.uiControl.isChattingOpen;
    }
  });
  const logoutHandler = () => {
    localStorage.removeItem('wschat.sender');
    setIsLogin(false);
  };

  return (
    <div className="h-full w-full text-white">
      {isSignupModalOpen && (
        <SignupModal setIsSignupModalOpen={setIsSignupModalOpen} setIsSignupSuccessOpen={setIsSignupSuccessOpen} />
      )}
      {isSignupSuccessOpen && (
        <SignupSuccess setIsLoginModalOpen={setIsLoginModalOpen} setIsSignupSuccessOpen={setIsSignupSuccessOpen} />
      )}
      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} setIsLogin={setIsLogin} />}
      {isMyProfileOpen && <MyProfile setIsMyProfileOpen={setIsMyProfileOpen} />}

      <div
        className="w-full h-[32px] px-5 flex"
        style={{ backgroundColor: '#2F3336', borderBottom: 'solid 1px #141617' }}
      >
        <button className="flex justify-center items-center text-white">
          <span className="font-bold">king</span>
          <span>ide</span>
        </button>
        <div className="flex h-full flex-grow  px-[10px] items-center text-white text-sm scrollbar-hide ">
          <div
            className=" cursor-pointer customhover h-full flex justify-center items-center px-[10px] relative"
            onClick={() => {
              setIsFileMenuOpen(!isFileMenuOpen);
            }}
          >
            파일
            {isFileMenuOpen && <FileMenu />}
          </div>
          <div className=" cursor-pointer customhover h-full flex justify-center items-center px-[10px]">보기</div>
          <div className=" cursor-pointer customhover h-full flex justify-center items-center px-[10px]">실행</div>
          <div className=" cursor-pointer customhover h-full flex justify-center items-center px-[10px]">터미널</div>
        </div>
        {isLogin ? (
          <div className="flex justify-around items-center">
            <button
              className="text-white mr-5 text-sm"
              onClick={() => {
                setIsMyProfileOpen(true);
              }}
            >
              내정보
            </button>
            <button
              className="text-white text-sm"
              onClick={() => {
                logoutHandler();
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex justify-around items-center">
            <button
              className="text-white mr-5 text-sm"
              onClick={() => {
                setIsSignupModalOpen(true);
              }}
            >
              회원가입
            </button>
            <button
              className="text-white text-sm"
              onClick={() => {
                setIsLoginModalOpen(true);
              }}
            >
              로그인
            </button>
          </div>
        )}
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
          <div className="h-full px-2 py-1" style={{ backgroundColor: '#212426', height: 'calc(100% - 32px)' }}>
            <MyTreeView />
          </div>
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
              <div
                style={{
                  borderRight: 'solid 1px #141617',
                  backgroundColor: `${isTerminalOpen ? '#141617' : '#2F3336'}`,
                }}
                className="w-[100px] h-full text-sm text-white flex justify-center items-center "
              >
                <button
                  className="w-full h-full customhover"
                  onClick={() => {
                    dispatch(isTerminalOpenHandler(true));
                    dispatch(isChattingOpenHandler(false));
                  }}
                >
                  터미널
                </button>
              </div>

              <div
                style={{
                  borderRight: 'solid 1px #141617',
                  backgroundColor: `${isChattingOpen ? '#141617' : '#2F3336'}`,
                }}
                className="w-[100px] h-full text-sm text-white flex justify-center items-center relative "
              >
                <button
                  className="w-full h-full customhover"
                  onClick={() => {
                    dispatch(isTerminalOpenHandler(false));
                    dispatch(isChattingOpenHandler(true));
                  }}
                >
                  채팅
                </button>
                <div
                  className="material-symbols-outlined text-sm absolute right-1 cursor-pointer z-1"
                  onClick={() => {
                    dispatch(isTerminalOpenHandler(true));
                    dispatch(isChattingOpenHandler(false));
                    window.open('/pagechatroom', '_blank', `height=${window.screen.height},width=500`);
                  }}
                >
                  open_in_new
                </div>
              </div>
            </div>
            {isTerminalOpen && (
              <div className="w-full" style={{ height: 'calc(100% - 30px)', backgroundColor: '#141617' }}></div>
            )}
            {isChattingOpen && <ChatRoom roomId={roomId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
