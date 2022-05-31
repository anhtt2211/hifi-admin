import skillTagApi from '@/api/skillTagApi';
import { SkillTag } from '@/types';
import { Button, Card, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  skill: SkillTag | null;
  onSuccess: (skill: SkillTag) => void;
  onReset: () => void;
}

const AddSkillTagForm = ({ onSuccess, onReset, skill }: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [skill]);

  const handleSubmit = async ({ text }: { text: string }) => {
    setLoading(true);
    try {
      if (skill) {
        const updatedSkill = await skillTagApi.updateSkillTag(skill._id, {
          text,
        });
        onSuccess(updatedSkill);
        notification.success({
          message: 'Updated skill successfully!' + text,
        });
      } else {
        const newSkill = await skillTagApi.createSkillTag({ text });
        onSuccess(newSkill);
        notification.success({
          message: 'Created skill successfully!' + text,
        });
      }
    } catch (error: any) {
      notification.error({
        message: error,
      });
    }

    setLoading(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Card>
      <h3 className="heading"> {skill ? 'Edit skill' : 'Add skill'}</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onReset={resetForm}
      >
        <Form.Item
          label="Name"
          name="text"
          rules={[{ required: true, message: 'Please input skill name!' }]}
          initialValue={skill ? skill.text : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={loading}
          >
            Save
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            size="large"
            block
            onClick={() => {
              onReset();
              form.resetFields();
            }}
            loading={loading}
          >
            Discard
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddSkillTagForm;
