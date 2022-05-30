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
  company: {
    _id: string;
    name: string;
  };
  description: any;
  skillTags: Array<Skill>;
  locations: any;
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
