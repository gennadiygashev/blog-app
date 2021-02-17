import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import './MainLayout.css'
import { Link } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

const MainLayout: FC<Props> = ({ children }) => {
  const { Header, Content, Footer } = Layout

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1"><Link to='/'>Main Page</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/create'>Create Post</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, height: '100%' }}>
        <div className="site-layout-background">
          { children }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Gennadiy Gashev ©2021</Footer>
    </Layout>
  )
}

export default MainLayout
