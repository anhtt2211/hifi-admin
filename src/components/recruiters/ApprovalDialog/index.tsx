import companyApi from '@/api/companyApi';
import notificationSocket from '@/utils/notificationSocket';
import { capitalizeFirstLetter } from '@/utils/string';
import { Badge, Button, Descriptions, Input, Modal, Tag } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { openNotification } from '../../../utils/notification';

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  data: any;
  canApprove: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const ApprovalDiglog: FC<IProps> = (props) => {
  const { visible, handleCancel, data, canApprove, loading, setLoading } =
    props;
  const userId = localStorage.getItem('adminId');

  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
  const [type, setType] = useState('approve');
  const [message, setMessage] = useState('');

  const color = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  const badgeStatus = {
    pending: 'warning',
    fullfilled: 'success',
    rejected: 'error',
    deleted: 'error',
  };

  const getBadgeStatus = (companyStatus: string): any | undefined => {
    var status: [string, string] | undefined = Object.entries(badgeStatus).find(
      ([key, value]) => {
        if (key === companyStatus) return value;
      },
    );
    return status?.[1];
  };

  const handleApprove = () => {
    setLoading(true);
    companyApi
      .approve(data?._id, message)
      .then((res: any) => {
        openNotification(
          'Approve new company successfully',
          res.message,
          'success',
        );

        handleSendNoti(message);

        handleCancel();
      })
      .catch((error: any) => {
        openNotification('Approve new company failure', error, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReject = () => {
    setLoading(true);
    companyApi
      .reject(data?._id, message)
      .then((res: any) => {
        openNotification(
          'Reject new company successfully',
          res.message,
          'success',
        );

        handleSendNoti(message);

        handleCancel();
      })
      .catch((error) => {
        openNotification('Reject new company failure', error, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSendNoti = (message: string) => {
    const sendData = {
      receiverType: 'company',
      receiver: data?._id,
      message: message,
      redirectUrl: '',
      createdAt: moment(),
    };

    notificationSocket.emit('sendNotification', sendData);
  };

  const handleCancelApprove = () => {
    setIsMessageBoxVisible(false);
  };

  const handleConfirmApprove = () => {
    setIsMessageBoxVisible(true);
    setType('approve');
  };

  const handleConfirmReject = () => {
    setIsMessageBoxVisible(true);
    setType('reject');
  };

  const handleConfirm = () => {
    type === 'approve' ? handleApprove() : handleReject();
    handleCancelApprove();
  };

  useEffect(() => {
    if (data) {
      notificationSocket.emit('joinNotification', {
        receiver: data?._id,
      });
    }
  }, [data]);

  return (
    <Modal
      title="Approve New Recruiter"
      visible={visible}
      style={{ top: 40, margin: '0 80px 40px 80px' }}
      width={'auto'}
      onCancel={handleCancel}
      footer={[
        <Button
          disabled={!canApprove}
          key="approve"
          type="primary"
          loading={loading}
          onClick={handleConfirmApprove}
        >
          Approve
        </Button>,
        <Button
          key="reject"
          disabled={!canApprove}
          danger
          type="primary"
          loading={loading}
          onClick={handleConfirmReject}
        >
          Reject
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Descriptions
        title="Company Info"
        bordered
        labelStyle={{ fontWeight: 'bold' }}
        column={{ lg: 3, md: 1 }}
      >
        <Descriptions.Item label="Company Name" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {data?.locations[0].officeName} {data?.locations[0].address}{' '}
          {data?.locations[0].city}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {data?.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Industries" span={2}>
          {data?.industries.map((category: any, index: number) => (
            <Tag
              color={color[Math.floor(Math.random() * color.length)]}
              key={index}
            >
              {category.name}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Employees">{data?.size}</Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge
            status={getBadgeStatus(data?.accountStatus)}
            text={capitalizeFirstLetter(data?.accountStatus)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Summary" span={3}>
          {data?.summary}
        </Descriptions.Item>
      </Descriptions>
      <Modal
        title="Send message to company"
        visible={isMessageBoxVisible}
        onOk={handleConfirm}
        onCancel={handleCancelApprove}
      >
        <Input.TextArea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Type message send to company"
        ></Input.TextArea>
      </Modal>
    </Modal>
  );
};
