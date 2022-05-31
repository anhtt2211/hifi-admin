type SkillTag = {
  _id: string;
  text: string;
};
type Category = {
  _id: string;
  name: string;
  imageUrl: any;
  subcategories: Subcategory[];
};
type Subcategory = {
  _id: string;
  name: string;
};

export type { Category, Subcategory, SkillTag };
