import React, { FC } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Post } from '../../interfaces/Post'
import { Axios } from '../../utils/axios'

const CreateForm: FC = () => {
  const [form] = Form.useForm()

  type FormValues = {
    Author: string
    Description: string
    Text: string
    Title: string
  }

  const validateMessages = {
    required: '${label} is required!',
    number: {
      range: '${label} must be between ${min} and ${max}'
    }
  }

  const handleSubmit = async (values: FormValues) => {
    const obj: Post = {
      title: values.Title,
      description: values.Description,
      author: values.Author,
      body: values.Text,
      date_posted: String(new Date())
    }

    const res = await Axios.post('/post', obj)

    if (res.status === 200) {
      success()
      form.resetFields()
    }
  }

  const success = () => {
    message.success('Post has been created')
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        size='large'
        requiredMark={true}
        validateMessages={validateMessages}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='Author'
          label='Author:'
          required
          rules={[{ required: true, min: 3, max: 60 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='Title'
          label='Title:'
          required
          rules={[{ required: true, min: 1, max: 180 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='Description'
          label='Description:'
          required
          rules={[{ required: true, min: 1, max: 360 }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='Text'
          label='Text:'
          required
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button
            danger={true}
            style={{ marginRight: 16 }}
            onClick={() => form.resetFields()}
          >
            Delete All
          </Button>
          <Button type='primary' htmlType='submit'>
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateForm
