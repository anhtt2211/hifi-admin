import React, { FC, useEffect, useState } from 'react';
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from 'socket.io-client';
import moment from 'moment';
import { Message, Room } from '@/types';

interface IProps {}

const socket = io(import.meta.env.VITE_MESSAGE_URL, {
  path: '/message',
});

const Minichat: FC<IProps> = (props) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState('');

  const handleNewUserMessage = (newMessage: string) => {
    socket.emit('sendDataClient', {
      room: '624eb34b3e53c97e3ee113c5',
      message: {
        userId: '6253d28a27aa74eb68b2988e',
        content: newMessage,
        createdAt: moment(),
      },
    });
  };

  useEffect(() => {
    socket.on('sendDataServer', (data: Room) => {
      setMessageList(data.messages);
    });

    socket.on('sendRoom', (data: Room) => {
      setRoomId(data._id);
      setMessageList(data.messages);
    });
  }, [socket]);

  useEffect(() => {
    // socket.connect();
    // socket.emit('joinRoom', '624eb34b3e53c97e3ee113c5');
  }, []);

  useEffect(() => {
    messageList.map((message) => {
      if (message.userId === '6253d28a27aa74eb68b2988e') {
        addUserMessage(message.content);
      } else {
        addResponseMessage(message.content);
      }
    });
  }, [messageList]);

  return (
    <div>
      <Widget
        emojis
        showTimeStamp={false}
        showBadge
        handleNewUserMessage={handleNewUserMessage}
        subtitle="Connect with admin"
      />
    </div>
  );
};

export default Minichat;
