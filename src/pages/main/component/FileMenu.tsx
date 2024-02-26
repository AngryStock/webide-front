import { Dispatch, SetStateAction, useState } from 'react';

import { AuthApi } from '@/api/api-util';
import { useAppDispatch } from '@/store/hooks';
import { fileAdd, folderAdd } from '@/store/reducers/fileTreeSlice';

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

interface Props {
  selectedFile: FileTree;
  setIsFolderOpenModal: Dispatch<SetStateAction<boolean>>;
}

function FileMenu({ selectedFile, setIsFolderOpenModal }: Props) {
  const dispatch = useAppDispatch();

  const [isHovering, setIsHovering] = useState(false);

  function mouseOverHandler() {
    setIsHovering(true);
  }
  function mouseOutHandler() {
    setIsHovering(false);
  }

  function setFolderHandler() {
    AuthApi.get('/editor/folders')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div
      className="w-[260px] absolute text-sm border-black z-30 text-white top-[32px] left-0"
      style={{ border: 'solid 1px #1e1e1e', backgroundColor: '#2F3336' }}
    >
      <div
        className="h-[30px] flex items-center justify-between hover:bg-black px-5 relative"
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
      >
        <div className="text-white">새로 만들기</div>
        <div className="material-symbols-outlined">arrow_right</div>
        {isHovering && (
          <div
            className="w-[200px] absolute text-sm border-black z-30 text-white left-[235px] top-[-1px]"
            style={{
              border: 'solid 1px #1e1e1e',
              backgroundColor: '#2F3336',
            }}
          >
            <div
              className="h-[30px] flex items-center justify-between hover:bg-black px-5"
              onClick={() => {
                dispatch(fileAdd(selectedFile));
              }}
            >
              새 파일
            </div>
            <div
              className="h-[30px] flex items-center justify-between hover:bg-black px-5"
              onClick={() => {
                dispatch(folderAdd(selectedFile));
              }}
            >
              새 폴더
            </div>
          </div>
        )}
      </div>
      <div
        className="h-[30px] flex items-center justify-between hover:bg-black px-5"
        onClick={() => {
          setFolderHandler();
          setIsFolderOpenModal(true);
        }}
      >
        <div className="text-white">폴더 열기</div>
        <div className="text-gray-400 pr-2">Ctrl + O</div>
      </div>
    </div>
  );
}

export default FileMenu;
