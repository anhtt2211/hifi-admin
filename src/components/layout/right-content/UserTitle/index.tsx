import React, { useEffect } from 'react';
import { Avatar, Col, Row } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { $auth } from '@/redux/slices/authSlices';

const Title = () => {
  const avatarUrl = 'https://joeschmoe.io/api/v1/random';
  const authState = useAppSelector($auth);

  return (
    <div>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Col span={7}>
          <Avatar shape="square" src={avatarUrl} />
        </Col>
        <Col span={17}>
          <p style={{ fontSize: '16px', marginBottom: '0' }}>
            {authState.auth?.data.name}
          </p>
          <p
            style={{
              color: 'rgba(114,132,154,.7)',
              fontSize: '14px',
              marginBottom: '4px',
            }}
          ></p>
        </Col>
      </Row>
    </div>
  );
};

export default Title;
