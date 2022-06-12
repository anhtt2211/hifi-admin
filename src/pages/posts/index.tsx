import postApi from '@/api/postApi';
import CheckboxMenu from '@/components/commons/CheckboxMenu';
import ListPost from '@/components/post/ListPost';
import { Post } from '@/models/post';
import { Button, Card, Col, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const { Search } = Input;
const { Option } = Select;
type Props = {};

type FilterOption = {
  value: String | Number;
  label: String;
};

export type DataSource = {
  message: string;
  data: Post[];
  totalItems: number;
  totalPages: number;
};
export const PostPage = (props: Props) => {
  const [companyOption, setCompanyOption] = useState<Array<FilterOption>>([]);
  const [categoryOption, setCategoryOption] = useState<Array<FilterOption>>([]);
  const [query, setQuery] = useState('');

  const [selectedCompany, setSelectedCompany] = useState<
    Array<String | Number>
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Array<String | Number>
  >([]);
  const [dataSource, setDataSource] = useState<DataSource>();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  const handleSearch = async (text: String) => {
    try {
      navigate(`${text ? `?search=${text}` : ''}`);
      const posts = await postApi.getPosts(`?search=${text}`);
      setDataSource(posts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async () => {
    try {
      let queryTmp = '';
      if (selectedCompany.length > 0) {
        queryTmp += `?company=${selectedCompany.join(',')}`;
      }
      if (selectedCategory.length > 0) {
        queryTmp += `${
          queryTmp.length > 0 ? '&' : '?'
        }category=${selectedCategory.join(',')}`;
      }
      if (selectedStatus == 'approved') {
        queryTmp =
          queryTmp +
          `${queryTmp.length > 0 ? '&' : '?'}verficationStatus=fulfilled`;
      } else if (selectedStatus != 'all') {
        queryTmp =
          queryTmp +
          `${
            queryTmp.length > 0 ? '&' : '?'
          }verficationStatus=${selectedStatus}`;
      }
      setQuery(queryTmp);
      const res = await postApi.getPosts(queryTmp);
      setDataSource(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postApi.getPosts();
        if (res.data.data) {
          setDataSource(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getFilterOption = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    getFilterOption();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="heading">Posts list</h1>
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
            <ListPost data={dataSource} query={query} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
