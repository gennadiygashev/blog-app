import React, { FC, useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import './PostsList.css'
import { Axios } from '../../utils/axios'
import { Post } from '../../interfaces/Post'
import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

type Props = {
  adminMode: boolean
}

const PostsList: FC<Props> = ({ adminMode }) => {
  const { Title, Paragraph, Text } = Typography
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    ;(async () => {
      const posts: AxiosResponse<Post[]> = await Axios.get('/posts')
      setPosts(posts.data.reverse())
    })()
  }, [])

  const deletePostHandler = (id: string) => {
    setPosts(posts.filter(item => item._id !== id))
    Axios.delete('/delete', { params: { id } })
  }

  return (
    <Typography>
      <Title level={3}>Posts:</Title>
      <Paragraph style={{ paddingLeft: '16px' }}>
        <ul>
          {posts.map(post => (
            <li>
              <Paragraph className='item'>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <Text>{post.description}</Text>
                <Text style={{ color: '#ccc' }}>
                  {post.date_posted} by {post.author}
                </Text>
              </Paragraph>
              {adminMode ? (
                <Button
                  type='primary'
                  danger
                  icon={<DeleteOutlined />}
                  className='deleteButton'
                  onClick={() => deletePostHandler(post._id!)}
                >
                  Delete Post
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </Paragraph>
    </Typography>
  )
}

export default PostsList
