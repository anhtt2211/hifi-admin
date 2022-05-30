import axiosClient from './axiosClient';

const notificationApi = {
  readNotification: async (userId: string, notificationId: string) => {
    return await axiosClient.put(`/admin/notification/read`, {
      adminId: userId,
      notificationId,
    });
  },
};

export default notificationApi;
