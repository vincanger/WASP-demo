import React from 'react';
import { useHistory } from 'react-router-dom';
import updateUsername from '@wasp/actions/updateUsername';

const UpdateUserDetails = ({user}) => {

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUsername = event.target.username.value;
    console.log('name ---> ', newUsername);
    const updatedUser = await updateUsername({ userId: user.id , username: newUsername });
    console.log('updatedUser ---> ', updatedUser);
    // history.push('/');
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="username" type="text" name="username" />
      <input type="submit" value="Update" />
    </form>
  );
};

export default UpdateUserDetails;
