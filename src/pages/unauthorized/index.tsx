import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const UnAuthorzied = () => {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to="/login">
            <Button type="primary">Back to login</Button>
          </Link>
        }
      />
    </div>
  );
};

export default UnAuthorzied;
