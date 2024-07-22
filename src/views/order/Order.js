import React, { useEffect, useState } from 'react';
import { Button, Form, Flex, Input, message, Drawer, Space, Card, Upload, Tag, Table, Radio, Pagination, Select, Switch, Modal, Badge } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, ScissorOutlined, MenuFoldOutlined, DeleteOutlined, EyeOutlined, SignatureOutlined, FileExcelOutlined, FilePdfOutlined, FileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, getOrderDetails,changeOrderStatus } from '../../redux/thunks/orderThunk'
import dayjs from 'dayjs'
import { errorMessage } from '../../utils';
import utility from '../../services/utility';
import FileSaver from 'file-saver';
import InputSearchField from '../../components/search/InputSearchField';
import "./order.scss";
const Order = () => {
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
  const order = useSelector(state => state.order);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainObjectId, setMainObjectId] = useState("");

  useEffect(() => {
    if (filterStatus === "All") {
      fetchAllOrder();
    } else if (filterStatus === "Pending") {
      handlePendingOrder();
    } else {
      handleFailedOrder();
    }
  }, [activepage, recperpage, inputSearch]);
  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [fileList, setFileList] = useState([]);
  const [viewOrderData, setViewOrderData] = useState([]);
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
    formData.append('fromAmount', parseInt(values.fromAmount));
    formData.append('toAmount', parseInt(values.toAmount));
    formData.append('percentage', parseInt(values.percentage));
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj
      : null);
      if(fromAmount>toAmount){
        message.error("Starting amount must be less than ending amount")
      }
    dispatch(createOrder(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOrder();
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
    dispatch(updateOrder(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOrder();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        errorMessage(res);
        fetchAllOrder();
      }
    }).catch(err => {
      fetchAllOrder();
      errorMessage(res);
    })
  };

  const onUpdateFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo);
  };

  const fetchAllOrder = () => {
    dispatch(fetchOrder({ activepage, recperpage, inputSearch,status:"all" })).then((res) => {
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
      showOrderData(_id);
    }
  };
  const handleOk = () => {
    if (type === "restore" && actionType === "restore") {
      hanleRestoreOrder();
      setIsModalOpen(false);
    }
    else if (type === "active" && actionType === "reactive") {
      hanleRestoreOrder();
      setIsModalOpen(false);
    }
    else if (type === "delete" && actionType === "delete") {
      hanleRestoreOrder();
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

  const handleOrderStatus = (id, status) => {
    status = status === 0 ? 1 : 0;
    let obj = {
      _id: id,
      status: status
    }
    dispatch(changeOrderStatus(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        fetchAllOrder();
      } else {
        errorMessage(res);

      }
    }).catch((err) => {
      message.error(err.message);
    })

  }

  const hanleRestoreOrder = () => {
    if (filterStatus === "Pending") {
      const obj = {
        _id: mainObjectId,
        status: 1
      }
      dispatch(changeOrderStatus(obj)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchPendingOrder({ activepage, recperpage, inputSearch }))
          setType("");
        } else {
          setType("");
          errorMessage(res);
        }
      })

    } else if (filterStatus === "Failed") {
      dispatch(restoreOrder({ activepage, recperpage, mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchFailedOrder({ activepage, recperpage, inputSearch }));
          setType("");
        } else {
          setType("");
          errorMessage(res);
        }
      });
    }
    else if (actionType === "delete") {
      dispatch(deleteOrder({ mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllOrder();
          setType("");
        } else {
          setType("");
          errorMessage(res);
          fetchAllOrder();
        }
      });
    }
    else {
      fetchAllOrder();
    }
  }

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'User Image',
      dataIndex: 'u_image',
      key: 'u_image',
      render: (_, value) => {
        return (<>
          <img src={value.image} width={50} height={50} />
        </>);
      }
    },
    {
      title: 'User Name',
      dataIndex: 'u_name',
      key: 'u_name',
      sorter: (a, b) => a.u_name - b.u_name,
    },
    {
      title: 'Contact',
      dataIndex: 'u_contact',
      key: 'u_contact',
      sorter: (a, b) => a.u_contact - b.u_contact,
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
    },
    
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),

      render: (_, value) => {
          if (value.paymentStatus === 'pending') {
            return (<Tag color="yellow">Pending</Tag>)
          } else if(value.paymentStatus === 'done') {
            return (<Tag color="green">Done</Tag>)
          }else if(value.paymentStatus === 'failed') {
            return (<Tag color="red">Failed</Tag>)
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
              <Button size={'small'} icon={<EyeOutlined />} onClick={() => showModal(value._id, 'view')} title={'View Order'} />
              <Button size={'small'} icon={<SignatureOutlined />} onClick={() => handleOrderUpdate(value._id)} title={'Edit Order'} />
            </Flex>
          </>)
        } else if (filterStatus === "Pending") {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'reactive')}><MenuFoldOutlined title={"Active Order"} /></Button>)
        } else {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'restore')}><ScissorOutlined title={"Restore Failed Order"} /></Button>)
        }
      }
    },

  ];
  
  const arr = [];
  order?.data?.data?.forEach((item, idx) => {
    arr.push({
      key:(idx + 1),
      _id: item._id,
      sno: (idx + sno + 1),
      u_image: `http://localhost:8080/${item.image}`,
      u_name: item.user.fullName,
      u_email: item.user.email,
      u_contact: item.user.mobileNo,
      orderId:item.orderId,
      total: <Badge count={`Rs.${item.total}`} color={item.paymentStatus!=='done'?'red':'green'}/>,
      paymentStatus: item.paymentStatus,
      image: `http://localhost:8080/${item.image}`,
      status: item.status,
      createdAt: (dayjs(item.timeStamps).format('DD/MM/YY')),
      action: item
    })
  });

  const handlePerPageRecord = (value) => {
    SetRecPerPage(value);
  }
  const handleOrderFilter = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
    if (value === "Pending") {
      handlePendingOrder();
    } else if (value === "Failed") {
      handleFailedOrder();
    } else {
      fetchAllOrder();
    }

  }

  const handlePendingOrder = () => {
    dispatch(fetchPendingOrder({ activepage, recperpage, inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        errorMessage(res);
      }
    });
  }
  const handleFailedOrder = () => {
    dispatch(fetchFailedOrder({ activepage, recperpage, inputSearch })).then((res) => {
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

  const showOrderData = (_id) => {
    const item = arr.find(item => item._id === _id);
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    form.setFieldsValue({ name: item.name })
    setViewOrderData(mainObj);
  }

  const handleOrderUpdate = (_id) => {
    const item = arr.find(item => item._id === _id);
    showDrawer(true);
    setActionType('update');
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    setViewOrderData(mainObj);
    setMainObjectId(_id);
    form.setFieldsValue({ name: mainObj.name, image: mainObj.image }); // Update form fields
  }

  const handleCustomRequest = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('_id', mainObjectId);
    formData.append('image', file);
    dispatch(changeOrderImage(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllOrder();
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
      const response = await utility.get('/Order/export/excel/Order', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, `${new Date()}-${filterStatus}-Order.xlsx`);
      setLoading({ ...loading, excel: false });
    } catch (error) {
      setLoading({ ...loading, excel: false });
      console.error('Error downloading the file', error);
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading({ ...loading, pdf: true });
      const response = await utility.get('/Order/export/pdf/Order', {
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
      const response = await utility.get('/Order/export/csv/Order', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'Order-data.csv');
      setLoading({ ...loading, csv: false });
    } catch (error) {
      setLoading({ ...loading, csv: false });
      console.error('Error downloading CSV:', error);
    }
  };
  console.log(arr,' array')
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
                <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleOrderFilter}>
                  <Radio value={'All'}>All {filterStatus === "All" ? <Badge count={order?.data?.totalRecords ?? 0} color='green' /> : ''}</Radio>
                  <Radio value={'Pending'}>Pending {filterStatus === "Pending" ? <Badge count={order?.data?.totalRecords ?? 0} color='yellow' /> : ''}</Radio>
                  <Radio value={'Failed'}>Failed {filterStatus === "Failed" ? <Badge count={order?.data?.totalRecords ?? 0} color='red' /> : ''}</Radio>
                </Radio.Group>
                <div className='search-field ms-3 me-3'>
                  <InputSearchField setInputSearch={setInputSearch} loadingStatus={order.isLoading} />
                </div>
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
                          <Card title="Update Order">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onUpdateFinish}
                              onFinishFailed={onUpdateFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="Order Title"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewOrderData?.name}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Order name',
                                    min: 3,
                                  },
                                  {
                                    message: 'Maximum characters allowed up to 20',
                                    max: 20,
                                  },

                                ]}
                              >
                                <Input placeholder="Please enter Order name" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="Order Image"
                                size={'large'}
                              >

                                <ImgCrop rotationSlider>
                                  <Upload
                                    listType="picture-card"
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    customRequest={handleCustomRequest}
                                    fileList={fileList.length < 1 ? viewOrderData?.fileList : fileList}
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
                   ""
                }
              </Drawer>
            </div>
          </div>
          <div className='col-md-12'>
            <Table 
              
              columns={columns} 
              dataSource={arr} 
              onChange={onChangeTable} 
              pagination={false} 
              loading={Order?.isLoading}
              expandable={{
                expandedRowRender: (record) => (
                  
                  <>
                  
                  <table className="product-table">
                    <tr className="table-header">
                        <th className="product-image-header">Product Image</th>
                        <th className="product-name-header">Product Name</th>
                        <th className="product-quantity-header">Product Quantity</th>
                        <th className="product-quantity-header">Price</th>
                    </tr>
                    {
                      record.action.orderDetails.map((item)=>{
                        return(
                          <tr className="table-row" key={item._id}>
                            <td className="product-image-cell"><img src="product1.jpg" alt="Product 1" className="product-image"/></td>
                            <td className="product-name-cell">{item.productName}</td>
                            <td className="product-quantity-cell">{item.quantity}</td>
                            <td className="product-quantity-cell">Rs.{item.totalPrice}</td>
                        </tr>
                        )
                      })
                    }
                    
                  </table>
                  </>
                ),
                rowExpandable: (record) => true,
              }}
              />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={order?.data?.totalRecords}
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
      <Modal title={`${actionType} Order`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {
            actionType === "restore" ?
              <><input type="text" className='form-control' value={type} onChange={handleForm} />
                <p>Note:If you want to restore the Failed Order so please type <pre><code><Tag color={"green"}>'restore'</Tag></code></pre></p></> :
              actionType === "reactive" ?
                <>
                  <input type="text" className='form-control' value={type} onChange={handleForm} />
                  <p>Note:If you want to activate to this Order so please type <pre><code><Tag color={"green"}>'active'</Tag></code></pre></p>
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
                              initialValue={viewOrderData?.name}
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
                                fileList={viewOrderData?.fileList}
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
                    <p>Note:If you want to delete Order so please type <pre><code><Tag color={"red"}>'delete'</Tag></code></pre></p>
                  </>
          }

        </div>
      </Modal>

    </>
  )
}

export default Order