import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { format } from 'date-fns';

import { AuthApi } from '@/api/api-util';
import { generateLongId } from '@/api/generate-id';

interface Props {
  setIsFolderOpenModal: Dispatch<SetStateAction<boolean>>;
}

function FolderOpenModal({ setIsFolderOpenModal }: Props) {
  const [loginId, setLoginId] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    let userData: any;
    if (user) {
      userData = JSON.parse(user);
    }
    if (!userData) {
      return;
    } else {
      setLoginId(userData.loginId);
    }
  });

  function createFolderHandler() {
    // console.log(format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss"));
    AuthApi.post('/editor/folders', {
      id: generateLongId(),
      member: loginId,
      foldername: 'untitled',
      parentFolderId: '0',
      createdAt: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss"),
      laguage: '',
      droppable: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="absolute w-full h-full flex justify-center items-center z-10">
      <div className="w-[800px] bg-[#2F3336] border-t-4 border-[#609ae9] rounded">
        <div className="w-full flex justify-between items-center h-[60px] p-4 border-x border-black">
          <div className="text-sm">파일열기</div>
          <button
            className="material-symbols-outlined text-lg px-2 hover:bg-[#1e1e1e] rounded"
            onClick={() => {
              setIsFolderOpenModal(false);
            }}
          >
            close
          </button>
        </div>
        <div className="h-[300px] bg-[#1e1e1e] border border-black p-2"></div>
        <div className="flex justify-end items-center p-4 border border-black h-[60px] text-sm">
          <button
            className="bg-[#1e1e1e] border border-black px-4 py-1 mr-4 rounded"
            onClick={() => {
              createFolderHandler();
            }}
          >
            새로 만들기
          </button>
          <button
            className="bg-[#1e1e1e] border border-black px-4 py-1 mr-4 rounded"
            onClick={() => {
              setIsFolderOpenModal(false);
            }}
          >
            취소
          </button>
          <button className="bg-[#609ae9] border border-black px-4 py-1 rounded">확인</button>
        </div>
      </div>
    </div>
  );
}

export default FolderOpenModal;
