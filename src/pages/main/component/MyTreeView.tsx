import { Dispatch, SetStateAction, useState } from 'react';

import { MultiBackend, Tree, getBackendOptions } from '@minoru/react-dnd-treeview';
import { DndProvider } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addEditor, renameEditor } from '@/store/reducers/editorSlice';
import { fileTreehandleDrop, setFileText } from '@/store/reducers/fileTreeSlice';

import TypeIcon from '../../../component/TypeIcon';

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
  value?: string;
}

interface Props {
  selectedFile: FileTree;
  setSelectedFile: Dispatch<SetStateAction<FileTree>>;
  setIsEditFileName: Dispatch<SetStateAction<boolean>>;
  isEditFileName: boolean;
  setIsTreeRightClick: Dispatch<SetStateAction<boolean>>;
  setTreeRightClickXY: Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  setFileName: Dispatch<SetStateAction<string>>;
}

function MyTreeView({
  selectedFile,
  isEditFileName,
  setSelectedFile,
  setIsEditFileName,
  setIsTreeRightClick,
  setTreeRightClickXY,
  setFileName,
}: Props) {
  const dispatch = useAppDispatch();

  const treeData: FileTree[] = useAppSelector((state) => state.fileTree);
  const handleDrop = (newTreeData: any) => dispatch(fileTreehandleDrop(newTreeData));
  const handleDoubleClick = () => {
    setIsEditFileName(true);
  };
  const [name, setName] = useState('');

  const handleRightClick = (e: any, node: any) => {
    e.preventDefault();
    setSelectedFile(node);
    setTreeRightClickXY({ x: e.clientX, y: e.clientY });
    setIsTreeRightClick(true);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            className={`${
              selectedFile.id === node.id ? 'bg-[#2c3e59] border border-[#5094fa]' : ''
            } flex items-center h-6 text-[12px] cursor-pointer pl-2 hover:bg-[#2F3336] z-20`}
            style={{ marginLeft: depth * 10 }}
            onClick={() => {
              onToggle();
              if (selectedFile.id !== node.id) setIsEditFileName(false);
              setSelectedFile(node);
              if (!node.droppable) {
                dispatch(
                  addEditor({
                    key: node.id,
                    file: { name: node.text, language: node.data?.fileType, value: node.data?.value },
                  }),
                );
                setFileName(String(node.id));
              }
            }}
          >
            {node.droppable && (
              <div className="flex items-center">
                {isOpen ? (
                  <div className="material-symbols-outlined text-[20px]">keyboard_arrow_down</div>
                ) : (
                  <div className="material-symbols-outlined text-[20px]">keyboard_arrow_right</div>
                )}
              </div>
            )}
            <TypeIcon droppable={node.droppable} isOpen={isOpen} fileType={node.data?.fileType} />
            <div className="w-full h-full pl-1 flex items-center">
              {isEditFileName && selectedFile.id === node.id ? (
                <input
                  type="text"
                  value={isEditFileName ? name : node.text}
                  className="w-full h-full bg-inherit outline-none flex items-center"
                  onFocus={(e) => e.target.select()}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      setIsEditFileName(false);
                      dispatch(
                        setFileText({
                          id: node.id,
                          text: name,
                        }),
                      );
                      dispatch(
                        renameEditor({
                          key: node.id,
                          name: name,
                        }),
                      );
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                  onContextMenu={(e) => {
                    handleRightClick(e, node);
                  }}
                />
              ) : (
                <div
                  className="w-full h-full bg-inherit flex items-center "
                  onDoubleClick={handleDoubleClick}
                  onContextMenu={(e) => {
                    handleRightClick(e, node);
                  }}
                >
                  {node.text}
                </div>
              )}
            </div>
          </div>
        )}
      />
    </DndProvider>
  );
}

export default MyTreeView;
