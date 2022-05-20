import { subcategorytApi } from '@/api';
import { Subcategory } from '@/types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, message, notification } from 'antd';
import Button from 'antd/es/button/button';
import React from 'react';
import { useParams } from 'react-router-dom';

interface IProps {
  setIsLoading: Function;
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

const AddSubcategoriesForm = (props: IProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const handleSubmit = () => {
    props.setIsLoading(true);
    const { names } = form.getFieldsValue();
    const subcategories = names.map((name: string) => ({ name: name }));

    subcategorytApi
      .batchCreateSubcategories(id, subcategories)
      .then((res) => {
        form.resetFields();
        props.setIsLoading(false);
        notification.success({ message: 'Created successfully!' });
      })
      .catch((err) => message.error(err?.message || 'Error'));
  };
  return (
    <Card>
      <h3 className="heading">Add subcategory</h3>
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
                      style={{ width: '90%' }}
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
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddSubcategoriesForm;
