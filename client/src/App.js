import React from 'react'
import './App.css'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'

import {
  HomeWrapper,
  LoginScreen,
  RegisterScreen,
  WorkspaceScreen,
  AppBanner,
  FilterAll,
  FilterUser
} from './components'

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <AppBanner/>
          <Switch>
            <Route path="/" exact component={HomeWrapper} />
            <Route path="/login/" exact component={LoginScreen} />
            <Route path="/register/" exact component={RegisterScreen} />
            <Route path="/playlist/:id" exact component={WorkspaceScreen} />
            <Route path="/all/" exact component={FilterAll} />
            <Route path="/user/"exact component={FilterUser} />
          </Switch>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App