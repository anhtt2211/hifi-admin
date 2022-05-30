import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { FC } from 'react';

interface IProps {
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

const EmojiPicker: FC<IProps> = (props) => {
  const { handleAddEmoji } = props;

  const handleSelect = (emoji: EmojiData) => {
    handleAddEmoji(emoji.native);
  };

  return <Picker set="google" onSelect={handleSelect} />;
};

export default EmojiPicker;
