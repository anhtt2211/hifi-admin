import { Button, Card, Col, notification, Row, Table, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Category } from '@/types';
import categorytApi from '@/api/categoryApi';
import confirm from 'antd/lib/modal/confirm';
import { deteteImage } from '@/firebase/services';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
  data: Array<Category>;
  setData: Function;
}

const CategoryTable = (props: IProps) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>(props.data);
  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '70%',
    },
    {
      title: '',
      dataIndex: '_id',
      align: 'center',
      render: (_id: string, category) => {
        return (
          <div style={{ display: 'flex', gap: 20 }}>
            <Tooltip title="View details">
              <Button
                type="primary"
                ghost
                icon={<EyeOutlined />}
                onClick={() =>
                  navigate(`/categories/${_id}`, { state: category })
                }
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Link to={`/categories/edit/${_id}`}>
                <Button type="default" icon={<EditOutlined />} />
              </Link>
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
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      async onOk() {
        const res = await categorytApi.deleteCategory(id);
        const { data } = res.data;
        deteteImage(data.imageUrl);
        const tmp = props.data.filter((e: any) => e._id != id);
        props.setData(tmp);
        data
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

  const handleSearch = (value: string) => {
    const tmp = props.data.filter(
      (e) => e.name.toLowerCase().search(value.toLowerCase()) >= 0,
    );
    setCategories(tmp);
  };

  useEffect(() => {
    setCategories(props.data);
  }, [props.data]);

  return (
    <Card>
      <Row gutter={[20, 20]}>
        <Col flex="auto" />
        <Col span={12}>
          <Search
            className="full"
            size="large"
            placeholder="Search industry"
            allowClear
            enterButton
            onSearch={(e) => handleSearch(e)}
          />
        </Col>
        <Col span={24}>
          <Table<Category>
            bordered
            columns={columns}
            dataSource={categories}
            rowKey={(row) => row._id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '50', '100'],
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default CategoryTable;
