import companyApi from '@/api/companyApi';
import { ApprovalDiglog } from '@/components/recruiters/ApprovalDialog';
import { color } from '@/constants/badgeColors';
import { DEFAULT_IMAGE } from '@/constants/colors';
import { Company } from '@/types';
import socket from '@/utils/messageSocket';
import { DeleteOutlined, EyeOutlined, WechatOutlined } from '@ant-design/icons';
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
  Tag,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router';
import { NavLink, useNavigate } from 'react-router-dom';
import { openNotification } from '../../utils/notification';

const { Search } = Input;

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
  const adminId = localStorage.getItem('adminId');
  const navigate = useNavigate();
  const location = useLocation();
  const comingCompany = (location.state as any)?.companyId;
  console.log('comingCompany: ', comingCompany);
  const columns: ColumnsType<Company> = [
    {
      title: 'Logo',
      dataIndex: '_id',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <img
          src={record.logo || DEFAULT_IMAGE}
          style={{
            width: '80%',
            maxWidth: '50px',
            maxHeight: '50px',
            height: '80%',
          }}
        />
      ),
    },
    {
      title: 'Company name',
      dataIndex: 'name',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Industries',
      dataIndex: 'industries',
      align: 'center',
      width: '15%',
      render: (industries: any) => {
        return (
          <Row>
            {industries.map((category: any, index: number) => (
              <Tag
                color={color[Math.floor(Math.random() * color.length)]}
                key={index}
              >
                {category.name}
              </Tag>
            ))}
          </Row>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'summary',
      align: 'center',
      render: (summary: string) => {
        return (
          <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
            {summary}
          </Paragraph>
        );
      },
    },
    {
      title: '',
      dataIndex: '_id',
      align: 'center',
      width: '15%',
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
            <Tooltip title="Chat">
              <Button
                type="primary"
                icon={<WechatOutlined />}
                onClick={() => {
                  handleChat(idRecruiter);
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
    var company = dataSource?.find(
      (company: Company) => company?._id == idRecruiter,
    );
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

  const handleChat = (recruiterId: string) => {
    socket.connect();
    socket.emit('joinRoomByChatterId', {
      admin: adminId,
      company: recruiterId,
    });

    navigate('/chatting');
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

  useEffect(() => {
    console.log('comingCompanyId', comingCompany);
    if (comingCompany) {
      const com = dataSource?.find(
        (company: Company) => company._id === comingCompany,
      );
      console.log('Finded Coming company', com);
      if (com) {
        setVisible(true);
      }
      setSelectedCompany(com);
    }
  }, [dataSource, comingCompany]);

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
      {selectedCompany && (
        <ApprovalDiglog
          setLoading={setLoading}
          loading={loading}
          canApprove={canApprove}
          data={selectedCompany}
          visible={visible}
          handleCancel={handleClose}
        />
      )}
    </>
  );
};

export default Recruiters;
