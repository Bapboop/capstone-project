import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp, login } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstname, lastname)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
    <div className="login-container">
      <form onSubmit={onSignUp}>
        <div className="signup-form">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-header">
            <img src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645347043/ok-godo_lkgfaa.svg"  alt="logo"/>
          </div>
          <div>
            <label></label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              placeholder="First Name"
              type="text"
              name="firstname"
              onChange={updateFirstname}
              value={firstname}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              onChange={updateLastname}
              value={lastname}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              placeholder="Email"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              placeholder="Confirm password"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div>
            <button className="login-butt" type="submit">
              Sign Up
            </button>
          </div>

          <button className="demo-butt" type="submit" onClick={demoLogin}>
            Demo User
          </button>
        </div>
      </form>
      <div className="signup-redirect">
        <p>
          Have an account?
          <span className="sign-up">
            <NavLink to="/">Log in</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
