import authApi from '@/api/authApi';
import { setUser } from '@/redux/slices/authSlices';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import logo from '../../../assets/images/logo.svg';
import styles from './index.module.less';

const ForgotPassword = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (values: any) => {
    setLoading(true);
    let data = {
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    authApi
      .resetPassword(data)
      .then((res) => {
        notification.success({
          message: 'Notification',
          description: 'Reset password successfully',
        });
        setTimeout(() => {
          navigate(`/login`);
        }, 2000);
      })
      .catch((err) => {
        notification.error({
          message: 'Notification',
          description: 'Reset password successfully',
        });
      });
  };

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ margin: '1.5rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={logo} style={{ height: '5rem' }} />
                  <p>Enter your username!</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      id="login-form"
                      layout="vertical"
                      onFinish={login}
                      form={form}
                      initialValues={{
                        remember: true,
                      }}
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your username!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Username"
                          prefix={<UserOutlined style={{ color: '#3e79f7' }} />}
                        ></Input>
                      </Form.Item>
                      <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            min: 6,
                            message: 'Password must be minimum 6 characters.',
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Password"
                          prefix={<LockTwoTone />}
                        ></Input.Password>
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            min: 6,
                            message: 'Password must be minimum 6 characters.',
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Confirm Password"
                          prefix={<LockTwoTone />}
                        ></Input.Password>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="submit"
                          block={true}
                          loading={loading}
                        >
                          Reset Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
