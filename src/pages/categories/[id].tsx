import AddSubcategoriesForm from '@/components/Category/AddSubcategoriesForm';
import SubcategoryTable from '@/components/Category/SubcategoryTable';
import { Col, Row } from 'antd';
import { useState } from 'react';

const CategoryDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h3 className="heading">Subcategory list</h3>
      <Row gutter={[20, 20]}>
        <Col span={14}>
          <SubcategoryTable isLoading={isLoading} />
        </Col>
        <Col span={10}>
          <AddSubcategoriesForm setIsLoading={setIsLoading} />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryDetails;
