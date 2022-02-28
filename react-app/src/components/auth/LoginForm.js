import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
  };

  if (user) {
    return <Redirect to="/feed" />;
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <div className="login-form">
          <div>
            <div className="login-header">
              <img
                src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645347043/ok-godo_lkgfaa.svg"
                alt="logo"
              />
            </div>
            <h3 className="site-info">It's like Instagram, but for gardens!</h3>
            <div className="login-errors">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="email-signin">
              <label htmlFor="email"></label>
              <input
                placeholder=" Email "
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
          </div>
          <div className="password">
            <label htmlFor="password"></label>
            <input
              placeholder=" Password "
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div>
              <button
                className="login-butt"
                disabled={
                  email.length >= 3 && password.length >= 5 ? false : true
                }
                type="submit"
              >
                Login
              </button>
            </div>
            <button className="demo-butt" type="submit" onClick={demoLogin}>
              Demo User
            </button>
          </div>
        </div>
      </form>
      <div className="signup-redirect">
        <p>
          Don't have an account?
          <span className="sign-up">
            <NavLink to="/signup">Sign up</NavLink>
          </span>
        </p>
      </div>
      <div className="footer-div">
        <div className='me'>Robert Popphan</div>
        <div className="links">
          <a href="https://github.com/Bapboop" target="_blank">
            <i className="fa-brands fa-github fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com/in/robert-popphan-0b6711126/" target="_blank">
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
