import authApi from '@/api/authApi';
import { $auth } from '@/redux/slices/authSlices';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './index.module.less';

const ChangePassword = () => {
  const navigate = useNavigate();
  const user = useSelector($auth).auth;
  const idUser = localStorage.getItem('idUser');

  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    if (newPassword != confirmPassword) {
      notification['error']({
        message: 'Error',
        description: `The confirm password must be the same as the new password `,
      });
      return;
    }
    if (currentPassword == newPassword) {
      notification['error']({
        message: 'Error',
        description: `The new password must be different from the current password `,
      });
      return;
    }

    authApi
      .changePassword({
        username: values.username,
        password: values.newPassword,
        currentPassword: values.currentPassword,
      })
      .then((res) => {
        notification.success({
          message: 'Notification',
          description: 'Change password successfully',
        });
        setTimeout(() => {
          navigate(`/login`);
          window.location.reload();
          localStorage.clear();
        }, 1000);
      })
      .catch((err) => {
        notification.error({
          message: 'Notification',
          description: 'Change password failure',
        });
      });
  };
  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Row>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="Current password"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be minimum 6 characters.',
                    },
                  ]}
                >
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="New password"
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please input new password!' },
                    {
                      min: 6,
                      message: 'Password must be minimum 6 characters.',
                    },
                  ]}
                >
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input confirm password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be minimum 6 characters.',
                    },
                  ]}
                >
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} xs={24} sm={24} md={14}>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  Change password
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChangePassword;
