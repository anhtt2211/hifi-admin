import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import styles from './index.module.less';
import socket from '../../../../api/socket';
import EmojiPicker from '../../EmojiPicker';
import moment from 'moment';

interface Props {
  roomId?: string;
  setNewMessage: Function;
}

const ChatBoxInput: FC<Props> = (props) => {
  const { roomId, setNewMessage } = props;
  const [value, setValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = (newMessage: string) => {
    socket.emit('sendDataClient', {
      room: roomId,
      message: {
        userId: '6255931ff19b3638879e3303',
        content: newMessage,
        createdAt: moment(),
      },
    });
    setValue('');
    setNewMessage(newMessage);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  const handleAddEmoji = (emoji: string) => {
    setValue(value.concat(emoji));
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btn}
        size="large"
        type="link"
        onClick={() => {
          setShowPicker(!showPicker);
        }}
      >
        🙂
      </Button>
      <Input
        value={value}
        placeholder="Type something..."
        onPressEnter={(event) => {
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
      <EmojiPicker
        visible={showPicker}
        handleCancel={handleClosePicker}
        handleAddEmoji={handleAddEmoji}
      ></EmojiPicker>
    </div>
  );
};

export default ChatBoxInput;
