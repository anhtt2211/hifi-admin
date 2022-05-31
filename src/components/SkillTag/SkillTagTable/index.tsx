import categorytApi from '@/api/categoryApi';
import skillTagApi from '@/api/skillTagApi';
import { deteteImage } from '@/firebase/services';
import { SkillTag } from '@/types';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, notification, Row, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Search from 'antd/lib/input/Search';
import confirm from 'antd/lib/modal/confirm';
import React, { useState } from 'react';

interface IProps {
  data: Array<SkillTag>;
  setData: React.Dispatch<React.SetStateAction<SkillTag[]>>;
  onSelect: (selectedSkill: SkillTag) => void;
}

const SkillTagTable = (props: IProps) => {
  const [searching, setSearching] = useState(false);
  const columns: ColumnsType<SkillTag> = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'text',
      width: '60%',
    },
    {
      title: '',
      width: '30%',
      dataIndex: '_id',
      align: 'center',
      render: (_id: string, category) => {
        return (
          <div
            style={{ display: 'flex', justifyContent: 'flex-start', gap: 20 }}
          >
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => props.onSelect(category)}
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
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      async onOk() {
        try {
          await skillTagApi.deleteSkillTag(id);
          props.setData((prev) => prev.filter((item) => item._id !== id));
          notification.success({
            message: 'Deleted successfully',
          });
        } catch (error) {
          notification.error({
            message: 'Error',
          });
        }
      },
      onCancel() {},
    });
  };

  const handleSearch = async (value: string) => {
    setSearching(true);
    try {
      const data = await skillTagApi.getSkillTags(value);
      props.setData(data ?? []);
    } catch (error) {
      console.log('error', error);
    }
    setSearching(false);
  };

  return (
    <Card>
      <Row gutter={[20, 20]}>
        <Col flex="auto" />
        <Col span={12}>
          <Search
            className="full"
            size="large"
            placeholder="Search skill"
            allowClear
            enterButton
            loading={searching}
            onSearch={(e) => handleSearch(e)}
          />
        </Col>
        <Col span={24}>
          <Table<SkillTag>
            bordered
            columns={columns}
            dataSource={props.data}
            rowKey={(row) => row._id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '100'],
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default SkillTagTable;
