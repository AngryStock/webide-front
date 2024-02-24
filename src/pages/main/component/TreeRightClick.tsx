import { Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { fileDelete } from '@/store/reducers/fileTreeSlice';

interface Props {
  treeRightClickXY: { x: number; y: number };
  selectedFile: FileTree;
  setIsTreeRightClick: Dispatch<SetStateAction<boolean>>;
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

function TreeRightClick({ treeRightClickXY, selectedFile, setIsTreeRightClick }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`absolute text-sm border-black text-white z-30 `}
      style={{
        border: 'solid 1px #1e1e1e',
        backgroundColor: '#2F3336',
        top: `${treeRightClickXY.y}px`,
        left: `${treeRightClickXY.x}px`,
      }}
    >
      <div
        className="h-[30px] flex items-center justify-between hover:bg-black px-5 cursor-pointer"
        onClick={() => {
          dispatch(fileDelete(selectedFile));
          setIsTreeRightClick(false);
        }}
      >
        <div className="text-white">삭제</div>
      </div>
    </div>
  );
}

export default TreeRightClick;
