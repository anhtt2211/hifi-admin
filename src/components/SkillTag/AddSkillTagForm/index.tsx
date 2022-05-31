import skillTagApi from '@/api/skillTagApi';
import { SkillTag } from '@/types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IProps {
  onSuccess: (skill: SkillTag, mode: string) => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const AddSkillTagForm = ({ onSuccess }: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ names }: any) => {
    setLoading(true);
    try {
      const newSkill = await skillTagApi.createBatchSkillTags(names);
      onSuccess(newSkill, 'add-batch');
      notification.success({
        message: 'Created skill successfully!',
      });
      form.resetFields();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: 'Error',
          description: error.response?.data.message,
        });
      } else {
        notification.error({
          message: error,
        });
      }
    }

    setLoading(false);
  };

  return (
    <Card>
      <h3 className="heading"> {'Add skills'}</h3>
      <Form form={form} onFinish={handleSubmit}>
        <Form.List name="names" {...formItemLayoutWithOutLabel}>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={true}
                  key={field.key}
                  label={index === 0 ? 'Name' : ''}
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input subcategory name.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Subcategory name"
                      style={{ width: '80%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ marginLeft: '20px' }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  New
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddSkillTagForm;
