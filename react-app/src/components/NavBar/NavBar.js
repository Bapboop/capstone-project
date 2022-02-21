import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import PostFormModal from "../PostForm/PostModal";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/session';
import ProfileButton from "./ProfileButton";


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


              <img className='nav-img' src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645349382/picture_compress_1_k66mdi.png" />
            </NavLink>
            {/* </li> */}
          </div>

          <div className="nav-right">
          <div className="home">
          <NavLink to="/feed" exact={true} activeClassName="active">
          <i class="fa-solid fa-house-user"></i>
          </NavLink>
          </div>

            <PostFormModal  />
            {/* <li> */}
            {/* <LogoutButton /> */}
            {/* <i  class="fa-regular fa-square-plus"></i> */}
            {/* <button onClick={onLogout}>Logout</button> */}
            {/* </li> */}
            <ProfileButton user={user} />
          </div>


          {/* </ul> */}
        </div>
      </div>
    </nav>
    // : null
  );
};

export default NavBar;
