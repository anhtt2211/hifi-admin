import categorytApi from '@/api/categoryApi';
import { deteteImage, uploadImage } from '@/firebase/services';
import { Category } from '@/types';
import { history } from '@/utils/history';
import { Button, Card, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageFileUpload from '../ImageFileUpload';

interface Props {
  data: Array<Category>;
  setData: Function;
}

const AddCategoryForm = (props: Props) => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const [category, setCategory] = useState<Category>();
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  useEffect(() => {
    if (id) {
      const tmp = props.data.find((e) => e._id == id);
      setCategory(tmp);

      form.setFieldsValue({
        name: tmp?.name,
      });
      setIsEdit(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    const { name, image } = form.getFieldsValue();
    let url;
    if (image) {
      const res = await uploadImage(image);
      url = res.url;
      if (res.error) {
        notification.error({
          message: 'Uploaded image failed',
          description: res.error,
        });
        return;
      }
    }
    try {
      if (isEdit) {
        let res;
        if (url) {
          res = await categorytApi.updateCategory(id, {
            name: name,
            imageUrl: url,
          });
        } else {
          res = await categorytApi.updateCategory(id, {
            name: name,
          });
        }
        const updatedCategory = res.data;
        const tmp = props.data.map((e) => (e._id == id ? updatedCategory : e));
        props.setData(tmp);
        deteteImage(category?.imageUrl);
        notification.success({
          message: 'Updated category successfully!',
        });
      } else {
        const { data } = await categorytApi.createCategory({
          name: name,
          imageUrl: url,
        });
        const tmp = [...props.data, data];
        props.setData(tmp);
        notification.success({
          message: 'Created category successfully!',
        });
      }
    } catch (error: any) {
      await deteteImage(url);
      notification.error({
        message: error,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    history.push('/categories');
    setIsEdit(false);
    id = undefined;
  };

  return (
    <Card>
      <h2>{isEdit ? 'Edit category' : 'Add category'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onReset={resetForm}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <ImageFileUpload />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large" block>
            Save
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset" type="default" size="large" block>
            Discard
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategoryForm;
