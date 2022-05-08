import { notification } from 'antd';

export const openNotification = (
  title: string,
  message: string,
  type: 'open' | 'success' | 'info' | 'warning' | 'error',
) => {
  notification[type]({
    message: title,
    description: message,
  });
};
