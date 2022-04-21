import React, { FC } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Modal, Popconfirm } from 'antd';
import styles from './index.module.less';

const { confirm } = Modal;

interface Props {
  visible: boolean;
  handleCancel: Function;
  handleAddEmoji: Function;
}

type EmojiSkin = 1 | 2 | 3 | 4 | 5 | 6;

interface EmojiData {
  id: string;
  name: string;
  colons: string;
  /** Reverse mapping to keyof emoticons */
  emoticons: string[];
  unified: string;
  skin: EmojiSkin | null;
  native: string;
}

const EmojiPicker: FC<Props> = (props) => {
  const { visible, handleCancel, handleAddEmoji } = props;

  const handleSelect = (emoji: EmojiData) => {
    handleAddEmoji(emoji.native);
  };

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={() => {
        handleCancel();
      }}
      width="400px"
      footer={null}
    >
      <Picker set="google" onSelect={handleSelect} />
    </Modal>
  );
};

export default EmojiPicker;
