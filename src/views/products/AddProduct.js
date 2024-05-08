import React, { useState } from 'react';
import { Button, Form, Input, message, Space, Card } from 'antd';
import Editor from '../../components/product/Editor';

const AddProduct = () => {
  const [form] = Form.useForm();
  const [editorData, setEditorData] = useState('');
  const [editorError, setEditorError] = useState(null);

  const onFinish = (values) => {
    if (!editorData) {
      setEditorError('Please enter a product description.');
      return;
    }
    // Your form submission logic here
    message.success('Submit success!');
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Submit failed!');
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    // Clear the error message when the editor content changes
    setEditorError(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mb-5">
          <Space direction="vertical" size={20}>
            <Card title="Add New Product" style={{ width: 740 }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="name"
                  label="Product Title"
                  size={'large'}
                  hasFeedback={true}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter product name',
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Please enter Product name" />
                </Form.Item>

                <Form.Item
                  name="product_description"
                  label="Product Description"
                  size={'large'}
                  validateStatus={editorError ? 'error' : ''}
                  help={editorError}
                  hasFeedback={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!editorData || editorData === '') {
                          return Promise.reject('Please enter a product description.');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Editor handleEditorChange={handleEditorChange} />
                </Form.Item>
                <Space direction="horizontal">
                  <Form.Item
                    label="Category"
                    name="category"
                    hasFeedback={true}
                    rules={[{ required: true, message: 'Please input category!' }]}
                  >
                    <Input placeholder="Category" />
                  </Form.Item>
                  <Form.Item
                    label="Regular Price"
                    name="regular_price"
                    hasFeedback={true}
                    rules={[{ required: true, message: 'Please input regular price!', }]}
                  >
                    <Input placeholder="Enter regular Price" />
                  </Form.Item>
                  <Form.Item
                    label="Selling Price"
                    name="selling_price"
                    hasFeedback={true}
                    rules={[{ required: true, message: 'Please input selling price!' }]}
                  >
                    <Input placeholder="Enter selling Price" />
                  </Form.Item>
                </Space>

                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default AddProduct;
