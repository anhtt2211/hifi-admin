import AddCategoryForm from '@/components/Category/AddCategoryForm';
import CategoryTable from '@/components/Category/CategoryTable';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCategoriesRequest } from '@/redux/slices/categorySlice';
import { Col, Row } from 'antd';
import { useEffect } from 'react';

const Categories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);
  return (
    <div>
      <h1 className="heading">Category list</h1>
      <Row gutter={[20, 20]}>
        <Col span={14}>
          <CategoryTable />
        </Col>
        <Col span={10}>
          <AddCategoryForm />
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
