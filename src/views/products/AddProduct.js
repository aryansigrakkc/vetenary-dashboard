import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Space, Card, Select,Upload } from 'antd';
import Editor from '../../components/product/Editor';
import { fetchAllCategory } from '../../redux/thunks/categoryThunk';
import { useDispatch } from 'react-redux';
import "./product.scss";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editorData, setEditorData] = useState('');
  const [editorError, setEditorError] = useState(null);
  const [shortEditorData, setShortEditorData] = useState('');
  const [shortEditorError, setShortEditorError] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
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
  }, [dispatch]);

  const onFinish = (values) => {
    if (!editorData) {
      setEditorError('Please enter a product description.');
      return;
    }
    message.success('Submit success!');
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Submit failed!');
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    setEditorError(null);
  };
  const handleEditorChangeShort = (event, editor) => {
    const data = editor.getData();
    setShortEditorData(data);
    setShortEditorError(null);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

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
              <Card title="Add New Product">
                <Form.Item
                  name="name"
                  label="Product Title"
                  size="large"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please enter product name', min: 6 },
                  ]}
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
                          return Promise.reject('Please enter a product description.');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required:true,
                      message:""
                    }
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChange} />
                </Form.Item>
                <Form.Item
                  name="shortDescription"
                  label="Product Short Description"
                  size="large"
                  validateStatus={editorError ? 'error' : ''}
                  help={editorError}
                  hasFeedback
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!editorData || editorData === '') {
                          return Promise.reject('Please enter a product short description.');
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message:""
                    }
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChangeShort}/>
                </Form.Item>
                <Space direction="horizontal">
                  <Form.Item
                    name="category"
                    label="Select Category"
                    size="large"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select a category' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a category"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={categoryList}
                    />
                  </Form.Item>
                  <Form.Item
                    name="subcategory"
                    label="Select SubCategory"
                    size="large"
                  >
                    <Select
                      showSearch
                      placeholder="Select a category"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={categoryList}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Regular Price"
                    name="regular_price"
                    hasFeedback
                    rules={[
                      {
                        validator:(_,value)=>{
                          const regex = /^[1-9]\d*$/;
                           if(!regex.test(value)){
                            return Promise.reject('Please enter only numeric values');
                           }
                           else if(value.length > 10){
                            return Promise.reject('Please enter max length 10');
                           }
                           else if(value.length<2){
                            return Promise.reject('Please enter min length 2');
                           }else{
                             return Promise.resolve();
                           }
                        }
                      },{
                        required:true,
                        message:""
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
                      validator:(_,value)=>{
                        const regex = /^[1-9]\d*$/;
                         if(!regex.test(value)){
                          return Promise.reject('Please enter only numeric values');
                         }
                         else if(value.length > 10){
                          return Promise.reject('Please enter max length 10');
                         }
                         else if(value.length<2){
                          return Promise.reject('Please enter min length 2');
                         }else{
                           return Promise.resolve();
                         }
                      }
                    },
                    {
                      required:true,
                      message:""
                    }
                    ]}

                  >
                    <Input placeholder="Enter selling Price" />
                  </Form.Item>
                </Space>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
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
                                    message:""
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
                                    message:""
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
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
