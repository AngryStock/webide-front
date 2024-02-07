import { useState } from 'react';

function ChatRoom() {
  const [message, setMessage] = useState('');
  return (
    <div className="w-full" style={{ height: 'calc(100% - 30px)' }}>
      <div
        className="w-full overflow-y-scroll scrollbar-hide"
        style={{ height: 'calc(100% - 30px)', backgroundColor: '#141617' }}
      ></div>
      <div className="w-full h-[30px] " style={{ backgroundColor: '#2F3336' }}>
        <form
          className="w-full h-full flex justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(message);
            setMessage('');
          }}
        >
          <input
            className=" flex-grow h-[24px] text-white caret-white px-2 text-sm"
            style={{ backgroundColor: '#2F3336' }}
            value={message}
            placeholder="메세지를 입력하세요."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="h-full w-[60px] text-white text-sm flex justify-center items-center"
            style={{ borderLeft: 'solid 1px #141617' }}
          >
            보내기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
