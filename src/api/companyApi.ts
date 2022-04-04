import axiosClient from './axiosClient';

const companyApi = {
  getAllCompanies: async (name: string | undefined, status: string) => {
    return await axiosClient.get('/companies/', {
      params: {
        name: name,
        status: status,
      },
    });
  },

  getCompany: async (id: String) => {
    return await axiosClient.get(`/companies/${id}`);
  },

  approve: async (id: String, message: String) => {
    return await axiosClient.post(`/companies/${id}/approve`, { message });
  },

  reject: async (id: String, message: String) => {
    return await axiosClient.post(`/companies/${id}/reject`, { message });
  },

  delete: async (id: String) => {
    return await axiosClient.delete(`/companies/${id}`);
  },
};

export default companyApi;
