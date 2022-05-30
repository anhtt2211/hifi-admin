import postApi from '@/api/postApi';
import { Post, Skill } from '@/models/post';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  notification,
  Row,
  Tag,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DescriptionItem from '../DescriptionItem';
import styles from './index.module.less';

type Props = {};

export const PostDetails = (props: Props) => {
  const [data, setData] = useState<Post>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postApi.getById(id);
        if (res.data.data) {
          console.log(res.data.data);
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleApprovePost = async () => {
    try {
      const result = await postApi.approvePost(id, true);

      notification.success({
        message: `${result.data.message}`,
      });
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };

  const handleRejectPost = async () => {
    try {
      const result = await postApi.approvePost(id, false);

      notification.success({
        message: `${result.data.message}`,
      });
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };
  return (
    <Card className={styles.container}>
      <div className={styles.titleContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.title}>{data?.title}</span>
          {data?.verficationStatus == 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button
                  icon={<CheckOutlined />}
                  className={styles.icon}
                  onClick={handleApprovePost}
                >
                  Approve
                </Button>
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  danger
                  icon={<CloseOutlined />}
                  className={styles.icon}
                  onClick={handleRejectPost}
                >
                  Reject
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        <Divider />
      </div>
      <Row>
        <Col span={24}>
          {data?.skillTags.map((element: Skill, i) => (
            <Tag key={i} className={styles.tag}>
              {element.text}
            </Tag>
          ))}
        </Col>
        <Row style={{ marginTop: '10px' }}>
          <div style={{ fontSize: '1rem', marginBottom: '20px' }}>
            <Col span={24}>
              {' '}
              {`${data?.company?.name} · ${data?.locations[0]}`}
            </Col>
          </div>
          <Col span={24}>
            <DescriptionItem
              iconName="CurrencyDollarIcon"
              content={
                data?.salary.negotiable
                  ? 'Negotiable'
                  : `${data?.salary.min} - ${data?.salary.max} ${data?.salary.unit}`
              }
              outline={true}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="BriefcaseIcon"
              content={`${data?.jobType}`}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="OfficeBuildingIcon"
              content={data?.jobCategory.name ?? ''}
            />
          </Col>
        </Row>
        <Row className={styles.descriptionContanier}>
          <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </Row>
        <Divider />
      </Row>
    </Card>
  );
};
