import React, { useEffect, useState } from 'react';
import { Button, Form, Flex, Input, message, Drawer, Space, Card, Upload, Tag, Table, Radio, Pagination, Select, Switch, Modal, Badge } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, ScissorOutlined, MenuFoldOutlined, DeleteOutlined, EyeOutlined, SignatureOutlined, FileExcelOutlined, FilePdfOutlined, FileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffer, createOffer, changeOfferStatus, fetchDeletedOffer, fetchInactiveOffer, restoreOffer, deleteOffer, changeOfferImage, updateOffer } from '../../redux/thunks/offerThunk'
import dayjs from 'dayjs'
import { errorMessage } from '../../utils';
import utility from '../../services/utility';
import FileSaver from 'file-saver';
import InputSearchField from '../../components/search/InputSearchField';

const Offer = () => {
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
  const offer = useSelector(state => state.offer);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [mainObjectId, setMainObjectId] = useState("");

  useEffect(() => {
    if (filterStatus === "All") {
      fetchAllOffer();
    } else if (filterStatus === "Inactive") {
      handleInactiveOffer();
    } else {
      handleDeletedOffer();
    }
  }, [activepage, recperpage, inputSearch]);
  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [fileList, setFileList] = useState([]);
  const [viewOfferData, setViewOfferData] = useState([]);
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
    formData.append('fromAmont', parseInt(values.fromAmount));
    formData.append('toAmount', parseInt(values.toAmount));
    formData.append('percentage', parseInt(values.percentage));
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj
      : null);
    dispatch(createOffer(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOffer();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        errorMessage(res);

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
      name: values.name
    }
    dispatch(updateOffer(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOffer();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        errorMessage(res);
        fetchAllOffer();
      }
    }).catch(err => {
      fetchAllOffer();
      errorMessage(res);
    })
  };

  const onUpdateFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo);
  };

  const fetchAllOffer = () => {
    dispatch(fetchOffer({ activepage, recperpage, inputSearch })).then((res) => {
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
      showOfferData(_id);
    }
  };
  const handleOk = () => {
    if (type === "restore" && actionType === "restore") {
      hanleRestoreOffer();
      setIsModalOpen(false);
    }
    else if (type === "active" && actionType === "reactive") {
      hanleRestoreOffer();
      setIsModalOpen(false);
    }
    else if (type === "delete" && actionType === "delete") {
      hanleRestoreOffer();
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
  }

  const handleOfferStatus = (id, status) => {
    status = status === 0 ? 1 : 0;
    let obj = {
      _id: id,
      status: status
    }
    dispatch(changeOfferStatus(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        fetchAllOffer();
      } else {
        errorMessage(res);

      }
    }).catch((err) => {
      message.error(err.message);
    })

  }

  const hanleRestoreOffer = () => {
    if (filterStatus === "Inactive") {
      const obj = {
        _id: mainObjectId,
        status: 1
      }
      dispatch(changeOfferStatus(obj)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchInactiveOffer({ activepage, recperpage, inputSearch }))
          setType("");
        } else {
          setType("");
          errorMessage(res);
        }
      })

    } else if (filterStatus === "Deleted") {
      dispatch(restoreOffer({ activepage, recperpage, mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchDeletedOffer({ activepage, recperpage, inputSearch }));
          setType("");
        } else {
          setType("");
          errorMessage(res);
        }
      });
    }
    else if (actionType === "delete") {
      dispatch(deleteOffer({ mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllOffer();
          setType("");
        } else {
          setType("");
          errorMessage(res);
          fetchAllOffer();
        }
      });
    }
    else {
      fetchAllOffer();
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
      title: 'Starting Amount',
      dataIndex: 'fromAmount',
      key: 'fromAmount',
    },
    {
      title: 'Ending Amount',
      dataIndex: 'toAmount',
      key: 'toAmount',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
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
                onChange={() => handleOfferStatus(value._id, value.status)}
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

              <Button size={'small'} icon={<EyeOutlined />} onClick={() => showModal(value._id, 'view')} title={'View Offer'} />
              <Button size={'small'} icon={<SignatureOutlined />} onClick={() => handleOfferUpdate(value._id)} title={'Edit Offer'} />
              <Button size={'small'} icon={<DeleteOutlined />} danger onClick={() => showModal(value._id, 'delete')} title={'Delete Offer'} />
            </Flex>
          </>)
        } else if (filterStatus === "Inactive") {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'reactive')}><MenuFoldOutlined title={"Active Offer"} /></Button>)
        } else {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'restore')}><ScissorOutlined title={"Restore Deleted Offer"} /></Button>)
        }
      }
    },

  ];
  const arr = [];
  offer?.data?.data?.forEach((item, idx) => {
    arr.push({
      _id: item._id,
      sno: (idx + sno + 1),
      name: item.name,
      fromAmount: item.fromAmount,
      toAmount: item.toAmount,
      percentage: item.percentage,
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
  const handleOfferFilter = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
    if (value === "Inactive") {
      handleInactiveOffer();
    } else if (value === "Deleted") {
      handleDeletedOffer();
    } else {
      fetchAllOffer();
    }

  }

  const handleInactiveOffer = () => {
    dispatch(fetchInactiveOffer({ activepage, recperpage, inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        errorMessage(res);
      }
    });
  }
  const handleDeletedOffer = () => {
    dispatch(fetchDeletedOffer({ activepage, recperpage, inputSearch })).then((res) => {
      console.log(res)
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

  const showOfferData = (_id) => {
    const item = arr.find(item => item._id === _id);
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    form.setFieldsValue({ name: item.name })
    setViewOfferData(mainObj);
  }

  const handleOfferUpdate = (_id) => {
    const item = arr.find(item => item._id === _id);
    showDrawer(true);
    setActionType('update');
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    setViewOfferData(mainObj);
    setMainObjectId(_id);
    form.setFieldsValue({ name: mainObj.name, image: mainObj.image }); // Update form fields
  }

  const handleCustomRequest = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('_id', mainObjectId);
    formData.append('image', file);
    dispatch(changeOfferImage(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOffer();
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
      const response = await utility.get('/offer/export/excel/offer', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, `${new Date()}-${filterStatus}-offer.xlsx`);
      setLoading({ ...loading, excel: false });
    } catch (error) {
      setLoading({ ...loading, excel: false });
      console.error('Error downloading the file', error);
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading({ ...loading, pdf: true });
      const response = await utility.get('/offer/export/pdf/offer', {
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
      const response = await utility.get('/offer/export/csv/offer', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'offer-data.csv');
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
                <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleOfferFilter}>
                  <Radio value={'All'}>All {filterStatus === "All" ? <Badge count={offer?.data?.totalRecords ?? 0} color='green' /> : ''}</Radio>
                  <Radio value={'Inactive'}>Inactive {filterStatus === "Inactive" ? <Badge count={offer?.data?.totalRecords ?? 0} color='yellow' /> : ''}</Radio>
                  <Radio value={'Deleted'}>Deleted {filterStatus === "Deleted" ? <Badge count={offer?.data?.totalRecords ?? 0} color='red' /> : ''}</Radio>
                </Radio.Group>
                <div className='search-field ms-3 me-3'>
                  <InputSearchField setInputSearch={setInputSearch} loadingStatus={offer.isLoading} />
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
                          <Card title="Update offer">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onUpdateFinish}
                              onFinishFailed={onUpdateFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="offer Title"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewOfferData?.name}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter offer name',
                                    min: 3,
                                  },
                                  {
                                    message: 'Maximum characters allowed up to 20',
                                    max: 20,
                                  },

                                ]}
                              >
                                <Input placeholder="Please enter offer name" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="offer Image"
                                size={'large'}
                              >

                                <ImgCrop rotationSlider>
                                  <Upload
                                    listType="picture-card"
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    customRequest={handleCustomRequest}
                                    fileList={fileList.length < 1 ? viewOfferData?.fileList : fileList}
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
                          <Card title="Add New offer">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="offer Title"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter offer name',
                                    min: 3,
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter offer name" />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                  prevValues.fromAmount !== currentValues.fromAmount || prevValues.toAmount !== currentValues.toAmount
                                }
                              >
                                {({ getFieldValue }) => {
                                  return (
                                    <>
                                      <Form.Item
                                        name="fromAmount"
                                        label="From Amount"
                                        size="large"
                                        hasFeedback
                                        dependencies={['toAmount']}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Please enter from amount',
                                          },
                                          {
                                            validator(_, value) {
                                              const toAmount = getFieldValue('toAmount');
                                              if (toAmount && value >= toAmount) {
                                                return Promise.reject(new Error('Starting amount must be less than ending amount'));
                                              }
                                              if (!value || value >= 1000) {
                                                return Promise.resolve();
                                              }
                                              return Promise.reject(new Error('Amount must be at least 1000'));
                                            },
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Please enter from amount" />
                                      </Form.Item>
                                      <Form.Item
                                        name="toAmount"
                                        label="To Amount"
                                        size="large"
                                        hasFeedback
                                        dependencies={['fromAmount']}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Please enter to amount',
                                          },
                                          {
                                            validator(_, value) {
                                              const fromAmount = getFieldValue('fromAmount');
                                              if (fromAmount && value <= fromAmount) {
                                                return Promise.reject(new Error('Ending amount must be greater than starting amount'));
                                              }
                                              if (!value || value >= 1000) {
                                                return Promise.resolve();
                                              }
                                              return Promise.reject(new Error('Amount must be at least 1000'));
                                            },
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Please enter to amount" />
                                      </Form.Item>
                                    </>
                                  );
                                }}
                              </Form.Item>




                              <Form.Item
                                name="percentage"
                                label="Percentage"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter to percentage',
                                    min: 1,
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (value >= 1 && value <= 100) {
                                        return Promise.resolve()
                                      } else {
                                        return Promise.reject(
                                          'Please enter a percentage between 1 and 100',
                                        )
                                      }
                                    }
                                  }
                                ]}
                              >
                                <Input placeholder="Please enter percentage" />
                              </Form.Item>
                              <Form.Item
                                name="image"
                                label="offer Image"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      if (fileList.length < 1) {
                                        return Promise.reject('Please choose offer image');
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
            <Table columns={columns} dataSource={arr} onChange={onChangeTable} pagination={false} loading={offer?.isLoading} />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={offer?.data?.totalRecords}
              showSizeChanger={false}
              size="small"
              pageSize={recperpage}
              onChange={(page, pageSize) => {
                paginationHandler(page, pageSize);
              }}
            />
          </div>
        </div>
      </div>
      <Modal title={`${actionType} offer`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {
            actionType === "restore" ?
              <><input type="text" className='form-control' value={type} onChange={handleForm} />
                <p>Note:If you want to restore the deleted offer so please type <pre><code><Tag color={"green"}>'restore'</Tag></code></pre></p></> :
              actionType === "reactive" ?
                <>
                  <input type="text" className='form-control' value={type} onChange={handleForm} />
                  <p>Note:If you want to activate to this offer so please type <pre><code><Tag color={"green"}>'active'</Tag></code></pre></p>
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
                              label="Category Title"
                              size={'large'}
                              initialValue={viewOfferData?.name}
                            >
                              <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                              name="image"
                              label="Category Image"
                              size={'large'}
                              hasFeedback={true}
                            >
                              <Upload
                                listType="picture-card"
                                fileList={viewOfferData?.fileList}
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
                    <p>Note:If you want to delete Offer so please type <pre><code><Tag color={"red"}>'delete'</Tag></code></pre></p>
                  </>
          }

        </div>
      </Modal>

    </>
  )
}

export default Offer