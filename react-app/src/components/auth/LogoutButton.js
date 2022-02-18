import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());

  };

  if (!user) {
    return <Redirect to='/' />;
  }
  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
