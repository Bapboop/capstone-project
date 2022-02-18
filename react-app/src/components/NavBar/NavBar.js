import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import PostFormModal from "../PostForm/PostModal";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/session';


const NavBar = ({ isUser }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());

  };

  if (!user) {
    return <Redirect to='/' />;
  }

  return (
    // isUser?
    <nav>
      <div className="nav-container">
        <div className="nav-bar">
          <div className="nav-left">

            {/* <ul> */}
            {/* <li> */}
            <NavLink to="/feed" exact={true} activeClassName="active">
              Logo
            </NavLink>
            {/* </li> */}
          </div>

          <div className="nav-right">
            <PostFormModal />
            {/* <li> */}
            {/* <LogoutButton /> */}
            <button onClick={onLogout}>Logout</button>
            {/* </li> */}
          </div>
          {/* </ul> */}
        </div>
      </div>
    </nav>
    // : null
  );
};

export default NavBar;
