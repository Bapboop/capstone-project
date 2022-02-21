import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <p onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </p>
      {showMenu && (
        <ul className="profile-dropdown">
        {/* <div className="profile-drop"> */}

        <div className='profile-link'>

            <NavLink className='test' to={`/users/${user.id}`} >
          <li>Profile</li>
          </NavLink>
        </div>
        {/* </div> */}
          {/* <li>{user?.email}</li> */}
          <li>
            <p onClick={logout}>Log Out</p>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
