import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import signUp from '@wasp/actions/signUp';



const SignupPage = () => {
  let history = useHistory();

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      event.target.reset();
      const newUser = await signUp({ username, password });
      console.log('newUser ---> ', newUser);
      if (newUser) {

        history.push('/test');
      }
    } catch (err) {
      window.alert('Error: ' + err.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Sign up" />
      </form>
      
      <br />
      <span>
        I already have an account (<Link to='/login'>go to login</Link>).
      </span>
    </>
  );
};

export default SignupPage;
