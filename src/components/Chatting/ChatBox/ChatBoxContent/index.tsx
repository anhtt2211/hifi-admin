import { Message, Room } from '@/types';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import socket from '../../../../api/socket';
import ChatItem from './ChatItem';
import styles from './index.module.less';
interface Props {
  newMessage: string;
  room: Room;
}

const ChatBoxContent: FC<Props> = (props) => {
  const { newMessage, room } = props;
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userId = '6255931ff19b3638879e3303';

  useEffect(() => {
    socket.on('sendDataServer', (data: Message) => {
      setMessageList((pre) => [...pre, data]);
    });
  }, [socket]);

  useEffect(() => {
    setMessageList(room.messages);
  }, [room]);

  useEffect(() => {
    newMessage != '' &&
      setMessageList([
        ...messageList,
        { userId, content: newMessage, createdAt: moment().format() },
      ]);
  }, [newMessage]);

  return (
    <div className={styles.container}>
      <div>
        {messageList.map((message, index) => {
          return (
            <ChatItem
              key={index}
              isMine={message.userId === userId}
              message={message.content}
              date={message.createdAt}
            ></ChatItem>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBoxContent;
