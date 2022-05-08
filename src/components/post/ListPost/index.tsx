import postApi from '@/api/postApi';
import { Post } from '@/models/post';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, notification, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.less';

type Props = {
  data: any;
};

const ListPost = (props: Props) => {
  const columns: ColumnsType<Post> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%',
      render: (tag) => {
        const color =
          tag == 'Pending' ? 'orange' : tag == 'Approved' ? 'blue' : 'gray';
        return (
          <Tag color={color} key={tag}>
            {tag}
          </Tag>
        );
      },
    },
    {
      key: '_id',
      dataIndex: '_id',
      align: 'center',
      render: (_id: any) => {
        return (
          <div>
            <Tooltip title="View details">
              <Link to={`/posts/${_id}`}>
                <Button icon={<EyeOutlined />} className={styles.action} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                onClick={() => handleDeletePost(_id)}
                icon={<DeleteOutlined />}
                className={styles.action}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const [data, setData] = useState<Array<Post>>();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postApi.getPosts(location.search);
        if (res.data.data) {
          const posts = res.data.data.map((e: any) => {
            return {
              title: e.title,
              company: e.company?.name,
              createdAt: moment(e.createdAt).format('DD/MM/YYYY HH:mm:ss'),
              updatedAt: moment(e.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
              category:
                e.jobCategories.length > 0
                  ? e.jobCategories[0].category.name
                  : '',
              _id: e._id,
              status:
                e.verficationStatus == 'fulfilled'
                  ? 'Approved'
                  : e.verficationStatus.charAt(0).toUpperCase() +
                    e.verficationStatus.slice(1),
            };
          });
          setData(posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (props.data) {
      const tmp = props.data.map((e: any) => {
        return {
          title: e.title,
          company: e.company?.name,
          createdAt: moment(e.createdAt).format('DD/MM/YYYY HH:mm:ss'),
          updatedAt: moment(e.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
          category:
            e.jobCategories.length > 0 ? e.jobCategories[0].category.name : '',
          _id: e._id,
          status:
            e.verficationStatus == 'fulfilled'
              ? 'Approved'
              : e.verficationStatus.charAt(0).toUpperCase() +
                e.verficationStatus.slice(1),
        };
      });
      setData(tmp);
    }
  }, [props.data]);

  const handleDeletePost = async (id: any) => {
    try {
      const result = await postApi.deletePost(id);
      notification.success({ message: 'Successfully!' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ListPost;
