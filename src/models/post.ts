import { Company, WorkLocation } from '@/types';

type Post = {
  _id: string;
  title: string;
  jobType: string;
  jobCategory: {
    _id: string;
    name: string;
    category: {
      _id: string;
      name: string;
    };
  };
  salary: Salary;
  company: Partial<Company>;
  description: any;
  skillTags: Array<Skill>;
  locations: WorkLocation[];
  workplaceType: 'remote' | 'on-site' | 'hybrid';
  experienceLevel:
    | 'Internship'
    | 'Entry level'
    | 'Associate'
    | 'Mid-Senior level'
    | 'Director';
  verficationStatus: string;
  createdAt: string;
  updatedAt: string;
};

type Salary = {
  min: Number;
  max: Number;
  unit: string;
  negotiable: Boolean;
};
type Skill = {
  _id: string;
  text: string;
};
export type { Post, Salary, Skill };
