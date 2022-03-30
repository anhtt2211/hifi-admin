import { Button, Card, Col, notification, Row, Table, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
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
import { Link } from 'react-router-dom';

interface Props {
  data: Array<Category>;
  setData: Function;
}

const CategoryTable = (props: Props) => {
  const columns: ColumnsType<Category> = [
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
      render: (_id: string) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tooltip title="View details">
              <Button type="primary" ghost icon={<EyeOutlined />} />
            </Tooltip>
            <Tooltip title="Edit">
              <Link to={`/categories/${_id}`}>
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
      title: 'Do you want to delete this course?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      async onOk() {
        const { data } = await categorytApi.deleteCategory(id);
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
    // const tmp = props.data.filter(
    //   (e) => e.name.toLowerCase().search(value.toLowerCase()) >= 0,
    // );
    // props.setData(tmp);
  };

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
            dataSource={props.data}
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
