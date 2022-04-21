import companyApi from '@/api/companyApi';
import ApprovalDialog from '@/components/recruiters/ApprovalDialog';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Row,
  Skeleton,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { openNotification } from '../../utils/notification';

const { Search } = Input;

interface Company {
  accountStatus: string;
  address: string;
  contactName: string;
  createdAt: Date;
  email: string;
  industries: Array<Industry>;
  locations: Array<any>;
  name: string;
  phoneNumber: string;
  size: string;
  summary: string;
  updatedAt: Date;
  _id: string;
}

interface Industry {
  category: string;
  name: string;
  _id: string;
}

const Recruiters = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState<Company[]>();
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const [canApprove, setCanApprove] = useState(true);
  const [name, setName] = useState<string>();
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingSke, setLoadingSke] = useState(true);

  const columns: ColumnsType<Company> = [
    {
      title: 'Company name',
      dataIndex: 'name',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'summary',
      align: 'center',
      render: (summary: string) => {
        return (
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
            {summary}
          </Paragraph>
        );
      },
    },
    {
      title: '',
      dataIndex: '_id',
      align: 'center',
      width: '10%',
      render: (idRecruiter: string) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tooltip title="View details">
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  handleViewDetail(idRecruiter);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure to delete"
                visible={visibleConfirm}
                onConfirm={() => {
                  handleDelete(idRecruiter);
                }}
                okButtonProps={{ loading: loading }}
                onCancel={handleCancel}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={showPopconfirm}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const statuses = [
    {
      key: 1,
      value: 'pending',
      label: 'Pending',
    },
    {
      key: 2,
      value: 'fullfilled',
      label: 'Fullfilled',
    },
    {
      key: 3,
      value: 'rejected',
      label: 'Rejected',
    },
    {
      key: 4,
      value: 'deleted',
      label: 'Deleted',
    },
  ];

  const showPopconfirm = () => {
    setVisibleConfirm(true);
  };

  const handleCancel = () => {
    setVisibleConfirm(false);
  };

  const handleSearch = (value: string) => {
    setName(value);
  };

  const handleOnChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleViewDetail = (idRecruiter: string) => {
    setVisible(true);
    var company = dataSource?.find((company) => company?._id == idRecruiter);
    setSelectedCompany(company);
    if (company?.accountStatus != 'pending') {
      setCanApprove(false);
    }
  };

  const handleDelete = (idRecruiter: string) => {
    setLoading(true);
    companyApi
      .delete(idRecruiter)
      .then((res: any) => {
        openNotification('Delete company successfully', res.message, 'success');
        handleCancel();
      })
      .catch((error) => {
        openNotification('Delete new company failure', error, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderStatusRadio = () => {
    return (
      <Col span={isMobile ? 24 : 4}>
        <Card title="Status" size="small" style={{ padding: '8px' }}>
          <Radio.Group onChange={handleOnChange} value={status}>
            <Space direction={isMobile ? 'horizontal' : 'vertical'}>
              {statuses.map((status) => (
                <Radio value={status.value} key={status.key}>
                  {status.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Card>
      </Col>
    );
  };

  useEffect(() => {
    if (!loading) {
      setDataSource(undefined);
      setLoadingSke(true);
      companyApi.getAllCompanies(name, status).then((res) => {
        setDataSource(res.data.value);
      });
    }
  }, [name, status, loading]);

  useEffect(() => {
    if (dataSource) {
      setLoadingSke(false);
    }
  }, [dataSource]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Recruiters</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Recruiters</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={16} md={10} lg={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search by name"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={0} sm={8} md={14} lg={16} />
          {isMobile && renderStatusRadio()}
          <Col span={isMobile ? 24 : 20}>
            <Skeleton active loading={loadingSke}>
              <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                rowKey={(row) => row._id}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '15', '20'],
                }}
              />
            </Skeleton>
          </Col>
          {!isMobile && renderStatusRadio()}
        </Row>
      </Card>
      <ApprovalDialog
        setLoading={setLoading}
        loading={loading}
        canApprove={canApprove}
        data={selectedCompany}
        visible={visible}
        handleCancel={handleClose}
      ></ApprovalDialog>
    </>
  );
};

export default Recruiters;
