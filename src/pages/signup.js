import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import UserForm from "../components/UserForm";
const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;



const SignUp = props => {
    useEffect(() => {
      document.title = 'Sign Up - Notedly';
    });
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      // update the local cache
      client.writeData({data: {isLoggedIn:true}});
      //   redirect the user to the homepage
      props.history.push('/');
    }
  });
  console.log("this is the data returned", signUp);
  return (
    <React.Fragment>
        <UserForm action={signUp} formType="signup"></UserForm>
        {loading && <p>Loading...</p>}
        {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
