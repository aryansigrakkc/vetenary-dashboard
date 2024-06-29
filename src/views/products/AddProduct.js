import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message, Space, Card, Select, Upload, Checkbox } from 'antd'
import Editor from '../../components/product/Editor'
import { fetchAllCategory } from '../../redux/thunks/categoryThunk'
import { fetchAllBrand } from '../../redux/thunks/brandThunk'
import { fetchAllSubCategory } from '../../redux/thunks/subCategoryThunk'
import { createProduct } from '../../redux/thunks/productThunk'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import './product.scss'

const AddProduct = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [variants, setVariants] = useState(false)
  const [editorData, setEditorData] = useState('')
  const [editorError, setEditorError] = useState(null)
  const [shortEditorData, setShortEditorData] = useState('')
  const [shortEditorError, setShortEditorError] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [formValues, setFormValues] = useState({})
  const [fileList, setFileList] = useState([])
  const [fileListGallery, setFileListGallery] = useState([])
  const subcategoryState = useSelector((state) => state.subcategory)
  const productState = useSelector((state) => state.product)

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const onChangeProductGallery = ({ fileList: newFileListGallery }) => {
    setFileListGallery(newFileListGallery)
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

  useEffect(() => {
    dispatch(fetchAllCategory())
      .then((res) => {
        if (res.payload.success) {
          const arr = []
          res.payload.data.forEach((item) => {
            arr.push({ value: item._id, label: item.name.toUpperCase() })
          })
          setCategoryList(arr)
        } else {
          if (res.payload.errors) {
            res.payload.errors.forEach((err) => {
              message.error(err.msg)
            })
          } else {
            message.error(res.payload.message)
          }
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
    dispatch(fetchAllBrand())
      .then((res) => {
        if (res.payload.success) {
          const arr = []
          res.payload.data.forEach((item) => {
            arr.push({ value: item._id, label: item.name.toUpperCase() })
          })
          setBrandList(arr)
        } else {
          if (res.payload.errors) {
            res.payload.errors.forEach((err) => {
              message.error(err.msg)
            })
          } else {
            message.error(res.payload.message)
          }
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }, [dispatch])

  const onFinish = (values) => {
    if (!editorData) {
      setEditorError('Please enter a product description.')
      return
    }
    if (!shortEditorData) {
      setEditorError('Please enter a product short description.')
      return
    }
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('shortDescription', values.shortDescription)
    formData.append('category', values.category)
    formData.append('variant', values.variant)
    formData.append('code', 'PRO-001')
    formData.append('discountTppe', values.discountType)
    formData.append('discount', values.discount)

    if (values.subcategoy) {
      formData.append('subcategory', values.subcategory)
    }
    if (values.brand) {
      formData.append('brand', values.brand)
    }
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj : null)
    values.gallery.fileList.forEach((item) => {
      formData.append('gallery', item.originFileObj)
    })
    values.promotions.forEach((item) => {
      formData.append(item, true)
    })

    formData.append('variants', JSON.stringify(values.variants))
    formData.append('tags', JSON.stringify(values.tags))

    dispatch(createProduct(formData))
      .then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message)
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
    // message.error('Submit failed!')
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setEditorData(data)
    setEditorError(null)
    form.setFieldsValue({ description: data })
  }
  const handleEditorChangeShort = (event, editor) => {
    const data = editor.getData()
    setShortEditorData(data)
    setShortEditorError(null)
    form.setFieldsValue({ shortDescription: data })
  }

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues)
  }

  const handleSubCategoryList = (categoryId) => {
    dispatch(fetchAllSubCategory(categoryId))
      .then((res) => {
        if (res.payload.success) {
          const arr = []
          res.payload.data.forEach((item) => {
            arr.push({ value: item._id, label: item.name.toUpperCase() })
          })
          setSubCategoryList(arr)
        } else {
          if (res.payload.errors) {
            res.payload.errors.forEach((err) => {
              message.error(err.msg)
            })
          } else {
            message.error(res.payload.message)
          }
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }
  useEffect(() => {
    form.setFieldsValue({
      variants: [
        {
          size: '',
          regular_price: '',
          selling_price: '',
          quantity: '',
          uom: '',
        },
      ],
    })
  }, [form, variants])

  const options = [
    {
      label: 'Hot Deal',
      value: 'hotDeal',
    },
    {
      label: 'Best Rated',
      value: 'bestRated',
    },
    {
      label: 'Hot New',
      value: 'hotNew',
    },
    {
      label: 'Trend',
      value: 'trend',
    },
  ]
  const variantOption = [
    {
      label: 'Kilogram',
      value: 'kg',
    },
    {
      label: 'Liter',
      value: 'ltr',
    },
    {
      label: 'Milliliter',
      value: 'ml',
    },
    {
      label: 'Dozen',
      value: 'dozens',
    },
    {
      label: 'Piece',
      value: 'pcs',
    },
    {
      label: 'Gram',
      value: 'g',
    },
    {
      label: 'Meter',
      value: 'm',
    },
    {
      label: 'Centimeter',
      value: 'cm',
    },
    {
      label: 'Millimeter',
      value: 'mm',
    },
    {
      label: 'Inch',
      value: 'in',
    },
    {
      label: 'Foot',
      value: 'ft',
    },
    {
      label: 'Yard',
      value: 'yd',
    },
    {
      label: 'Gallon',
      value: 'gal',
    },
    {
      label: 'Pint',
      value: 'pt',
    },
    {
      label: 'Ounce',
      value: 'oz',
    },
    {
      label: 'Pound',
      value: 'lb',
    },
    {
      label: 'Cubic Meter',
      value: 'm³',
    },
    {
      label: 'Square Meter',
      value: 'm²',
    },
  ]

  const discountOption = [
    {
      label: 'Percentage',
      value: 'percentage',
    },
    {
      label: 'Flat',
      value: 'flat',
    },
  ]

  const onChangePromotions = (promotions) => {
    // console.log(promotions, ' promotions')
  }

  return (
    <div className="row">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
        className="col-md-12"
      >
        <div className="row">
          <div className="col-md-8 mb-3">
            <Space direction="vertical" size={20} style={{ width: '100%' }}>
              <Card title="Add New Product">
                <Form.Item
                  name="name"
                  label="Product Title"
                  size="large"
                  hasFeedback
                  rules={[{ required: true, message: 'Please enter product name', min: 6 }]}
                >
                  <Input placeholder="Please enter Product name" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Product Description"
                  size="large"
                  validateStatus={editorError ? 'error' : ''}
                  help={editorError}
                  hasFeedback
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!editorData || editorData === '') {
                          return Promise.reject('Please enter a product description.')
                        }
                        return Promise.resolve()
                      },
                    },
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChange} />
                </Form.Item>
                <Form.Item
                  name="shortDescription"
                  label="Product Short Description"
                  size="large"
                  validateStatus={shortEditorError ? 'error' : ''}
                  help={shortEditorError}
                  hasFeedback
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!shortEditorData || shortEditorData === '') {
                          return Promise.reject('Please enter a product short description.')
                        }
                        return Promise.resolve()
                      },
                    },
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChangeShort} />
                </Form.Item>
                <Form.Item
                  name="brand"
                  label="Select Brand"
                  size="large"
                  hasFeedback
                  rules={[{ required: true, message: 'Please select a brand' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a brand"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={brandList}
                  />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Select Category"
                  size="large"
                  hasFeedback
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  <Select
                    showSearch
                    loading={subcategoryState.isLoading}
                    placeholder="Select a category"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={categoryList}
                    onChange={handleSubCategoryList}
                  />
                </Form.Item>
                <Form.Item name="subcategory" label="Select SubCategory" size="large">
                  <Select
                    showSearch
                    placeholder="Select a subcategory"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={subCategoryList}
                  />
                </Form.Item>

                <Form.Item name="discountType" label="Select Discount Type" size="large">
                  <Select
                    showSearch
                    placeholder="Select discount type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={discountOption}
                  />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.discountType !== currentValues.discountType
                  }
                >
                  {({ getFieldValue }) => {
                    const discountType = getFieldValue('discountType')
                    return (
                      <Form.Item
                        name="discount"
                        label="Discount Value"
                        size="large"
                        hasFeedback
                        dependencies={['discountType']}
                        rules={[
                          {
                            required: discountType !== undefined,
                            message: 'Please enter discount value',
                          },
                          {
                            validator: (_, value) => {
                              if (discountType === 'percentage') {
                                if (value >= 1 && value <= 100) {
                                  return Promise.resolve()
                                } else {
                                  return Promise.reject(
                                    'Please enter a percentage between 1 and 100',
                                  )
                                }
                              } else {
                                if (value < 1) {
                                  return Promise.reject('Please enter a valid discount value')
                                } else {
                                  return Promise.resolve()
                                }
                              }
                            },
                          },
                        ]}
                      >
                        <Input type="number" placeholder="Please enter discount value" />
                      </Form.Item>
                    )
                  }}
                </Form.Item>

                <Form.Item
                  name="tags"
                  label="Enter Tags"
                  size="large"
                  rules={[{ required: true, message: 'Please enter tags' }]}
                >
                  <Select
                    mode="tags"
                    style={{
                      width: '100%',
                    }}
                    placeholder="Tags Mode"
                    // onChange={handleChange}
                    // options={options}
                  />
                </Form.Item>

                <Form.Item
                  name="variant"
                  label="Select Variants"
                  size="large"
                  rules={[{ required: true, message: 'Please select variants' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a variants"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={() => setVariants(true)}
                    options={variantOption}
                  />
                </Form.Item>
                {variants ? (
                  <>
                    <Form.List name="variants">
                      {(fields, { add, remove }) => (
                        <>
                          <Space
                            direction="horizontal"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add field
                              </Button>
                            </Form.Item>
                          </Space>
                          {fields.map(({ key, name, ...restField }) => (
                            <>
                              <Space
                                key={key}
                                style={{
                                  display: 'flex',
                                  marginBottom: 8,
                                }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  label="Size"
                                  name={[name, 'size']}
                                  hasFeedback
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const regex = /^[a-zA-Z0-9]+$/
                                        if (!regex.test(value)) {
                                          return Promise.reject('Please enter only numeric values')
                                        } else if (value.length < 2) {
                                          return Promise.reject('Please enter min length 2')
                                        } else {
                                          return Promise.resolve()
                                        }
                                      },
                                    },
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Enter size" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Regular Price"
                                  name={[name, 'regularPrice']}
                                  hasFeedback
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const regex = /^[1-9]\d*$/
                                        if (!regex.test(value)) {
                                          return Promise.reject('Please enter only numeric values')
                                        } else if (value.length > 10) {
                                          return Promise.reject('Please enter max length 10')
                                        } else if (value.length < 2) {
                                          return Promise.reject('Please enter min length 2')
                                        } else {
                                          return Promise.resolve()
                                        }
                                      },
                                    },
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Enter regular Price" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Selling Price"
                                  name={[name, 'sellingPrice']}
                                  hasFeedback
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const regex = /^[1-9]\d*$/
                                        if (!regex.test(value)) {
                                          return Promise.reject('Please enter only numeric values')
                                        } else if (value.length > 10) {
                                          return Promise.reject('Please enter max length 10')
                                        } else if (value.length < 2) {
                                          return Promise.reject('Please enter min length 2')
                                        } else {
                                          return Promise.resolve()
                                        }
                                      },
                                    },
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Enter selling Price" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Quantity"
                                  name={[name, 'quantity']}
                                  hasFeedback
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const regex = /^[1-9]\d*$/
                                        if (!regex.test(value)) {
                                          return Promise.reject('Please enter only numeric values')
                                        } else if (value.length < 2) {
                                          return Promise.reject('Please enter min length 2')
                                        } else {
                                          return Promise.resolve()
                                        }
                                      },
                                    },
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Enter Unit" />
                                </Form.Item>

                                {fields.length > 1 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(name)}
                                  />
                                ) : null}
                              </Space>
                            </>
                          ))}
                        </>
                      )}
                    </Form.List>
                  </>
                ) : (
                  ''
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={productState.isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </Card>
            </Space>
          </div>
          <div className="col-md-4">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card title="Product Image" className="mb-3">
                <Form.Item
                  name="image"
                  label="Main Product Image"
                  size={'large'}
                  hasFeedback={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (fileList.length < 1) {
                          return Promise.reject('Please choose product image')
                        }
                        return Promise.resolve()
                      },
                    },
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Card>

              <Card title="Product Image Gallery" className="mb-3">
                <Form.Item
                  name="gallery"
                  label="Product Gallery Images"
                  size={'large'}
                  hasFeedback={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (fileList.length < 1) {
                          return Promise.reject('Please choose product gallery image')
                        }
                        return Promise.resolve()
                      },
                    },
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Upload
                    multiple={true}
                    listType="picture-card"
                    fileList={fileListGallery}
                    onChange={onChangeProductGallery}
                    onPreview={onPreview}
                  >
                    {fileListGallery.length < 10 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Card>
            </Space>
            <Space direction="horizontal">
              <Card title="Promotions and Product Status" className="mb-3">
                <Form.Item
                  name="promotions"
                  label="Product Status"
                  size={'large'}
                  hasFeedback={true}
                >
                  <Checkbox.Group options={options} onChange={onChangePromotions} />
                </Form.Item>
              </Card>
            </Space>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default AddProduct
