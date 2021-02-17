import React, { FC } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import MainLayout from './components/MainLayout'
import './App.css'
import PostsList from './components/PostsList'
import CreateForm from './components/CreateForm'
import Post from './components/Post'

const App: FC = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path='/create'>
            <CreateForm />
          </Route>
          <Route path='/post/:id'>
            <Post />
          </Route>
          <Route path='/'>
            <PostsList />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default App
