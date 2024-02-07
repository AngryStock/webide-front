import { useState } from 'react';

function PageChatRoom() {
  const [message, setMessage] = useState('');

  return (
    <div className="h-full w-full p-5" style={{ backgroundColor: '#141617' }}>
      <div className="w-full mb-5" style={{ height: 'calc(100% - 70px)' }}></div>
      <div className="w-full h-[50px] rounded-[20px]" style={{ backgroundColor: '#2F3336' }}>
        <form
          className="w-full h-full flex justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(message);
            setMessage('');
          }}
        >
          <input
            className=" flex-grow h-[44px] text-white caret-white px-2 rounded-l-[20px] "
            style={{ backgroundColor: '#2F3336' }}
            value={message}
            placeholder="메세지를 입력하세요."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="h-full w-[80px] text-white  flex justify-center items-center"
            style={{ borderLeft: 'solid 1px #141617' }}
          >
            보내기
          </button>
        </form>
      </div>
    </div>
  );
}
export default PageChatRoom;
