import { Breadcrumb } from 'antd';
import React from 'react';
import styles from './index.module.less';

type Props = {};

const HeaderPost = (props: Props) => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className={styles.header}>Post list</h2>
    </div>
  );
};

export default HeaderPost;
