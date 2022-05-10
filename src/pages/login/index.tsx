import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import styles from './index.module.less';
import bcrypt from 'bcryptjs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { $auth, loginRequest } from '@/redux/slices/authSlices';

const hash = (text: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

interface IFormData {
  username: string;
  password: string;
}

const Login = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const authState = useAppSelector($auth);
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState('0');
  const [failedMessage, setFailedMessage] = useState('');
  const [form] = Form.useForm();

  const login = (values: IFormData) => {
    setLoading(true);
    let data = {
      username: values.username,
      password: values.password,
    };
    dispatch(loginRequest(data));
  };

  let noticeFailed = () => {
    handleFailed('Please fill in all input fields!');
  };

  const handleFailed = (message: string) => {
    setFailedMessage(message);

    setIsFailed('1');
    setTimeout(function () {
      setIsFailed('0');
    }, 5000);
  };

  useEffect(() => {
    if (authState.auth) {
      localStorage.setItem('accessToken', authState.auth.accessToken);
      localStorage.setItem('adminId', authState.auth.data._id);
      history.push('/');
    }
  }, [authState]);

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ margin: '1.5rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={logo} style={{ height: '5rem' }} />
                  <p>Welcom to Hifi Admin!</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <div style={{ opacity: `${isFailed}` }}>
                      <Alert message={failedMessage} type="error" showIcon />
                    </div>
                    <Form
                      id="login-form"
                      layout="vertical"
                      onFinish={login}
                      onFinishFailed={noticeFailed}
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
                        label="Password"
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
                      <Form.Item>
                        <Link to={`./forgot-password`}>
                          <Button className={styles['btn-forgot']} type="link">
                            Forgot password?
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="submit"
                          block={true}
                          loading={loading}
                        >
                          Sign In
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

export default Login;
