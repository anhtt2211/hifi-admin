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

  getAuth: async (admin: any) => {
    var response = await axiosClient.get(`${baseController}`, {});

    return response.data;
  },
};

export default authApi;
