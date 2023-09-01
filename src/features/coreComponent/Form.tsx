import { Button, Form, Input, Typography } from 'antd';
export const CustomForm = () => {
  return (
    <Form
      style={{
        maxWidth: 300,
        backgroundColor: 'white',
        border: '1px solid #d9d9d9',
        padding: '2rem'
      }}
    >
      <Typography.Title level={4} className="d-flex justify-content-start">
        Login
      </Typography.Title>
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button>Submit</Button>
      </Form.Item>
    </Form>
  );
};
