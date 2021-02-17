import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import './PostsList.css'
import { Axios } from '../../utils/axios'
import { Post } from '../../interfaces/Post'
import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

const PostsList = () => {
  const { Title, Paragraph, Text } = Typography
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    (async () => {
      const posts: AxiosResponse<Post[]> = await Axios.get('/posts')
      setPosts(posts.data.reverse())
    })()
  }, [])

  return (
    <Typography>
      <Title level={3}>Posts:</Title>
      <Paragraph style={{ paddingLeft: '16px' }}>
        <ul>
          {
            posts.map(post => (
              <li>
                <Paragraph className='item'>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                  <Text>{post.description}</Text>
                  <Text style={{ color: '#ccc' }}>{post.date_posted} by {post.author}</Text>
                </Paragraph>
              </li>
            ))
          }
        </ul>
      </Paragraph>
    </Typography>
  )
}

export default PostsList
