import axiosClient from './axiosClient';

const baseController = '/admin/auth/';

const authApi = {
  login: async (admin: any) => {
    var response = await axiosClient.post(`${baseController}login`, {
      username: admin.username,
      password: admin.password,
    });

    return response.data;
  },

  resetPassword: async (data: any) => {
    var response = await axiosClient.put(`${baseController}reset-password`, {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    return response.data;
  },

  changePassword: async (data: any) => {
    var response = await axiosClient.put(`${baseController}change-password`, {
      username: data.username,
      password: data.password,
      currentPassword: data.currentPassword,
    });

    return response.data;
  },

  getAuth: async (admin: any) => {
    var response = await axiosClient.get(`${baseController}`, {});

    return response.data;
  },
};

export default authApi;
