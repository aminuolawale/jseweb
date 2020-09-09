import { useQuery } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import { IS_LOGGED_IN } from '../gql/query';
import EditNote from './edit';
import Favorites from './favorites';
import Home from './home';
import MyNotes from './mynotes';
import NewNote from './new';
import NotePage from './note';
import SignIn from './signin';
import SignUp from './signup';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Loading ...</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute exact path="/mynotes" component={MyNotes}></PrivateRoute>
        <PrivateRoute
          exact
          path="/favorites"
          component={Favorites}
        ></PrivateRoute>
        <Route exact path="/note/:id" component={NotePage}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <PrivateRoute exact path="/new" component={NewNote}></PrivateRoute>
        <PrivateRoute exact path="/edit/:id" component={EditNote}></PrivateRoute>
      </Layout>
    </Router>
  );
};

export default Pages;
