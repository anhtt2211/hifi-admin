import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';

interface IImageFileUploadProps {
  value?: RcFile[];
  onChange?: (value: RcFile[]) => void;
}

const ImageFileUpload: React.FC<IImageFileUploadProps> = ({
  value,
  onChange,
}) => {
  const [imageFiles, setImageFiles] = useState<RcFile[]>([]);

  const onRemove = (file: UploadFile<unknown>) => {
    if (!value) return;
    const index = value.findIndex((f) => f.uid === file.uid);
    const newFileList = value.slice();
    newFileList.splice(index, 1);
    setImageFiles((prevFiles) => {
      const index = prevFiles.findIndex((f) => f.uid === file.uid);
      const newFileList = prevFiles.slice();
      newFileList.splice(index, 1);
      return newFileList;
    });
    onChange?.(newFileList);
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image');
    if (!isImage) {
      message.error(`${file.name} is not a image file`);
      return;
    }
    if (value) value = [];
    setImageFiles([file]);
    onChange?.([file]);
    return false;
  };
  return (
    <Upload
      name="file"
      maxCount={1}
      fileList={value || imageFiles}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
    >
      <Button type="default" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default ImageFileUpload;
