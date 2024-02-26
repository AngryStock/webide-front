import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthApi, fetchDefaultChatRoomId } from '@/api/api-util';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setChatHistory } from '@/store/reducers/defaultChatRoomSlice';
import { fileAdd, folderAdd } from '@/store/reducers/fileTreeSlice';
import { isChattingOpenHandler, isTerminalOpenHandler } from '@/store/reducers/uiControlSlice';

import ChatRoom from './component/ChatRoom';
import FileMenu from './component/FileMenu';
import FolderOpenModal from './component/FolderOpenModal';
import LoginModal from './component/LoginModal';
import MonacoEditor from './component/MonacoEditor';
import MyProfile from './component/MyProfile';
import MyTreeView from './component/MyTreeView';
import SignupModal from './component/SignupModal';
import SignupSuccess from './component/SignupSuccess';
import TreeRightClick from './component/TreeRightClick';

interface MainProps {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}
interface FileTree {
  id: number | string;
  parent: number | string;
  droppable?: boolean;
  text: string;
  data?: FileTreeData;
}

interface FileTreeData {
  fileType: string;
  fileSize: string;
}

function Main({ roomId, setRoomId }: MainProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isTreeRightClick, setIsTreeRightClick] = useState(false);
  const [treeRightClickXY, setTreeRightClickXY] = useState({
    x: 100,
    y: 100,
  });
  const [selectedFile, setSelectedFile] = useState<FileTree>({
    id: 0,
    parent: 0,
    text: '',
  });
  const [isEditFileName, setIsEditFileName] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isFolderOpenModal, setIsFolderOpenModal] = useState(false);

  const myTreeViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('user')) return;

    const fetchData = async () => {
      try {
        const roomId = await fetchDefaultChatRoomId();
        if (roomId) {
          setRoomId(roomId);
          const res = await AuthApi.get(`/chat/roomId/${roomId}`);
          dispatch(setChatHistory(res.data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch, setRoomId]);

  const isTerminalOpen = useAppSelector((state) => {
    return state.uiControl.isTerminalOpen;
  });
  const isChattingOpen = useAppSelector((state) => {
    return state.uiControl.isChattingOpen;
  });
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    dispatch(setChatHistory([]));
    navigate('/redirect');
  };

  return (
    <div className="h-full w-full text-white relative">
      {isSignupModalOpen && (
        <SignupModal setIsSignupModalOpen={setIsSignupModalOpen} setIsSignupSuccessOpen={setIsSignupSuccessOpen} />
      )}
      {isSignupSuccessOpen && (
        <SignupSuccess setIsLoginModalOpen={setIsLoginModalOpen} setIsSignupSuccessOpen={setIsSignupSuccessOpen} />
      )}
      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}
      {isMyProfileOpen && <MyProfile setIsMyProfileOpen={setIsMyProfileOpen} />}
      {isTreeRightClick && (
        <TreeRightClick
          treeRightClickXY={treeRightClickXY}
          selectedFile={selectedFile}
          setIsTreeRightClick={setIsTreeRightClick}
        />
      )}
      {isFolderOpenModal && <FolderOpenModal setIsFolderOpenModal={setIsFolderOpenModal} />}

      <div
        className="w-full h-[32px] px-5 flex"
        style={{
          backgroundColor: '#2F3336',
          borderBottom: 'solid 1px #1e1e1e',
        }}
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
            {isFileMenuOpen && <FileMenu selectedFile={selectedFile} setIsFolderOpenModal={setIsFolderOpenModal} />}
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
        <div className="w-[237px]  h-full" style={{ borderRight: 'solid 1px #1e1e1e' }}>
          <div
            className="flex justify-between items-center h-[32px] pl-5 pr-2"
            style={{
              backgroundColor: '#2F3336',
              borderBottom: 'solid 1px #1e1e1e',
            }}
          >
            <span
              className="text-sm text-white
            "
            >
              프로젝트
            </span>
            <div className="flex items-center gap-2">
              <button
                className="material-symbols-outlined text-base"
                onClick={() => {
                  dispatch(fileAdd(selectedFile));
                }}
              >
                new_window
              </button>
              <button
                className="material-symbols-outlined text-base"
                onClick={() => {
                  dispatch(folderAdd(selectedFile));
                }}
              >
                create_new_folder
              </button>
            </div>
          </div>
          <div
            className="w-full"
            style={{
              backgroundColor: '#2F3336',
              height: 'calc(100% - 32px)',
            }}
          >
            <div ref={myTreeViewRef}>
              <MyTreeView
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                isEditFileName={isEditFileName}
                setIsEditFileName={setIsEditFileName}
                setIsTreeRightClick={setIsTreeRightClick}
                setTreeRightClickXY={setTreeRightClickXY}
                setFileName={setFileName}
              />
            </div>
            <div
              className="w-full"
              style={{
                height: `calc(100% - ${myTreeViewRef.current?.clientHeight}px)`,
              }}
              onClick={() => {
                setSelectedFile({ id: 0, parent: 0, text: '' });
              }}
            >
              {' '}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <div className="w-full h-2/3">
            <MonacoEditor fileName={fileName} setFileName={setFileName} />
          </div>
          <div className="w-full h-1/3">
            <div
              className="flex justify-start items-center h-[30px] "
              style={{
                backgroundColor: '#2F3336',
                borderBottom: 'solid 1px #1e1e1e',
              }}
            >
              <div
                style={{
                  borderRight: 'solid 1px #1e1e1e',
                  backgroundColor: `${isTerminalOpen ? '#1e1e1e' : '#2F3336'}`,
                }}
                className="w-[100px] h-full text-sm text-white flex justify-center items-center "
              >
                <button
                  className={`${isTerminalOpen ? 'border-t-2 border-[#609ae9]' : ''} w-full h-full hover:bg-[#1e1e1e]`}
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
                  borderRight: 'solid 1px #1e1e1e',
                  backgroundColor: `${isChattingOpen ? '#1e1e1e' : '#2F3336'}`,
                }}
                className="w-[100px] h-full text-sm text-white flex justify-center items-center relative "
              >
                <button
                  className={`${isChattingOpen ? 'border-t-2 border-[#609ae9]' : ''} w-full h-full hover:bg-[#1e1e1e]`}
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
              <div
                className="w-full"
                style={{
                  height: 'calc(100% - 30px)',
                  backgroundColor: '#1e1e1e',
                }}
              ></div>
            )}
            {isChattingOpen && <ChatRoom roomId={roomId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
