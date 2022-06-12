import categorytApi from '@/api/categoryApi';
import AddCategoryForm from '@/components/Category/AddCategoryForm';
import CategoryTable from '@/components/Category/CategoryTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  $categories,
  createCategory,
  fetchCategoriesRequest,
} from '@/redux/slices/categorySlice';
import { Category } from '@/types';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [data, setData] = useState<Array<Category>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);
  const abc = () => {
    dispatch(
      createCategory({
        _id: 'asb',
        name: 'axz',
        imageUrl: '',
        subcategories: [],
      }),
    );
  };
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
