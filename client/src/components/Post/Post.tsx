import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { Axios } from '../../utils/axios'
import { Post as IPost } from '../../interfaces/Post'
import { Typography } from 'antd'

const Post: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<IPost | null>()
  const { Title, Paragraph, Text } = Typography

  useEffect(() => {
    (async () => {
      const post: AxiosResponse<IPost> = await Axios.get(`/posts/${id}`)
      setPost(post.data)
    })()
  }, [id])

  return (
    <div>
      {post ? (
        <Typography>
          <Title>{post.title}</Title>
          <Paragraph>
            <Text>{post.body}</Text>
          </Paragraph>
        </Typography>
      ) : null}
    </div>
  )
}

export default Post
