import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AllWords from './pages/AllWords';
import AddWord from './pages/AddWord';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        (props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route 
      {...rest}
      render={
        (props) => authenticated === true
         ? <Redirect to='/add-word' />
         : <Component {...props} />
      }
    />
  )
}

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      }
      else {
        setAuthenticated(false);
        setLoading(false);
      }
    })
  });

  return loading === true ? <h2 style={{ color: "rgb(114, 131, 148)" }}>Loading...</h2> : (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={Home}>
        </Route>

        <PrivateRoute
          path="/add-word"
          authenticated={authenticated}
          component={AddWord}>
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/all-words"
          authenticated={authenticated}
          component={AllWords}>
        </PrivateRoute>

        <PublicRoute 
          path="/signup" 
          authenticated={authenticated}
          component={SignUp}>
        </PublicRoute>

        <PublicRoute 
          path="/login" 
          authenticated={authenticated} 
          component={Login}>
        </PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
