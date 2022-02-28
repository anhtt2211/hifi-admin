import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = ({ chilren }) => {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{chilren}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
