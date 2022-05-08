import { type } from "os";

 type Post =  {
    title: String;
    company: String;
    createdAt: String;
    updatedAt: String;
    category: String;
    _id: String;
}
type Salary = {
    min: Number;
    max: Number;
    unit: String;
    negotiable: Boolean;
  };

 type PostDetail = {
    _id: String;
    title: String;
    jobType: String;
    jobCategories: Array<String>;
    salary: Salary;
    description: any;
    skillTags: Array<Skill>;
    locations: Array<String>;
    verficationStatus: String;
  };
  type Skill = {
    _id: String;
    text: String;
  };
  export type {Post, PostDetail, Salary, Skill}