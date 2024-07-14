/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Form, Flex, Input, message, Drawer, Space, Card, Upload, Tag, Table, Radio, Pagination, Select, Switch, Modal,Badge } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, ScissorOutlined, MenuFoldOutlined, DeleteOutlined, EyeOutlined, SignatureOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, createCategory, changeCategoryStatus, fetchDeletedCategory, fetchInactiveCategory, restoreCategory, deleteCategory,changeCategoryImage, updateCategory } from '../../redux/thunks/categoryThunk'
import InputSearchField from '../../components/search/InputSearchField';
import dayjs from 'dayjs'
const {Search} = Input;
const Category = () => {
  const [recperpage, SetRecPerPage] = useState(5);
  const [activepage, SetActivePage] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [inputSearch,setInputSearch] = useState("");
  const sno = recperpage * (activepage - 1);
  const [open, setOpen] = useState(false);

  const [type, setType] = useState('');
  const [actionType, setActionType] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [mainObjectId, setMainObjectId] = useState("");

  
  useEffect(() => {
    if(filterStatus==="All"){
      fetchAllCategory();
    }else if(filterStatus==="Inactive"){
      handleInactiveCategory();
    }else{
      handleDeletedCategory();
    }
     }, [activepage, recperpage,inputSearch]);

  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [fileList, setFileList] = useState([]);
  const [viewCategoryData, setViewCategoryData] = useState([]);
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
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj
      : null);
    dispatch(createCategory(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllCategory();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : message.error(res.payload.message);

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
      _id:mainObjectId,
      name:values.name
    }
    dispatch(updateCategory(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllCategory();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : message.error(res.payload.message);
        fetchAllCategory();
      }
    }).catch(err => {
      fetchAllCategory();
      message.error(err.message);
    })
  };

  const onUpdateFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo);
  };

  const fetchAllCategory = () => {
    dispatch(fetchCategory({ activepage,recperpage,inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        message.error(res.payload.message)
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
      showCategoryData(_id);
    }
  };
  const handleOk = () => {
    if (type === "restore" && actionType === "restore") {
      hanleRestoreCategory();
      setIsModalOpen(false);
    }
    else if (type === "active" && actionType === "reactive") {
      hanleRestoreCategory();
      setIsModalOpen(false);
    }
    else if (type === "delete" && actionType === "delete") {
      hanleRestoreCategory();
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

  const handleCategoryStatus = (id, status) => {
    status = status === 0 ? 1 : 0;
    let obj = {
      _id: id,
      status: status
    }
    dispatch(changeCategoryStatus(obj)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        fetchAllCategory();
      } else {
        if (res.payload.errors) {
          res.payload.errors.forEach((err) => {
            message.error(err.msg);
          })
          fetchAllCategory();
        } else {
          message.error(res.payload.message);
        }

      }
    }).catch((err) => {
      message.error(err.message);
    })

  }

  const hanleRestoreCategory = () => {
    if (filterStatus === "Inactive") {
      const obj = {
        _id: mainObjectId,
        status: 1
      }
      dispatch(changeCategoryStatus(obj)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchInactiveCategory({ activepage, recperpage,inputSearch }))
          setType("");
        } else {
          setType("");
          res.payload?.errors ? res.payload.errors.forEach((err) => {
            message.error(err);
          }) : message.error(res.payload.message);
  
        }
      })

    } else if (filterStatus === "Deleted") {
      dispatch(restoreCategory({ activepage, recperpage, mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          handleDeletedCategory();
          setType("");
        } else {
          setType("");
          message.error(res.payload.message)
        }
      });
    }
    else if (actionType === "delete") {
      dispatch(deleteCategory({ mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllCategory();
          setType("");
        } else {
          setType("");
          message.error(res.payload.message)
          fetchAllCategory();
        }
      });
    }
    else {
      fetchAllCategory();
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, value) => {
        if (filterStatus === 'All') {
          if (value.isDeleted === false) {
            return (<>
              <Switch
                checked={value.status}
                onChange={() => handleCategoryStatus(value._id, value.status)}
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

              <Button size={'small'} icon={<EyeOutlined />} onClick={() => showModal(value._id, 'view')} title={'View Category'} />
              <Button size={'small'} icon={<SignatureOutlined />} onClick={() => handleCategoryUpdate(value._id)} title={'Edit Category'} />
              <Button size={'small'} icon={<DeleteOutlined />} danger onClick={() => showModal(value._id, 'delete')} title={'Delete Category'} />
            </Flex>
          </>)
        } else if (filterStatus === "Inactive") {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'reactive')}><MenuFoldOutlined title={"Active Category"} /></Button>)
        } else {
          return (<Button size={'small'} onClick={() => showModal(value._id, 'restore')}><ScissorOutlined title={"Restore Deleted Category"} /></Button>)
        }
      }
    },

  ];
  const arr = [];
  categories?.data?.data?.forEach((item, idx) => {
    arr.push({
      _id: item._id,
      sno: (idx + sno + 1),
      name: item.name,
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
  const handleCategoryFilter = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
    SetActivePage(1);
    setCurrentPage(1);
    if (value === "Inactive") {
      handleInactiveCategory();
    } else if (value === "Deleted") {
        handleDeletedCategory();
    } else {
      fetchAllCategory();
    }

  }

  const handleInactiveCategory = ()=>{
    dispatch(fetchInactiveCategory({ activepage, recperpage,inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : message.error(res.payload.message);
      }
    });
  }
  const handleDeletedCategory = ()=>{
    dispatch(fetchDeletedCategory({ activepage, recperpage,inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : message.error(res.payload.message);
      }
    }).catch(err => {
      
    });
  }

  const handleForm = (e) => {
    const { value } = e.target;
    setType(value);
  }

  const showCategoryData = (_id) => {
    const item = arr.find(item => item._id === _id);
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    form.setFieldsValue({name:item.name})
    setViewCategoryData(mainObj);
  }

  const handleCategoryUpdate = (_id) => {
    const item = arr.find(item => item._id === _id);
    showDrawer(true);
    setActionType('update');
    const mainObj = { ...item, fileList: [{ url: item.image }] };
    setViewCategoryData(mainObj);
    setMainObjectId(_id);
    form.setFieldsValue({name:mainObj.name,image:mainObj.image}); // Update form fields
  }

  const handleCustomRequest = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('_id',mainObjectId);
    formData.append('image', file);
    dispatch(changeCategoryImage(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        fetchAllCategory();
        setOpen(false);
        showDrawer(false)
        setFileList([]);
        form.resetFields();
      } else {
        res.payload?.errors ? res.payload.errors.forEach((err) => {
          message.error(err);
        }) : message.error(res.payload.message);

      }
    }).catch(err => {
      message.error(err.message);
    })
  };
  
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12">
            <div className='d-flex justify-content-between  mb-2'>
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
              <div className='d-flex align-items-center'>
              <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleCategoryFilter}>
                              <Radio value={'All'}>All {filterStatus==="All"?<Badge count={categories?.data?.totalRecords} color='green'/>:''}</Radio>
                              <Radio value={'Inactive'}>Inactive {filterStatus==="Inactive"? <Badge count={categories?.data?.totalRecords} color='yellow'/>:''}</Radio>
                              <Radio value={'Deleted'}>Deleted {filterStatus==="Deleted" ? <Badge count={categories?.data?.totalRecords} color='red'/>:''}</Radio>
                            </Radio.Group>
                            <div className='search-field ms-3 me-3'>
                            <InputSearchField  setInputSearch={setInputSearch} loadingStatus={categories.isLoading}/>
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
                          <Card title="Update Category">
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={onUpdateFinish}
                              onFinishFailed={onUpdateFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="name"
                                label="Category Title"
                                size={'large'}
                                hasFeedback={true}
                                initialValue={viewCategoryData?.name}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter category name',
                                    min: 3,
                                  },
                                  {
                                    message: 'Maximum characters allowed up to 20',
                                    max: 20,
                                  },

                                ]}
                              >
                                <Input placeholder="Please enter Category name" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="Category Image"
                                size={'large'}
                              >

                                <ImgCrop rotationSlider>
                                  <Upload
                                    listType="picture-card"
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    customRequest={handleCustomRequest}
                                    fileList={fileList.length<1?viewCategoryData?.fileList:fileList}
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
                          <Card title="Add New Category">
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
                                hasFeedback={true}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter category name',
                                    min: 3,
                                  },
                                ]}
                              >
                                <Input placeholder="Please enter Category name" />
                              </Form.Item>

                              <Form.Item
                                name="image"
                                label="Category Image"
                                size={'large'}
                                hasFeedback={true}
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      if (fileList.length < 1) {
                                        return Promise.reject('Please choose category image');
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
            <Table columns={columns} dataSource={arr} onChange={onChangeTable} pagination={false} loading={categories.isLoading} />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={categories?.data?.totalRecords}
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
      <Modal title={`${actionType} Category`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {
            actionType === "restore" ?
              <><input type="text" className='form-control' value={type} onChange={handleForm} />
                <p>Note:If you want to restore the deleted category so please type <pre><code><Tag color={"green"}>'restore'</Tag></code></pre></p></> :
              actionType === "reactive" ?
                <>
                  <input type="text" className='form-control' value={type} onChange={handleForm} />
                  <p>Note:If you want to activate to this category so please type <pre><code><Tag color={"green"}>'active'</Tag></code></pre></p>
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
                              initialValue={viewCategoryData?.name}
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
                                fileList={viewCategoryData?.fileList}
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
                    <p>Note:If you want to delete category so please type <pre><code><Tag color={"red"}>'delete'</Tag></code></pre></p>
                  </>
          }

        </div>
      </Modal>

    </>
  )
}

export default Category