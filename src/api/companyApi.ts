import axiosClient from './axiosClient';

const companyApi = {
  getAllCompanies: async (name: string | undefined, status: string) => {
    return await axiosClient.get('/admin/companies/', {
      params: {
        name: name,
        status: status,
      },
    });
  },

  getCompany: async (id: String) => {
    return await axiosClient.get(`/admin/companies/${id}`);
  },

  approve: async (id: String, message: String) => {
    return await axiosClient.post(`/admin/companies/${id}/approve`, {
      message,
    });
  },

  reject: async (id: String, message: String) => {
    return await axiosClient.post(`/admin/companies/${id}/reject`, { message });
  },

  delete: async (id: String) => {
    return await axiosClient.delete(`/admin/companies/${id}`);
  },
};

export default companyApi;
