import ChangePassword from '@/components/profile/change-password';
import { LockOutlined } from '@ant-design/icons';
import { Card, Tabs } from 'antd';
import { useEffect, useState } from 'react';

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
