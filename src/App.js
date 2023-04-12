import logo from './logo.svg';
import './App.css';
import { Button, Container, Card, Alert } from 'react-bootstrap';
import Lease from './components/Lease'
import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React, { useEffect, useState } from 'react';


import { useSelector, useDispatch } from 'react-redux'
import { desktopActions } from './store/index'
import { getUser, createLease } from './graphql/queries'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage';
import LeasePage from './components/Lease'

Amplify.configure(awsExports);

// define the router
const router = createBrowserRouter([
  // starting page
  { path: '/', element: <HomePage /> }
])

function App({ signOut, user }) {

  const dispatch = useDispatch()
  const config = useSelector(state => state.desktop.config)
  const account = useSelector(state => state.desktop.user)

  const static_config = {
    headers: { Authorization: user.signInUserSession.idToken.jwtToken, 'Content-Type': 'application/json' }
  }

  // console.log(user.signInUserSession.idToken.jwtToken)
  const refreshAccount = async () => {
    dispatch(desktopActions.setConfig(static_config))
    const user = await getUser(static_config)
    dispatch(desktopActions.setUser(user))
  }

  useEffect(() => { refreshAccount() }, [])

  const hasInstance = (account) => {
    return account.leases ? (account.leases.length) > 0 : false
  }
  const getBalance = (account) => parseInt(account.balance) / 100


  const refreshHandler = () => {
    refreshAccount()
  }
  const createleaseHandler = async () => {
    const user = await createLease(config)
    dispatch(desktopActions.setUser(user))
  }

    // return <RouterProvider router={router} />
  if (!account)
    return (<h1>loading</h1>)
  else
    return (
      <div className="App">

        <h1>Hello {user.username}</h1>
        <h2>Your Balance:  {getBalance(account)} RMB</h2>
        <Container variant="text-center">
          {/* {(getBalance(account)<5) && <Alert  variant='primary'>Less than 5RMB,find Chris to charge your account</Alert>} */}
          <Button variant="primary" onClick={createleaseHandler} style={{ margin: '10px' }}>Create Lease</Button>
          <Button variant="primary" onClick={refreshHandler} style={{ margin: '10px' }} >Refresh</Button>
          <Button variant="danger" style={{ margin: '10px' }} onClick={signOut}>Sign out</Button>


        </Container>
        <Container >
          {
            account.leases && account.leases.map((lease) => <Lease lease={lease} key={lease.id} />)
          }
        </Container>


      </div>
    );
}
export default withAuthenticator(App);

