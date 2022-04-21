import { Room } from '@/types';
import React, { FC, useState } from 'react';
import ChatBoxContent from './ChatBoxContent';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxInput from './ChatBoxInput';
import styles from './index.module.less';

interface Props {
  room?: Room;
}

const ChatBox: FC<Props> = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState('');
  return (
    <div className={styles.container}>
      {room && (
        <>
          <ChatBoxHeader chatter={room.chatters[0]}></ChatBoxHeader>
          <ChatBoxContent newMessage={newMessage} room={room} />
          <ChatBoxInput
            setNewMessage={setNewMessage}
            roomId={room._id}
          ></ChatBoxInput>
        </>
      )}
    </div>
  );
};

export default ChatBox;
