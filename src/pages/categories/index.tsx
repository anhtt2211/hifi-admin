import categorytApi from '@/api/categoryApi';
import AddCategoryForm from '@/components/Category/AddCategoryForm';
import CategoryTable from '@/components/Category/CategoryTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  $categories,
  fetchCategoriesRequest,
} from '@/redux/slices/categorySlice';
import { Category } from '@/types';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [data, setData] = useState<Array<Category>>([]);
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector($categories);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
    // const categories
    // categorytApi
    //   .getAllCategories()
    //   .then((res) => setData(res.data.data))
    //   .catch((err) => console.log(err));
  }, []);
  console.log(categoryState);

  // useEffect(() => {
  // }, [categoryState]);
  return (
    <div>
      <h1 className="heading">Category list</h1>
      <Row gutter={[20, 20]}>
        <Col span={14}>
          <CategoryTable data={data} setData={setData} />
        </Col>
        <Col span={10}>
          <AddCategoryForm data={data} setData={setData} />
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
