import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';

import { AuthApi, fetchDefaultChatRoomId, headers } from '@/api/api-util';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    defaultChatRoomMessagePush,
    setChatHistory,
} from '@/store/reducers/defaultChatRoomSlice';

interface PageChatRoomProps {
    roomId: string;
    setRoomId: Dispatch<SetStateAction<string>>;
}

function PageChatRoom({ roomId, setRoomId }: PageChatRoomProps) {
    const dispatch = useAppDispatch();

    const chatRef = useRef<HTMLDivElement[]>([]);
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

    useEffect(() => {
        const user = localStorage.getItem('user');
        let userData: any;
        if (user) {
            userData = JSON.parse(user);
        }
        if (!userData) {
            return;
        } else {
            setSender(userData.name);
        }
        connect();

        return () => {
            if (client.current) {
                disconnect();
            }
        };
    }, [roomId]); // roomId를 의존성 배열에 추가

    useEffect(() => {
        handleScroll(chatRef.current[messages.length - 1]);
    }, [messages]); // messages가 업데이트될 때마다 호출

    const connect = () => {
        client.current = new StompJs.Client({
            connectHeaders: headers,
            brokerURL: 'ws://localhost:8080/ws-stomp/websocket', // 웹소켓 서버로 직접 접속
            reconnectDelay: 5000,
            // webSocketFactory: () => new SockJS('/ws-stomp'), // proxy를 통한 접속
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
            client.current.subscribe(
                `/sub/chat/room/${roomId}`,
                (message) => {
                    const newMessage = JSON.parse(message.body);
                    dispatch(defaultChatRoomMessagePush([newMessage]));
                },
                headers,
            );
        }
    };

    const publish = (e: any) => {
        e.preventDefault();
        if (client.current && client.current.connected) {
            client.current.publish({
                destination: '/pub/chat/message',
                body: JSON.stringify({
                    type: 'TALK',
                    roomId: roomId,
                    sender: sender,
                    message: message,
                }),
                headers,
            });
        }
        setMessage('');
    };

    const handleScroll = (ref: HTMLDivElement | null) => {
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    return (
        <div
            className="h-full w-full p-5"
            style={{ backgroundColor: '#141617' }}
        >
            <div
                className="w-full mb-5 overflow-y-scroll scrollbar-hide"
                style={{ height: 'calc(100% - 70px)' }}
            >
                {messages.map((message, index) => (
                    <div
                        ref={(el: HTMLDivElement) => {
                            chatRef.current[index] = el;
                        }}
                        key={index}
                        className={`${message.sender === sender ? 'text-right' : ' text-left'}  text-white text-sm`}
                    >
                        {message.sender} - {message.message}
                    </div>
                ))}
            </div>
            <div
                className="w-full h-[50px] rounded-[20px]"
                style={{ backgroundColor: '#2F3336' }}
            >
                <form
                    className="w-full h-full flex justify-center items-center"
                    onSubmit={publish}
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
