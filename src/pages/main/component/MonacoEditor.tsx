import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';

import TypeIcon from '@/component/TypeIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteEditor } from '@/store/reducers/editorSlice';

interface File {
  name: string;
  language: string;
  value: string;
}

interface Props {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
}

function MonacoEditor({ fileName, setFileName }: Props) {
  const dispatch = useAppDispatch();
  const files: Record<string, File> = useAppSelector((state) => state.editor);
  const file = files[fileName];
  const [isHovering, setIsHovering] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Object.keys(files).forEach((key: string) => {
      setIsHovering((prevState) => {
        return { ...prevState, [key]: false };
      });
    });
  }, []);

  function mouseOverHandler(key: string) {
    setIsHovering((prevState) => {
      return { ...prevState, [key]: true };
    });
  }
  function mouseOutHandler(key: string) {
    setIsHovering((prevState) => {
      return { ...prevState, [key]: false };
    });
  }

  return (
    <div className="w-full h-full text-sm">
      <div
        className="w-full h-[32px] flex justify-start items-center"
        style={{
          backgroundColor: '#2F3336',
          borderBottom: 'solid 1px #1e1e1e',
        }}
      >
        {Object.keys(files).map((key) => {
          return (
            <div
              key={key}
              className="border-r border-[#1e1e1e]"
              onMouseOver={() => mouseOverHandler(key)}
              onMouseOut={() => mouseOutHandler(key)}
            >
              <button
                className={`${key === fileName ? 'border-t-2 border-[#609ae9] bg-[#1e1e1e]' : ''} h-[32px] px-2 flex justify-start items-center hover:bg-[#1e1e1e] `}
                onClick={() => setFileName(key)}
              >
                <TypeIcon droppable={false} isOpen={false} fileType={files[key].language} />
                <div className="pl-1">{files[key].name}</div>
                {isHovering[key] ? (
                  <div className="w-7 flex justify-end items-center">
                    <div
                      className="w-5 h-5 flex justify-center items-center hover:bg-[#2F3336] rounded-sm"
                      onClick={() => {
                        dispatch(deleteEditor(key));
                      }}
                    >
                      <div className="material-symbols-outlined text-lg ">close</div>
                    </div>
                  </div>
                ) : (
                  <div className="w-7 flex justify-end items-center"></div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      <div
        className="w-full"
        style={{
          backgroundColor: '#1e1e1e',
          borderBottom: 'solid 1px #1e1e1e',
          height: 'calc(100% - 32px)',
        }}
      >
        {file ? (
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            path={file.name}
            language={file.language === 'js' ? 'javascript' : file.language}
            value={file.value}
          />
        ) : (
          <div className="w-full h-full"></div>
        )}
      </div>
    </div>
  );
}

export default MonacoEditor;
