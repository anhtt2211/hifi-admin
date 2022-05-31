import { SkillTag } from '@/types';
import axiosClient from './axiosClient';

const skillTagApi = {
  getSkillTags: async (keyword?: string) => {
    let query = '';
    if (keyword) {
      query = `?q=${keyword}`;
    }
    const {
      data: { data },
    } = await axiosClient.get('/admin/skills' + query);

    return data as SkillTag[];
  },
  createSkillTag: async (skillData: any) => {
    const {
      data: { data },
    } = await axiosClient.post('/admin/skills', skillData);

    return data;
  },
  updateSkillTag: async (id: string, skillData: any) => {
    const {
      data: { data },
    } = await axiosClient.put('/admin/skills/' + id, skillData);
    return data;
  },
  deleteSkillTag: async (id: string) => {
    const {
      data: { data },
    } = await axiosClient.delete('/admin/skills/' + id);
    return data;
  },
};

export default skillTagApi;
