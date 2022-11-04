import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@wasp/auth/forms/Login';
import { GoogleSignInButton } from '@wasp/auth/buttons/Google';

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <br />
      <span>
        I don't have an account yet (<Link to='/signup'>go to signup</Link>).
      </span>
      <br />
      <span>or Login with G0o0o0o0oGle</span>
      <br />
      <GoogleSignInButton />
    </>
  );
};

export default LoginPage;
