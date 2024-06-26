import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Space, Card, Select, Upload, Checkbox } from 'antd';
import Editor from '../../components/product/Editor';
import { fetchAllCategory } from '../../redux/thunks/categoryThunk';
import {fetchAllBrand} from '../../redux/thunks/brandThunk';
import { fetchAllSubCategory } from '../../redux/thunks/subCategoryThunk';
import { createProduct,productDetails } from '../../redux/thunks/productThunk';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./product.scss";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editorData, setEditorData] = useState('');
  const [editorError, setEditorError] = useState(null);
  const [shortEditorData, setShortEditorData] = useState('');
  const [shortEditorError, setShortEditorError] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const subcategoryState = useSelector(state => state.subcategory);
  const productState = useSelector(state => state.product);
  const [defaultOption, setDefaultOption] = useState([]);
  const [productDetailsData ,setProductDetails] = useState(productState);
  const params = useParams()
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChangeProductGallery = ({ fileList: newFileListGallery }) => {
    setFileListGallery(newFileListGallery);
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
  useEffect(() => {
    if (productDetailsData.data) {
        form.setFieldsValue({
            name: productDetailsData.data?.name,
            description: productDetailsData.data?.description,
            shortDescription: productDetailsData.data?.shortDescription,
            brand: productDetailsData.data?.brand?.name,
            category: productDetailsData.data?.category?.name,
            subcategory: productDetailsData.data?.subCategory?.name,
            regular_price: productDetailsData.data?.regularPrice,
            selling_price: productDetailsData.data?.sellingPrice,
            quantity: productDetailsData.data?.quantity,
        });
    }
}, [productDetailsData, form]);
  useEffect(() => {
    dispatch(fetchAllCategory()).then((res) => {
      if (res.payload.success) {
        const arr = [];
        res.payload.data.forEach((item) => {
          arr.push({ value: item._id, label: item.name.toUpperCase() });
        });
        setCategoryList(arr);
      } else {
        if (res.payload.errors) {
          res.payload.errors.forEach((err) => {
            message.error(err.msg);
          });
        } else {
          message.error(res.payload.message);
        }
      }
    }).catch((err) => {
      message.error(err.message);
    });
    dispatch(fetchAllBrand()).then((res) => {
      if (res.payload.success) {
        const arr = [];
        res.payload.data.forEach((item) => {
          arr.push({ value: item._id, label: item.name.toUpperCase() });
        });
        setBrandList(arr);
      } else {
        if (res.payload.errors) {
          res.payload.errors.forEach((err) => {
            message.error(err.msg);
          });
        } else {
          message.error(res.payload.message);
        }
      }
    }).catch((err) => {
      message.error(err.message);
    });
    dispatch(productDetails(params.productId)).then((res) => {
        if (res.payload.success) {
            setProductDetails(res.payload);
            handleDefaultOption(res.payload);
        } else {
          if (res.payload.errors) {
            res.payload.errors.forEach((err) => {
              message.error(err.msg);
            });
          } else {
            message.error(res.payload.message);
          }
        }
      }).catch((err) => {
        message.error(err.message);
      });
  }, [dispatch]);

  const onFinish = (values) => {
    if (!editorData) {
      setEditorError('Please enter a product description.');
      return;
    }
    if (!shortEditorData) {
      setEditorError('Please enter a product short description.');
      return;
    }

    const formData = new FormData()
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('shortDescription', values.shortDescription);
    formData.append('category', values.category);
    formData.append('code', 'PRO-001');
    formData.append('sellingPrice', values.selling_price);
    formData.append('regularPrice', values.regular_price);
    formData.append('quantity', values.quantity);
    if (values.subcategoy) {
      formData.append('subcategory', values.subcategory);
    }
    if (values.brand) {
      formData.append('brand', values.brand);
    }
    formData.append('image', fileList.length > 0 ? fileList[0].originFileObj
      : null);
    values.gallery.fileList.forEach((item) => {
      formData.append('gallery', item.originFileObj);
    });
    values.promotions.forEach((item) => {
      formData.append(item, true);
    });

    dispatch(createProduct(formData)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message)
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
    message.error('Submit failed!');
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    setEditorError(null);
    form.setFieldsValue({ description: data });
  };
  const handleEditorChangeShort = (event, editor) => {
    const data = editor.getData();
    setShortEditorData(data);
    setShortEditorError(null);
    form.setFieldsValue({ shortDescription: data });
  };


  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

  const handleSubCategoryList = (categoryId) => {
    dispatch(fetchAllSubCategory(categoryId)).then((res) => {
      if (res.payload.success) {
        const arr = [];
        res.payload.data.forEach((item) => {
          arr.push({ value: item._id, label: item.name.toUpperCase() });
        });
        setSubCategoryList(arr);
      } else {
        if (res.payload.errors) {
          res.payload.errors.forEach((err) => {
            message.error(err.msg);
          });
        } else {
          message.error(res.payload.message);
        }
      }
    }).catch((err) => {
      message.error(err.message);
    });
  }

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
  ];

  const handleDefaultOption = ({ data }) => {
    const arr = [];
    const { hotNew, hotDeal, bestRated, trend } = data || {};
    if (hotNew) arr.push('hotNew');
    if (hotDeal) arr.push('hotDeal');
    if (bestRated) arr.push('bestRated');
    if (trend) arr.push('trend');
    setDefaultOption(arr)
};
console.log(defaultOption,' defai')
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
        <div className='row'>
          <div className='col-md-8 mb-3'>
            <Space direction="vertical" size={20}>
              <Card title="Update Product">
                <Form.Item
                  name="name"
                  label="Product Title"
                  size="large"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please enter product name', min: 6 },
                  ]}
                >
                  <Input placeholder="Please enter Product name"/>
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
                          return Promise.reject('Please enter a product description.');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: ""
                    }
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChange} data={productDetailsData.data?.description}/>
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
                          return Promise.reject('Please enter a product short description.');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: ""
                    }
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChangeShort} data={productDetailsData.data?.shortDescription}/>
                </Form.Item>
                <Space direction="horizontal">
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
                  <Form.Item
                    name="subcategory"
                    label="Select SubCategory"
                    size="large"
                  >
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
                  <Form.Item
                    label="Regular Price"
                    name="regular_price"
                    hasFeedback
                    rules={[
                      {
                        validator: (_, value) => {
                          const regex = /^[1-9]\d*$/;
                          if (!regex.test(value)) {
                            return Promise.reject('Please enter only numeric values');
                          }
                          else if (value.length > 10) {
                            return Promise.reject('Please enter max length 10');
                          }
                          else if (value.length < 2) {
                            return Promise.reject('Please enter min length 2');
                          } else {
                            return Promise.resolve();
                          }
                        }
                      }, {
                        required: true,
                        message: ""
                      }
                    ]}
                  >
                    <Input placeholder="Enter regular Price" />
                  </Form.Item>
                  <Form.Item
                    label="Selling Price"
                    name="selling_price"
                    hasFeedback
                    rules={[
                      {
                        validator: (_, value) => {
                          const regex = /^[1-9]\d*$/;
                          if (!regex.test(value)) {
                            return Promise.reject('Please enter only numeric values');
                          }
                          else if (value.length > 10) {
                            return Promise.reject('Please enter max length 10');
                          }
                          else if (value.length < 2) {
                            return Promise.reject('Please enter min length 2');
                          } else {
                            return Promise.resolve();
                          }
                        }
                      },
                      {
                        required: true,
                        message: ""
                      }
                    ]}

                  >
                    <Input placeholder="Enter selling Price" />
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    hasFeedback
                    rules={[
                      {
                        validator: (_, value) => {
                          const regex = /^[1-9]\d*$/;
                          if (!regex.test(value)) {
                            return Promise.reject('Please enter only numeric values');
                          }
                          else if (value.length < 2) {
                            return Promise.reject('Please enter min length 2');
                          } else {
                            return Promise.resolve();
                          }
                        }
                      },
                      {
                        required: true,
                        message: ""
                      }
                    ]}

                  >
                    <Input placeholder="Enter selling Price" />
                  </Form.Item>
                </Space>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={productState.isLoading}>
                    Update
                  </Button>
                </Form.Item>
              </Card>
            </Space>
          </div>
          <div className='col-md-4'>
            <Space direction="vertical">
              <Card title="Product Image" className='mb-3'>
                <Form.Item
                  name="image"
                  label="Main Product Image"
                  size={'large'}
                  hasFeedback={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (fileList.length < 1) {
                          return Promise.reject('Please choose product image');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: ""
                    }
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

              <Card title="Product Image Gallery" className='mb-3'>
                <Form.Item
                  name="gallery"
                  label="Product Gallery Images"
                  size={'large'}
                  hasFeedback={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (fileList.length < 1) {
                          return Promise.reject('Please choose product gallery image');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: ""
                    }
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
            <Space direction='horizontal'>
              <Card title="Promotions and Product Status" className='mb-3'>
                <Form.Item
                  name="promotions"
                  label="Product Status"
                  size={'large'}
                  hasFeedback={true}
                >
                  <Checkbox.Group options={options}  value={defaultOption} />
                </Form.Item>
              </Card>
            </Space>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
