import skillTagApi from '@/api/skillTagApi';
import { SkillTag } from '@/types';
import { Button, Form, Input, Modal, notification } from 'antd';
import React from 'react';

type Props = {
  visible: boolean;
  skill: SkillTag;
  onSuccess?: (skill: SkillTag, mode?: string) => void;
  onCancel?: () => void;
};

const UpdateSkillTagModal = ({
  skill,
  onSuccess,
  visible,
  onCancel,
}: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async ({ text }: any) => {
    setLoading(true);
    const updatedSkill = await skillTagApi.updateSkillTag(skill._id, {
      text,
    });
    onSuccess?.(updatedSkill);
    setLoading(false);
    notification.success({
      message: 'Updated skill successfully!',
    });
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <h3 className="heading"> {'Edit skill'}</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="text"
          rules={[{ required: true, message: 'Please input skill name!' }]}
          initialValue={skill ? skill.text : ''}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSkillTagModal;
