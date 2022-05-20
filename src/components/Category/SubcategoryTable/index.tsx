import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Table,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Subcategory } from '@/types';
import confirm from 'antd/lib/modal/confirm';
import { subcategorytApi } from '@/api';
import { useLocation, useParams } from 'react-router-dom';

interface IProps {
  isLoading: Boolean;
}

const SubcategoryTable = (props: IProps) => {
  const [data, setData] = useState<Array<Subcategory>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState<Subcategory>();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (!props.isLoading) {
      subcategorytApi
        .getAll(id)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [id, props]);

  const columns: ColumnsType<Subcategory> = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: '',
      dataIndex: '_id',
      align: 'center',
      render: (_id: string, value) => {
        return (
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
          >
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModalVisible(true);
                  setValue(value);
                  form.setFieldsValue({ name: value.name });
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(_id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id: string) => {
    confirm({
      title: 'Do you want to delete this subcategory?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      async onOk() {
        const res = await subcategorytApi.deleteSubcategory(id);
        const subcategory = res.data.data;
        const tmp = data.filter((e: any) => e._id != id);
        setData(tmp);
        subcategory
          ? notification.success({
              message: 'Deleted successfully',
            })
          : notification.error({
              message: 'Error',
            });
      },
      onCancel() {},
    });
  };

  const handleEdit = () => {
    const { name } = form.getFieldsValue();
    subcategorytApi
      .updateSubcategory(value?._id, { name: name })
      .then((res) => {
        const subcategory = res.data.data;
        setIsModalVisible(false);
        form.resetFields();
        const tmp = data.map((e) =>
          e._id == subcategory._id ? subcategory : e,
        );
        setData(tmp);
        notification.success({ message: 'Edited successfully!' });
      })
      .catch((err) => message.error(err?.message || 'Error'));
  };

  return (
    <>
      <Card>
        <Table<Subcategory>
          bordered
          columns={columns}
          dataSource={data}
          rowKey={(row) => row._id}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '50', '100'],
          }}
        />
      </Card>
      <Modal
        visible={isModalVisible}
        title="Edit subcategory name"
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleEdit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input subcategory name.',
              },
            ]}
          >
            <Input placeholder="Subcategory name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubcategoryTable;
