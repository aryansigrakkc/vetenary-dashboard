import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Drawer, Space, Card, Upload, Tag,Table, Radio, Pagination, Select,Switch,Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined,ScissorOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, createCategory,changeCategoryStatus,fetchDeletedCategory,fetchInactiveCategory, restoreCategory } from '../../redux/thunks/categoryThunk'
import dayjs from 'dayjs'
const Category = () => {
  const [recperpage, SetRecPerPage] = useState(5);
  const [activepage, SetActivePage] = useState(1);
  const sno = recperpage * (activepage - 1);
  const [open, setOpen] = useState(false);
  const [type,setType] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category);
  const [filterStatus,setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainObjectId,setMainObjectId] = useState("");

  useEffect(() => {
    fetchAllCategory();
  }, [activepage, recperpage]);
  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [fileList, setFileList] = useState([]);
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
    dispatch(createCategory(formData)).then((res)=>{
      if(res.payload.success){
        message.success(res.payload.message)
        fetchAllCategory();
        setOpen(false);
        setFileList([]);
        form.resetFields();
      }else{
        res.payload?.errors ?res.payload.errors.forEach((err)=>{
          message.error(err);
        }):message.error(res.payload.message);
          
      }
    }).catch(err => {
      message.error(err.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Submit failed!',errorInfo);
  };

  const fetchAllCategory = ()=>{
    dispatch(fetchCategory({ activepage, recperpage })).then((res) => {
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
  const showModal = (_id) => {
    setMainObjectId(_id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if(type==="restore"){
      hanleRestoreCategory();
      setIsModalOpen(false);
    }else if(type===""){
      message.error("Please enter value")
    }else{
      message.error("Please enter 'restore' as value")
    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMainObjectId(null);
    setType("");
  };
  function paginationHandler(page, pageSize) {
    SetRecPerPage(pageSize);
    SetActivePage(page);
  }

const handleCategoryStatus = (id,status)=>{
  status = status===0?1:0;
  let obj={
    _id:id,
    status:status
  }
  dispatch(changeCategoryStatus(obj)).then((res)=>{
    if(res.payload.success){
      message.success(res.payload.message);
      fetchAllCategory();
    }else{
      if(res.payload.errors){
        res.payload.errors.forEach((err)=>{
          message.error(err.msg);
        })
        fetchAllCategory();
      }else{
        message.error(res.payload.message);
      }
       
    }
  }).catch((err)=>{
    message.error(err.message);
  })
  
}

const hanleRestoreCategory = ()=>{
  if(filterStatus==="Inactive"){
    dispatch(fetchInactiveCategory({ activepage, recperpage })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        message.error(res.payload.message)
      }
    });
  }else if(filterStatus==="Deleted"){
    dispatch(restoreCategory({ activepage, recperpage,mainObjectId })).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
        dispatch(fetchDeletedCategory({ activepage, recperpage }));
      } else {
        message.error(res.payload.message)
      }
    });
  }else{
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
        if(filterStatus==='All'){
          if(value.isDeleted===false){
            return (<>
              <Switch
              checked={value.status}
              onChange={() => handleCategoryStatus(value._id,value.status)}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />          
            </>)  
          }else{
            return(<Tag color="red">Deleted</Tag>)
          }
          
        }else if(filterStatus==="Inactive"){
          if(value.status===0)
            return(<Tag color="red">Inactive</Tag>)
          else
            return(<Tag color="green">Active</Tag>)
        }else{
          if(value.isDeleted===false)
            return(<Tag color="green">Not Deleted</Tag>)
          else
            return(<Tag color="red">Deleted</Tag>)
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
        if(filterStatus==="All"){
          return("All Actions")
        }else if(filterStatus==="Inactive"){
          return("Activate")
        }else{
          return(<Button  onClick={()=>showModal(value._id)}><ScissorOutlined title={"Restore Deleted Category"}/></Button>)
        }
      }
    },

  ];
  const arr = [];
  categories?.data?.data?.forEach((item, idx) => {
    arr.push({
      _id:item._id,
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
  const handleCategoryFilter = (e)=>{
    const {value} = e.target;
    setFilterStatus(value);
    if(value==="Inactive"){
      dispatch(fetchInactiveCategory({ activepage, recperpage })).then((res) => {
        if (res.payload.success) {
          // message.success(res.payload.message)
        } else {
          message.error(res.payload.message)
        }
      });
    }else if(value==="Deleted"){
      dispatch(fetchDeletedCategory({ activepage, recperpage })).then((res) => {
        console.log(res)
        if (res.payload.success) {
          // message.success(res.payload.message)
        } else {
          message.error(res.payload.message)
        }
      });
    }else{
      fetchAllCategory();
    }
    
  }
  const handleForm = (e)=>{
    const {value} = e.target;
    setType(value);
  }
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
              
              <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleCategoryFilter}>
                <Radio value={'All'}>All</Radio>
                <Radio value={'Inactive'}>Inactive</Radio>
                <Radio value={'Deleted'}>Deleted</Radio>
              </Radio.Group>
              <Button
                type="primary"
                size={'small'}
                icon={<PlusOutlined />}
                onClick={() => showDrawer()}
              />
            </div>
            <div className=''>
              <Drawer
                placement={'right'}
                height={'auto'}
                width={500}
                onClose={onClose}
                open={open}
              >
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
              </Drawer>
            </div>
          </div>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={arr} onChange={onChangeTable} pagination={false} loading={categories.isLoading} />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={59}
              showSizeChanger={false}
              // showQuickJumper
              // defaultPageSize={5}
              // pageSizeOptions={["5", "10", "25", "50", "100"]}
              size="small"
              pageSize={recperpage}
              onChange={(page, pageSize) => {
                paginationHandler(page, pageSize);
              }}
            />
          </div>
        </div>
      </div>
      <Modal title="Restore Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <input type="text"  className='form-control' value={type} onChange={handleForm}/>
          <p>Note:If you want to restore the deleted category so please type <pre><code><Tag color={"green"}>'restore'</Tag></code></pre></p>
        </div>
      </Modal>
    </>
  )
}

export default Category