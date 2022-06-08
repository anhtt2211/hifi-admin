import ChangePassword from '@/components/profile/change-password';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Tabs } from 'antd';
// import EditProfile from 'components/Setting/EditProfile';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
const Profile = () => {
  const [position, setPosition] = useState<string>('left');
  useEffect(() => {
    if (screen.width < 768) {
      setPosition('top');
    }
  }, []);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Profile</h3>
      <Card>
        <Tabs tabPosition={'left'} moreIcon={<></>}>
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Change password
              </span>
            }
            key="1"
          >
            <ChangePassword />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
