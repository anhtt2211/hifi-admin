import axiosClient from './axiosClient';

const url: string = '/admin/subcategories';

const subcategorytApi = {
  getAll: (id: any) => {
    return axiosClient.get(`${url}/${id}`);
  },
  batchCreateSubcategories: (id: any, subcategories: any) => {
    return axiosClient.post(`${url}/${id}`, {
      subcategories: subcategories,
    });
  },
  updateSubcategory: (id: any, name: any) => {
    return axiosClient.patch(`${url}/${id}`, { ...name });
  },
  deleteSubcategory: (id: string) => {
    return axiosClient.delete(`${url}/${id}`);
  },
};
export default subcategorytApi;
