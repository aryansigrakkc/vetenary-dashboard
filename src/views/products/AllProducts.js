import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Flex,
  Input,
  message,
  Drawer,
  Space,
  Card,
  Upload,
  Tag,
  Table,
  Radio,
  Pagination,
  Select,
  Switch,
  Modal,
  Badge
} from 'antd'
import ImgCrop from 'antd-img-crop'
import {
  PlusOutlined,
  ScissorOutlined,
  MenuFoldOutlined,
  DeleteOutlined,
  EyeOutlined,
  SignatureOutlined
  ,FileExcelOutlined,FilePdfOutlined,FileOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProduct,
  createProduct,
  changeProductStatus,
  fetchDeletedProduct,
  fetchInactiveProduct,
  restoreProduct,
  deleteProduct,
} from '../../redux/thunks/productThunk'

import { fetchCategory,createCategory } from '../../redux/thunks/categoryThunk'
import dayjs from 'dayjs'
import { errorMessage } from '../../utils';
import utility from '../../services/utility';
import FileSaver from 'file-saver';

import { Link } from 'react-router-dom'
import InputSearchField from '../../components/search/InputSearchField'
const AllProducts = () => {
  const [recperpage, SetRecPerPage] = useState(5)
  const [activepage, SetActivePage] = useState(1)
  const [currentPage,setCurrentPage] = useState(1);
  const [inputSearch,setInputSearch] = useState("");
  const [loading,setLoading] = useState({excel:false,pdf:false,csv:false});
  const sno = recperpage * (activepage - 1)
  const [open, setOpen] = useState(false)

  const [type, setType] = useState('')
  const [actionType, setActionType] = useState('')
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const products = useSelector((state) => state.product.data)
  const [filterStatus, setFilterStatus] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false)
  const [mainObjectId, setMainObjectId] = useState('')
  useEffect(() => {
    if (filterStatus === 'All') {
      fetchAllProduct()
    } else if (filterStatus === 'Inactive') {
      handleInactiveProduct()
    } else {
      handleDeletedProduct()
    }
  }, [activepage, recperpage,inputSearch])
  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  const [fileList, setFileList] = useState([])
  const [viewCategoryData, setViewCategoryData] = useState([])
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj : null)
    dispatch(createCategory(formData))
      .then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllProduct()
          setOpen(false)
          setFileList([])
          form.resetFields()
        } else {
          res.payload?.errors
            ? res.payload.errors.forEach((err) => {
                message.error(err)
              })
            : message.error(res.payload.message)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo)
  }

  const onUpdateFinish = (values) => {
    const obj = {
      _id: mainObjectId,
      name: values.name,
    }
    dispatch(updateCategory(obj))
      .then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllProduct()
          setOpen(false)
          setFileList([])
          form.resetFields()
        } else {
          res.payload?.errors
            ? res.payload.errors.forEach((err) => {
                message.error(err)
              })
            : message.error(res.payload.message)
          fetchAllProduct()
        }
      })
      .catch((err) => {
        fetchAllProduct()
        message.error(err.message)
      })
  }

  const onUpdateFinishFailed = (errorInfo) => {
    message.error('Submit failed!', errorInfo)
  }

  const fetchAllProduct = () => {
    dispatch(fetchProduct({ activepage, recperpage,inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        message.error(res.payload.message)
      }
    })
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    form.resetFields()
  }

  /*Modal Box*/
  const showModal = (_id, actionType) => {
    setMainObjectId(_id)
    setIsModalOpen(true)
    setActionType(actionType)
    if (actionType === 'view') {
      showCategoryData(_id)
    }
  }
  const handleOk = () => {
    if (type === 'restore' && actionType === 'restore') {
      hanleRestoreProduct()
      setIsModalOpen(false)
    } else if (type === 'active' && actionType === 'reactive') {
      hanleRestoreProduct()
      setIsModalOpen(false)
    } else if (type === 'delete' && actionType === 'delete') {
      hanleRestoreProduct()
      setIsModalOpen(false)
    } else if (type === '') {
      message.error('Please enter value')
    } else {
      message.error(`Please enter ${actionType} as value`)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setMainObjectId(null)
    setType('')
  }
  /*Modal box end here*/

  function paginationHandler(page, pageSize) {
    SetRecPerPage(pageSize)
    SetActivePage(page)
    setCurrentPage(page)
  }

  const handleProductStatus = (id, status) => {
    status = status === 0 ? 1 : 0
    let obj = {
      _id: id,
      status: status,
    }
    dispatch(changeProductStatus(obj))
      .then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllProduct()
        } else {
          if (res.payload.errors) {
            res.payload.errors.forEach((err) => {
              message.error(err.msg)
            })
            fetchAllProduct()
          } else {
            message.error(res.payload.message)
          }
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  const hanleRestoreProduct = () => {
    if (filterStatus === 'Inactive') {
      const obj = {
        _id: mainObjectId,
        status: 1,
      }
      dispatch(changeProductStatus(obj)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchInactiveCategory({ activepage, recperpage,inputSearch }))
          setType('')
        } else {
          setType('')
          message.error(res.payload.message)
        }
      })
    } else if (filterStatus === 'Deleted') {
      dispatch(restoreProduct({ activepage, recperpage, mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          dispatch(fetchDeletedProduct({ activepage, recperpage,inputSearch }))
          setType('')
        } else {
          setType('')
          message.error(res.payload.message)
        }
      })
    } else if (actionType === 'delete') {
      dispatch(deleteProduct({ mainObjectId })).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllProduct()
          setType('')
        } else {
          setType('')
          message.error(res.payload.message)
          fetchAllProduct()
        }
      })
    } else {
      fetchAllProduct()
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
        return (
          <>
            <img src={value.image} width={50} height={50} />
          </>
        )
      },
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
            return (
              <>
                <Switch
                  checked={value.status}
                  onChange={() => handleProductStatus(value._id, value.status)}
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </>
            )
          } else {
            return <Tag color="red">Deleted</Tag>
          }
        } else if (filterStatus === 'Inactive') {
          if (value.status === 0) return <Tag color="red">Inactive</Tag>
          else return <Tag color="green">Active</Tag>
        } else {
          if (value.isDeleted === false) return <Tag color="green">Not Deleted</Tag>
          else return <Tag color="red">Deleted</Tag>
        }
      },
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
        if (filterStatus === 'All') {
          return (
            <>
              <Flex wrap gap="small" className="">
                <Link to={`/view/product/${value._id}`}>
                  <Button size={'small'} icon={<EyeOutlined />} primary title={'View Product'} />
                </Link>
                <Link to={`/update/product/${value._id}`}>
                  <Button size={'small'} icon={<SignatureOutlined />} title={'Edit Product'} />
                </Link>
                <Button
                  size={'small'}
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => showModal(value._id, 'delete')}
                  title={'Delete Category'}
                />
              </Flex>
            </>
          )
        } else if (filterStatus === 'Inactive') {
          return (
            <Button size={'small'} onClick={() => showModal(value._id, 'reactive')}>
              <MenuFoldOutlined title={'Active Category'} />
            </Button>
          )
        } else {
          return (
            <Button size={'small'} onClick={() => showModal(value._id, 'restore')}>
              <ScissorOutlined title={'Restore Deleted Category'} />
            </Button>
          )
        }
      },
    },
  ]
  const arr = []
  products?.data?.forEach((item, idx) => {
    arr.push({
      _id: item._id,
      sno: idx + sno + 1,
      name: item.name,
      image: `http://localhost:3600/${item.image}`,
      status: item.status,
      createdAt: dayjs(item.timeStamps).format('DD/MM/YY hh:mm a'),
      isDeleted: item.isDeleted,
      action: item,
    })
  })

  const handlePerPageRecord = (value) => {
    SetRecPerPage(value)
  }
  const handleProductFilter = (e) => {
    const { value } = e.target
    setFilterStatus(value)
    SetActivePage(1)
    setCurrentPage(1)
    if (value === 'Inactive') {
      handleInactiveProduct()
    } else if (value === 'Deleted') {
      handleDeletedProduct()
    } else {
      fetchAllProduct()
    }
  }

  const handleInactiveProduct = () => {
    dispatch(fetchInactiveProduct({ activepage, recperpage,inputSearch })).then((res) => {
      if (res.payload.success) {
        // message.success(res.payload.message)
      } else {
        res.payload?.errors
          ? res.payload.errors.forEach((err) => {
              message.error(err)
            })
          : message.error(res.payload.message)
      }
    })
  }
  const handleDeletedProduct = () => {
    dispatch(fetchDeletedProduct({ activepage, recperpage,inputSearch }))
      .then((res) => {
        console.log(res)
        if (res.payload.success) {
          // message.success(res.payload.message)
        } else {
          res.payload?.errors
            ? res.payload.errors.forEach((err) => {
                message.error(err)
              })
            : message.error(res.payload.message)
        }
      })
      .catch((err) => {})
  }

  const handleForm = (e) => {
    const { value } = e.target
    setType(value)
  }

  const showCategoryData = (_id) => {
    const item = arr.find((item) => item._id === _id)
    const mainObj = { ...item, fileList: [{ url: item.image }] }
    form.setFieldsValue({ name: item.name })
    setViewCategoryData(mainObj)
  }

  const handleProductUpdate = (_id) => {
    const item = arr.find((item) => item._id === _id)
    showDrawer(true)
    setActionType('update')
    const mainObj = { ...item, fileList: [{ url: item.image }] }
    setViewCategoryData(mainObj)
    setMainObjectId(_id)
    form.setFieldsValue({ name: mainObj.name, image: mainObj.image }) // Update form fields
  }

  const handleCustomRequest = ({ file, onSuccess }) => {
    const formData = new FormData()
    formData.append('_id', mainObjectId)
    formData.append('image', file)
    dispatch(changeCategoryImage(formData))
      .then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
          fetchAllProduct()
          setOpen(false)
          showDrawer(false)
          setFileList([])
          form.resetFields()
        } else {
          res.payload?.errors
            ? res.payload.errors.forEach((err) => {
                message.error(err)
              })
            : message.error(res.payload.message)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }
  const downloadExcel = async () => {
    try {
      setLoading({...loading,excel:true});
      const response = await utility.get('/product/export/excel/product', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, `${new Date()}-${filterStatus}-product.xlsx`);
      setLoading({...loading,excel:false});
    } catch (error) {
      setLoading({...loading,excel:false});
      console.error('Error downloading the file', error);
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading({...loading,pdf:true});
      const response = await utility.get('/product/export/pdf/product', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      FileSaver.saveAs(blob, 'sample.pdf');
      setLoading({...loading,pdf:false});
    } catch (error) {
      setLoading({...loading,pdf:false});
      console.error('Error downloading the file', error);
    }
  };
  const downloadCSV = async () => {
    try {
      setLoading({...loading,csv:true});
      const response = await utility.get('/product/export/csv/product', {
        responseType: 'blob', 
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      FileSaver.saveAs(blob,'product-data.csv');
      setLoading({...loading,csv:false});
    } catch (error) {
      setLoading({...loading,csv:false});
      console.error('Error downloading CSV:', error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between  mb-2">
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

              <Radio.Group name="radiogroup" defaultValue={'All'} onChange={handleProductFilter}>
                <Radio value={'All'}>All</Radio>
                <Radio value={'Inactive'}>Inactive</Radio>
                <Radio value={'Deleted'}>Deleted</Radio>
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
            <div className="">
              <Drawer placement={'right'} height={'auto'} width={500} onClose={onClose} open={open}>
                {actionType === 'update' ? (
                  <>
                    <div className="col-md-12">
                      <Space direction="vertical" size={20} style={{ width: '100%' }}>
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

                            <Form.Item name="image" label="Category Image" size={'large'}>
                              <ImgCrop rotationSlider>
                                <Upload
                                  listType="picture-card"
                                  onChange={onChange}
                                  onPreview={onPreview}
                                  customRequest={handleCustomRequest}
                                  fileList={
                                    fileList.length < 1 ? viewCategoryData?.fileList : fileList
                                  }
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
                ) : (
                  <>
                    <div className="col-md-12">
                      <Space direction="vertical" size={20} style={{ width: '100%' }}>
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
                                      return Promise.reject('Please choose category image')
                                    }
                                    return Promise.resolve()
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
                )}
              </Drawer>
            </div>
          </div>
          <div className="col-md-12">
            <Table
              columns={columns}
              dataSource={arr}
              onChange={onChangeTable}
              pagination={false}
              loading={products.isLoading}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-end g-3 mb-3">
            <Pagination
              total={products?.data?.totalRecords}
              showSizeChanger={false}
              size="small"
              pageSize={recperpage}
              current={currentPage}
              onChange={(page, pageSize) => {
                paginationHandler(page, pageSize)
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        title={`${actionType} Category`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {actionType === 'restore' ? (
            <>
              <input type="text" className="form-control" value={type} onChange={handleForm} />
              <p>
                Note:If you want to restore the deleted category so please type{' '}
                <pre>
                  <code>
                    <Tag color={'green'}>'restore'</Tag>
                  </code>
                </pre>
              </p>
            </>
          ) : actionType === 'reactive' ? (
            <>
              <input type="text" className="form-control" value={type} onChange={handleForm} />
              <p>
                Note:If you want to activate to this category so please type{' '}
                <pre>
                  <code>
                    <Tag color={'green'}>'active'</Tag>
                  </code>
                </pre>
              </p>
            </>
          ) : actionType === 'view' ? (
            <>
              <div className="col-md-12">
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
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
                        ></Upload>
                      </Form.Item>
                    </Form>
                  </Card>
                </Space>
              </div>
            </>
          ) : (
            <>
              <input type="text" className="form-control" value={type} onChange={handleForm} />
              <p>
                Note:If you want to delete category so please type{' '}
                <pre>
                  <code>
                    <Tag color={'red'}>'delete'</Tag>
                  </code>
                </pre>
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default AllProducts
