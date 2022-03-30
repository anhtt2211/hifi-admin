import React from 'react';
import { Layout } from 'antd';
import { IRoute } from '@/models/route';

const { Header, Footer, Sider, Content } = Layout;

interface Props {
  children: IRoute[];
}
export const AppLayout = (props: Props) => {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{props.children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
