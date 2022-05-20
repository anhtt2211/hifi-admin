import axiosClient from './axiosClient';

const url: string = '/admin/categories';

const categorytApi = {
  getAllCategories: () => {
    return axiosClient.get(url);
  },
  createCategory: (category: any) => {
    return axiosClient.post(url, {
      ...category,
    });
  },
  updateCategory: (id: any, category: any) => {
    return axiosClient.patch(`${url}/${id}`, { ...category });
  },
  deleteCategory: (id: string) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  // .post(categoryController.createCategory)
  // .patch(categoryController.updateCategory)
  // .delete(categoryController.deleteCategory);
};
export default categorytApi;
