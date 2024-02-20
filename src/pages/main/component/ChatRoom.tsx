import { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { defaultChatRoomMessagePush } from '../../../store/reducers/defaultChatRoomSlice';

interface ChatRoomProps {
  roomId: string;
}

function ChatRoom({ roomId }: ChatRoomProps) {
  const dispatch = useAppDispatch();

  const client = useRef<StompJs.Client | null>(null);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const messages: {
    type: string;
    sender: string;
    message: string;
    createAt: string;
    id: number;
  }[] = useAppSelector((state) => state.defaultChatRoom);

  useEffect(() => {
    const storedSender = localStorage.getItem('wschat.sender');
    if (storedSender) {
      setSender(storedSender);
    }

    connect();

    return () => {
      if (client.current) {
        disconnect();
      }
    };
  }, [roomId]); // roomId를 의존성 배열에 추가

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws-stomp/websocket', // 웹소켓 서버로 직접 접속
      // webSocketFactory: () => new SockJS('/ws-stomp'), // proxy를 통한 접속
      // connectHeaders: {
      //   'auth-token': 'spring-chat-auth-token',
      // },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    if (client.current) {
      client.current.deactivate();
    }
  };

  const subscribe = () => {
    if (client.current) {
      client.current.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        console.log(message.body);
        const newMessage = JSON.parse(message.body);
        dispatch(defaultChatRoomMessagePush([newMessage]));
      });
    }
  };

  const publish = (e: any) => {
    e.preventDefault();
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({ type: 'TALK', roomId: roomId, sender: sender, message: message }),
      });
    }
    setMessage(''); // 메시지 전송 후 입력 필드 초기화
  };

  return (
    <div className="w-full" style={{ height: 'calc(100% - 30px)' }}>
      <div
        className="w-full overflow-y-scroll scrollbar-hide"
        style={{ height: 'calc(100% - 30px)', backgroundColor: '#141617' }}
      >
        {messages.map((message, index) => (
          <div key={index} className="text-white text-sm">
            {message.sender}-{message.message}
          </div>
        ))}
      </div>
      <div className="w-full h-[30px]" style={{ backgroundColor: '#2F3336' }}>
        <form className="w-full h-full flex justify-center items-center" onSubmit={publish}>
          <input
            className="flex-grow h-[24px] text-white caret-white px-2 text-sm"
            style={{ backgroundColor: '#2F3336' }}
            value={message}
            placeholder="메세지를 입력하세요."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
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
