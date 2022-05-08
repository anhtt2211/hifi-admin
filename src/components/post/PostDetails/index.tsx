import postApi from '@/api/postApi';
import HeroIcon from '@/components/commons/HeroIcon';
import { PostDetail, Skill } from '@/models/post';
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
import { useParams, useHistory } from 'react-router-dom';
import styles from './index.module.less';

type Props = {};

type ItemProps = {
  iconName: string;
  content: string;
  outline?: boolean;
};

const DescriptionItem = (props: ItemProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <HeroIcon
        icon={props.iconName}
        outline={props.outline ? props.outline : false}
        style={{ marginRight: '20px' }}
      />
      {props.content}
    </div>
  );
};

export const PostDetails = (props: Props) => {
  const [data, setData] = useState<PostDetail>();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postApi.getById(id);
        if (res.data.data) {
          const tmp = res.data.data;
          const post = {
            _id: tmp._id,
            title: tmp.title,
            jobType: tmp.jobType,
            jobCategories: tmp.jobCategories,
            salary: tmp.salary,
            description: tmp.description,
            skillTags: tmp.skillTags,
            locations: tmp.locations,
            verficationStatus: tmp.verficationStatus,
          };
          setData(post);
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
    history.goBack();
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
    history.goBack();
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
            <Col span={24}>Netcompany · Ho Chi Minh City, Viet Nam</Col>
            <Col span={24}>On-site · 1 week ago </Col>
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
              content="FullTime · Senior level"
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="OfficeBuildingIcon"
              content="501-1,000 employees · Software Development"
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
