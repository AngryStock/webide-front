import { useState } from 'react';

function FileMenu() {
  const [isHovering, setIsHovering] = useState(false);

  function mouseOverHandler() {
    setIsHovering(true);
  }
  function mouseOutHandler() {
    setIsHovering(false);
  }
  return (
    <div
      className="w-[260px] absolute text-sm border-black z-30 text-white top-[32px] left-0"
      style={{ border: 'solid 1px #141617', backgroundColor: '#2F3336' }}
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
            style={{ border: 'solid 1px #141617', backgroundColor: '#2F3336' }}
          >
            <div className="h-[30px] flex items-center justify-between hover:bg-black px-5">새 파일</div>
            <div className="h-[30px] flex items-center justify-between hover:bg-black px-5">새 폴더</div>
          </div>
        )}
      </div>
      <div className="h-[30px] flex items-center justify-between hover:bg-black px-5">
        <div className="text-white">파일 열기</div>
        <div className="text-gray-400 pr-2">Ctrl + O</div>
      </div>
    </div>
  );
}

export default FileMenu;