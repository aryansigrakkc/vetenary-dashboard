/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Form, Flex, Input, message, Drawer, Space, Card, Upload, Tag, Table, Radio, Pagination, Select, Switch, Modal, Badge } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, ScissorOutlined, MenuFoldOutlined, DeleteOutlined, EyeOutlined, SignatureOutlined, FileExcelOutlined, FilePdfOutlined, FileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, createClient, changeClientStatus, fetchDeletedClient, fetchInactiveClient, restoreClient, deleteClient, changeClientImage, updateClient } from '../../redux/thunks/clientThunk'
import InputSearchField from '../../components/search/InputSearchField';
import dayjs from 'dayjs'
import { errorMessage } from '../../utils';
import utility from '../../services/utility';
import FileSaver from 'file-saver';


const Client = () => {

  const [recperpage, SetRecPerPage] = useState(5);
  const [activepage, SetActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState({ excel: false, pdf: false, csv: false });
  const sno = recperpage * (activepage - 1);
  const [open, setOpen] = useState(false);

  const [type, setType] = useState('');
  const [actionType, setActionType] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const clients = useSelector(state => state.client);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [mainObjectId, setMainObjectId] = useState("");


  useEffect(() => {
    if (filterStatus === "All") {
      fetchAllClient();
    } else if (filterStatus === "Inactive") {
      handleInactiveClient();
    } else {
      handleDeletedClient();
    }
  }, [activepage, recperpage, inputSearch]);

  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [fileList, setFileList] = useState([]);
  const [viewClientData, setViewClientData] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobileNo', values.mobileNo);
    formData.append('lat', values.latitude);
    formData.append('long', values.longitude);
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj
      : null);
    dispatch(createClient(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllClient();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : errorMessage(res);;

      }
    }).catch(err => {
      message.error(err.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo);
  };

  const onUpdateFinish = (values) => {
    const obj = {
      _id: mainObjectId,
      name: values.name,
      email: values.email,
      mobileNo: values.mobileNo,
      lat: values.latitude,
      long: values.longitude,
    }
    dispatch(updateClient(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllClient();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : errorMessage(res);;
        fetchAllClient();
      }
    }).catch(err => {
      fetchAllClient();
      message.error(err.message);
    })
  };

  const onUpdateFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo);
  };

  const fetchAllClient = () => {
    dispatch(fetchClient({ activepage, recperpage, inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        errorMessage(res);
      }
    });
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  /*Modal Box*/
  const showModal = (_id, actionType) => {
    setMainObjectId(_id);
    setIsModalOpen(true);
    setActionType(actionType);
    if (actionType === 'view') {
      showClientData(_id);
    }
  };
  const handleOk = () => {
    if (type === "restore" && actionType === "restore") {
      hanleRestoreClient();
      setIsModalOpen(false);
    }
    else if (type === "active" && actionType === "reactive") {
      hanleRestoreClient();
      setIsModalOpen(false);
    }
    else if (type === "delete" && actionType === "delete") {
      hanleRestoreClient();
      setIsModalOpen(false);
    }
    else if (type === "") {
      message.error("Please enter value")
    }
    else {
      message.error(`Please enter ${actionType} as value`)
    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMainObjectId(null);
    setType("");
  };
  /*Modal box end here*/

  function paginationHandler(page, pageSize) {
    SetRecPerPage(pageSize);
    SetActivePage(page);
    setCurrentPage(page);
  }

  const handleClientStatus = (id, status) => {
    status = status === 0 ? 1 : 0;
    let obj = {
      _id: id,
      status: status
    }
    dispatch(changeClientStatus(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        fetchAllClient();
      } else {
        if (res.payload.errors) {
          res.payload.errors.forEach((err) => {
            message.error(err.msg);
          })
          fetchAllClient();
        } else {
          errorMessage(res);;
        }

      }
    }).catch((err) => {
      message.error(err.message);
    })

  }

  const hanleRestoreClient = () => {
    if (filterStatus === "Inactive") {
      const obj = {
        _id: mainObjectId,
        status: 1
      }
      dispatch(changeClientStatus(obj)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchInactiveClient({ activepage, recperpage, inputSearch }))
          setType("");
        } else {
          setType("");
          res.payload?.errors ? res.payload.errors.forEach((err) => {
            message.error(err);
          }) : errorMessage(res);;

        }
      })

    } else if (filterStatus === "Deleted") {
      dispatch(restoreClient({ activepage, recperpage, mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          handleDeletedClient();
          setType("");
        } else {
          setType("");
          errorMessage(res);
        }
      });
    }
    else if (actionType === "delete") {
      dispatch(deleteClient({ mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllClient();
          setType("");
        } else {
          setType("");
          errorMessage(res);
          fetchAllClient();
        }
      });
    }
    else {
      fetchAllClient();
    }
  }

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, value) => {
        return (<>
          <img src={value.image} width={50} height={50} />
        </>);
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNo',
      key: 'mobileNo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, value) => {
        if (filterStatus === 'All') {
          if (value.isDeleted === false) {
            return (<>
              <Switch
                checked={value.status}
                onChange={() => handleClientStatus(value._id, value.status)}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </>)
          } else {
            return (<Tag color="red">Deleted</Tag>)
          }

        } else if (filterStatus === "Inactive") {
          if (value.status === 0)
            return (<Tag color="red">Inactive</Tag>)
          else
            return (<Tag color="green">Active</Tag>)
        } else {
          if (value.isDeleted === false)
            return (<Tag color="green">Not Deleted</Tag>)
          else
            return (<Tag color="red">Deleted</Tag>)
        }

      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, value) => {
        if (filterStatus === "All") {
          return (<>
            <Flex wrap gap="small" className="site-button-ghost-wrapper">

              <Button size={'small'} icon={<EyeOutlined />} onClick={() => showModal(value._id, 'view')} title={'View Client'} />
              <Button size={'small'} icon={<SignatureOutlined />} onClick={() => handleClientUpdate(value._id)} title={'Edit Client'} />
              <Button size={'small'} icon={<DeleteOutlined />} danger onClick={() => showModal(value._id, 'delete')} title={'Delete Client'} />
            </Flex>
          </>)
        } else if (filterStatus === "Inactive") {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'reactive')}><MenuFoldOutlined title={"Active Client"} /></Button>)
        } else {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'restore')}><ScissorOutlined title={"Restore Deleted Client"} /></Button>)
        }
      }
    },

  ];
  const arr = [];
  clients?.data?.data?.forEach((item, idx) => {
    arr.push({
      _id: item._id,
      sno: (idx + sno + 1),
      name: item.fullName,
      email: item.email,
      mobileNo: item.mobileNo,
      latitude: item.lat,
      longitude: item.long,
      image: `http://localhost:8080/${item.image}`,
      status: item.status,
      createdAt: (dayjs(item.timeStamps).format('DD/MM/YY')),
      isDeleted: item.isDeleted,
      action: item
    })
  });

  const handlePerPageRecord = (value) => {
    SetRecPerPage(value);
  }
  const handleClientFilter = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
    SetActivePage(1);
    setCurrentPage(1);
    if (value === "Inactive") {
      handleInactiveClient();
    } else if (value === "Deleted") {
      handleDeletedClient();
    } else {
      fetchAllClient();
    }

  }

  const handleInactiveClient = () => {
    dispatch(fetchInactiveClient({ activepage, recperpage, inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        errorMessage(res);
      }
    });
  }
  const handleDeletedClient = () => {
    dispatch(fetchDeletedClient({ activepage, recperpage, inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        errorMessage(res);
      }
    }).catch(err => {

    });
  }

  const handleForm = (e) => {
    const { value } = e.target;
    setType(value);
  }

  const showClientData = (_id) => {
    const item = arr.find(item => item._id === _id);
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    form.setFieldsValue({ name: item.name })
    setViewClientData(mainObj);
  }

  const handleClientUpdate = (_id) => {
    const item = arr.find(item => item._id === _id);
    showDrawer(true);
    setActionType('update');
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    setViewClientData(mainObj);
    setMainObjectId(_id);
    form.setFieldsValue({ name: mainObj.name, image: mainObj.image }); // Update form fields
  }

  const handleCustomRequest = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('_id', mainObjectId);
    formData.append('image', file);
    dispatch(changeClientImage(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllClient();
        setOpen(false);
        showDrawer(false)
        setFileList([]);
        form.resetFields();
      } else {
        errorMessage(res);

      }
    }).catch(err => {
      message.error(err.message);
    })
  };

  const downloadExcel = async () => {
    try {
      setLoading({ ...loading, excel: true });
      const response = await utility.get('/client/export/excel/client', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, `${new Date()}-${filterStatus}-Client.xlsx`);
      setLoading({ ...loading, excel: false });
    } catch (error) {
      setLoading({ ...loading, excel: false });
      console.error('Error downloading the file', error);
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading({ ...loading, pdf: true });
      const response = await utility.get('/client/export/pdf/Client', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, 'sample.pdf');
      setLoading({ ...loading, pdf: false });
    } catch (error) {
      setLoading({ ...loading, pdf: false });
      console.error('Error downloading the file', error);
    }
  };
  const downloadCSV = async () => {
    try {
      setLoading({ ...loading, csv: true });
      const response = await utility.get('/client/export/csv/client', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'Client-data.csv');
      setLoading({ ...loading, csv: false });
    } catch (error) {
      setLoading({ ...loading, csv: false });
      console.error('Error downloading CSV:', error);
    }
  };



  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-12">
            <div className='d-flex justify-content-between  mb-2'>
              <div className='d-flex justify-content-start'>
                <Select
                  defaultValue={recperpage}
                  onChange={handlePerPageRecord}
                  options={[
                    {
                      value: '5',
                      label: '5',
                    },
                    {
                      value: '10',
                      label: '10',
                    },
                    {
                      value: '20',
                      label: '20',
                    },
                    {
                      value: '50',
                      label: '50',
                    }
                  ]}
                />
                <Button type="dashed" loading={loading.excel} disabled={loading.excel} onClick={downloadExcel} className='ms-3' icon={<FileExcelOutlined />}>Excel</Button>
                <Button type="dashed" loading={loading.pdf} disabled={loading.pdf} onClick={downloadPDF} className='ms-3' icon={<FilePdfOutlined />}>PDF</Button>
                <Button type="dashed" loading={loading.csv} disabled={loading.csv} onClick={downloadCSV} className='ms-3' icon={<FileOutlined />}>CSV</Button>
              </div>
              <div className='d-flex align-items-center'>
                <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleClientFilter}>
                  <Radio value={'All'}>All {filterStatus === "All" ? <Badge count={clients?.data?.totalRecords ?? 0} color='green' /> : ''}</Radio>
                  <Radio value={'Inactive'}>Inactive {filterStatus === "Inactive" ? <Badge count={clients?.data?.totalRecords ?? 0} color='yellow' /> : ''}</Radio>
                  <Radio value={'Deleted'}>Deleted {filterStatus === "Deleted" ? <Badge count={clients?.data?.totalRecords ?? 0} color='red' /> : ''}</Radio>
                </Radio.Group>
                <div className='search-field ms-3 me-3'>
                  <InputSearchField setInputSearch={setInputSearch} loadingStatus={clients.isLoading} />
                </div>
                <Button
                  type="primary"
                  size={'small'}
                  icon={<PlusOutlined />}
                  onClick={() => showDrawer()}
                />
              </div>
            </div>
            <div className=''>
              <Drawer
                placement={'right'}
                height={'auto'}
                width={500}
                onClose={onClose}
                open={open}
              >
                {
                  actionType === "update" ?
                    <>
                      <div className='col-md-12'>
                        <Space direction="vertical" size={20} style={{ width: "100%" }}>
                          <Card title="Update Client">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onUpdateFinish}
                              onFinishFailed={onUpdateFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="Client Title"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewClientData?.name}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Client name',
                                    min: 3,
                                  },
                                  {
                                    message: 'Maximum characters allowed up to 20',
                                    max: 20,
                                  },

                                ]}
                              >
                                <Input placeholder="Please enter Client name" />
                              </Form.Item>

                              <Form.Item
                                name="email"
                                label="Email"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewClientData?.email}
                                rules={[
                                  {
                                    type: 'email',
                                    required: true,
                                    message: 'Please enter a valid email',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Email" />
                              </Form.Item>

                              <Form.Item
                                name="mobileNo"
                                label="Mobile Number"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewClientData?.mobileNo}
                                rules={[
                                  {
                                    required: true,
                                    pattern: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
                                    message: 'Please enter a valid mobile number',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Mobile Number" />
                              </Form.Item>

                              <Form.Item
                                name="latitude"
                                label="Latitude"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewClientData?.latitude}
                                rules={[
                                  {
                                    required: true,
                                    type: 'number',
                                    min: -90,
                                    max: 90,
                                    transform(value) {
                                      return Number(value);
                                    },
                                    message: 'Please enter a valid latitude between -90 and 90',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Latitude" />
                              </Form.Item>

                              <Form.Item
                                name="longitude"
                                label="Longitude"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewClientData?.longitude}
                                rules={[
                                  {
                                    required: true,
                                    type: 'number',
                                    min: -180,
                                    max: 180,
                                    transform(value) {
                                      return Number(value);
                                    },
                                    message: 'Please enter a valid longitude between -180 and 180',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Longitude" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="Client Image"
                                size={'large'}
                              >

                                <ImgCrop rotationSlider>
                                  <Upload
                                    listType="picture-card"
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    customRequest={handleCustomRequest}
                                    fileList={fileList.length < 1 ? viewClientData?.fileList : fileList}
                                  >
                                    {fileList.length < 1 && '+ Upload'}
                                  </Upload>
                                </ImgCrop>

                              </Form.Item>
                              <Form.Item label=" ">
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Form.Item>
                            </Form>
                          </Card>
                        </Space>
                      </div>

                    </> :
                    <>
                      <div className='col-md-12'>
                        <Space direction="vertical" size={20} style={{ width: "100%" }}>
                          <Card title="Add New Client">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="Client Title"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Client name',
                                    min: 3,
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Client name" />
                              </Form.Item>

                              <Form.Item
                                name="email"
                                label="Email"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    type: 'email',
                                    required: true,
                                    message: 'Please enter a valid email',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Email" />
                              </Form.Item>

                              <Form.Item
                                name="mobileNo"
                                label="Mobile Number"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    pattern: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
                                    message: 'Please enter a valid mobile number',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Mobile Number" />
                              </Form.Item>

                              <Form.Item
                                name="latitude"
                                label="Latitude"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    type: 'number',
                                    min: -90,
                                    max: 90,
                                    transform(value) {
                                      return Number(value);
                                    },
                                    message: 'Please enter a valid latitude between -90 and 90',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Latitude" />
                              </Form.Item>

                              <Form.Item
                                name="longitude"
                                label="Longitude"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    type: 'number',
                                    min: -180,
                                    max: 180,
                                    transform(value) {
                                      return Number(value);
                                    },
                                    message: 'Please enter a valid longitude between -180 and 180',
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Longitude" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="Client Image"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      if (fileList.length < 1) {
                                        return Promise.reject('Please choose Client image');
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >

                                <ImgCrop rotationSlider>
                                  <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                  >
                                    {fileList.length < 1 && '+ Upload'}
                                  </Upload>
                                </ImgCrop>

                              </Form.Item>
                              <Form.Item label=" ">
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Form.Item>
                            </Form>
                          </Card>
                        </Space>
                      </div>

                    </>
                }
              </Drawer>
            </div>
          </div>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={arr} onChange={onChangeTable} pagination={false} loading={clients.isLoading} />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={clients?.data?.totalRecords}
              showSizeChanger={false}
              size="small"
              pageSize={recperpage}
              current={currentPage}
              onChange={(page, pageSize) => {
                paginationHandler(page, pageSize);
              }}
            />
          </div>
        </div>
      </div>
      <Modal title={`${actionType} Client`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {
            actionType === "restore" ?
              <><input type="text" className='form-control' value={type} onChange={handleForm} />
                <p>Note:If you want to restore the deleted Client so please type <pre><code><Tag color={"green"}>'restore'</Tag></code></pre></p></> :
              actionType === "reactive" ?
                <>
                  <input type="text" className='form-control' value={type} onChange={handleForm} />
                  <p>Note:If you want to activate to this Client so please type <pre><code><Tag color={"green"}>'active'</Tag></code></pre></p>
                </> :
                actionType === "view" ?
                  <>
                    <div className='col-md-12'>
                      <Space direction="vertical" size={20} style={{ width: "100%" }}>
                        <Card title="">
                          <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              name="name"
                              label="Client Name"
                              size={'large'}
                              initialValue={viewClientData?.name}
                            >
                              <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                              name="image"
                              label="Client Image"
                              size={'large'}
                              hasFeedback={true}
                            >
                              <Upload
                                listType="picture-card"
                                fileList={viewClientData?.fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                              >

                              </Upload>
                            </Form.Item>
                          </Form>
                        </Card>
                      </Space>
                    </div>
                  </> :
                  <>
                    <input type="text" className='form-control' value={type} onChange={handleForm} />
                    <p>Note:If you want to delete Client so please type <pre><code><Tag color={"red"}>'delete'</Tag></code></pre></p>
                  </>
          }

        </div>
      </Modal>

    </>
  )
}

export default Client