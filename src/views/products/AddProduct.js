import React from 'react'
import { Button, Form, Input, message, Space } from 'antd';

const AddProduct = () => {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      url: 'https://taobao.com/',
    });
  };
  return (
    <div className="container">
      <div className="row">
         <div className="col-md-8">
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
             <Form.Item
                name="url"
                label="URL"
                size={'large'}
                rules={[
                  {
                    required: true,
                  },
                  {
                    type: 'url',
                    warningOnly: true,
                  },
                  {
                    type: 'string',
                    min: 6,
                  },
                ]}
              >
        <Input placeholder="input placeholder" />
      </Form.Item>
            <Form.Item
              label="Normal label"
              name="username"
              type="password"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'password',
                  warningOnly: true,
                },
                {
                  type: 'string',
                  min: 6,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="A super long label text"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
         </div>
         <div className="col-md-4">
           
         </div>
      </div>
    </div>
  )
}

export default AddProduct