import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react'

import { AuthProvider } from './context/authenticate'
import AuthRoute from './util/authRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={PostDetails}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
