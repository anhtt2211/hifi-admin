import postApi from '@/api/postApi';
import CheckboxMenu from '@/components/commons/CheckboxMenu';
import HeroIcon from '@/components/commons/HeroIcon';
import HeaderPost from '@/components/post/Header';
import ListPost from '@/components/post/ListPost';
import { Button, Card, Col, Input, Row, Select, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const { Search } = Input;
const { Option } = Select;
type Props = {};

type FilterOption = {
  value: String | Number;
  label: String;
};
const PostPage = (props: Props) => {
  const [companyOption, setCompanyOption] = useState<Array<FilterOption>>([]);
  const [categoryOption, setCategoryOption] = useState<Array<FilterOption>>([]);
  const [selectedCompany, setSelectedCompany] = useState<
    Array<String | Number>
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Array<String | Number>
  >([]);
  const [dataSource, setDataSource] = useState();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const result = await postApi.getFilterOption();
      const companies = result.data.data.companyOption.map((e: any) => {
        return {
          value: e._id,
          label: e.name,
        };
      });
      setCompanyOption(companies);
      const categories = result.data.data.categoryOption.map((e: any) => {
        return {
          value: e._id,
          label: e.name,
        };
      });
      setCategoryOption(categories);
    };
    fetchData();
  }, []);

  const handleSearch = async (text: String) => {
    try {
      navigate(`${text ? `?search=${text}` : ''}`);
      const posts = await postApi.getPosts(`?search=${text}`);
      console.log(posts.data.data);
      setDataSource(posts.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async () => {
    try {
      let query = '';
      if (selectedCompany.length > 0) {
        query += `?company=${selectedCompany.join(',')}`;
      }
      if (selectedCategory.length > 0) {
        query += `${
          query.length > 0 ? '&' : '?'
        }category=${selectedCategory.join(',')}`;
      }
      if (selectedStatus == 'approved') {
        query =
          query + `${query.length > 0 ? '&' : '?'}verficationStatus=fulfilled`;
      } else if (selectedStatus != 'all') {
        query =
          query +
          `${query.length > 0 ? '&' : '?'}verficationStatus=${selectedStatus}`;
      }
      const posts = await postApi.getPosts(query);
      setDataSource(posts.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row>
        <HeaderPost />
      </Row>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <Search
              placeholder="Search"
              onSearch={(text) => handleSearch(text)}
              enterButton
            />
          </Col>
          <Col span={18}>
            <div className={styles.filterContainer}>
              <CheckboxMenu
                options={companyOption}
                onChange={(selectedItems: any) => {
                  setSelectedCompany(selectedItems);
                }}
                keyword="By company"
              />
              <CheckboxMenu
                options={categoryOption}
                onChange={(selectedItems: any) => {
                  setSelectedCategory(selectedItems);
                }}
                keyword="By category"
              />
              <Col span={4}>
                <Select
                  style={{ width: '100%' }}
                  defaultValue="all"
                  onChange={(value) => setSelectedStatus(value)}
                >
                  <Option value="all">All status</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              </Col>
              <Button
                type="primary"
                className={styles.btnFilter}
                onClick={handleFilter}
              >
                Filter
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <ListPost data={dataSource} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PostPage;
