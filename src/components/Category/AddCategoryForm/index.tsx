import categorytApi from '@/api/categoryApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  $categories,
  createCategory,
  updateCategory,
} from '@/redux/slices/categorySlice';
import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '../ImageFileUpload';

const AddCategoryForm = () => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const categoriesState = useAppSelector($categories);

  useEffect(() => {
    if (id) {
      const category = categoriesState.find((e) => e._id == id);
      form.setFieldsValue({
        name: category?.name,
      });
      if (category?.imageUrl) {
      }
      setIsEdit(true);
    }
  }, [id]);

  const handleUploadImage = () => {
    try {
      setIsLoading(true);
      const { image } = form.getFieldsValue();
      const data = new FormData();
      data.append('file', image[0]);
      data.append('upload_preset', 'hifi_upload');
      data.append('cloud_name', 'hifi');

      axios
        .post('https://api.cloudinary.com/v1_1/hifi/image/upload', data)
        .then((res) => {
          const { url } = res.data;
          handleSubmit(url);
        });
    } catch (err) {
      message.error('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (url: string) => {
    const { name } = form.getFieldsValue();

    if (isEdit) {
      categorytApi
        .updateCategory(id, {
          name: name,
          imageUrl: url,
        })
        .then(({ data }) => dispatch(updateCategory(data.data)));
    } else {
      categorytApi
        .createCategory({
          name: name,
          imageUrl: url,
        })
        .then(({ data }) => dispatch(createCategory(data.data)));
    }

    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    navigation('/categories');
    setIsEdit(false);
    id = undefined;
  };

  return (
    <Card>
      <h3 className="heading"> {isEdit ? 'Edit category' : 'Add category'}</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUploadImage}
        onReset={resetForm}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Please upload category image!' }]}
        >
          <ImageUpload />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Save
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset" type="default" block>
            Discard
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategoryForm;
