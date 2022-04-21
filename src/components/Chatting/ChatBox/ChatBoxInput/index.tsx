import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import styles from './index.module.less';
import socket from '../../../../api/socket';
import EmojiPicker from '../../EmojiPicker';
import moment from 'moment';
import { Picker } from 'emoji-mart';

interface Props {
  roomId?: string;
}

const ChatBoxInput: FC<Props> = (props) => {
  const { roomId } = props;
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
  };

  const handleClosePicker = () => {
    setShowPicker(false);
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
