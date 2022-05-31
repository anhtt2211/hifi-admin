import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { Picker } from 'emoji-mart';
import moment from 'moment';
import React, { FC, useState } from 'react';
import socket from '@/utils/messageSocket';
import styles from './index.module.less';

interface IProps {
  roomId?: string;
}

const ChatBoxInput: FC<IProps> = (props) => {
  const { roomId } = props;
  const [value, setValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const userId = localStorage.getItem('adminId');

  const handleSendMessage = (newMessage: string) => {
    socket.emit('sendDataClient', {
      room: roomId,
      message: {
        userId: userId,
        content: newMessage,
        createdAt: moment(),
      },
    });
    setValue('');
  };

  const handleAddEmoji = (emoji: string) => {
    setValue(value.concat(emoji));
  };

  const handleSelect = (emoji: any) => {
    handleAddEmoji(emoji.native);
  };

  return (
    <div className={styles.container}>
      <Button
        className={[styles.btn, styles['btn-picker']].join(' ')}
        size="large"
        type="link"
        onClick={() => {
          setShowPicker(!showPicker);
        }}
      >
        🙂
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={[
            styles.picker,
            !showPicker && styles['picker-hidden'],
          ].join(' ')}
        >
          <Picker onSelect={handleSelect} />
        </div>
      </Button>
      <Input.TextArea
        value={value}
        placeholder="Type something..."
        onKeyUp={(event) => {
          if (
            !(event.key === 'Enter' && event.shiftKey) &&
            event.key === 'Enter'
          )
            handleSendMessage((event.target as HTMLInputElement).value);
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <Button
        className={styles.btn}
        type="link"
        size="large"
        icon={<SendOutlined />}
        onClick={() => {
          handleSendMessage(value);
        }}
      />
    </div>
  );
};

export default ChatBoxInput;
