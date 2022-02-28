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
    let errArr = []
    console.log(errArr)
    if (password !== repeatPassword) {
      errArr.push('Passwords do not match')
    }

    if (firstname.length < 2) {
      errArr.push('First name must be more 2 or more letters')
    }
    if (errArr.length > 0) {
      setErrors([errArr])
    }
   if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstname, lastname)
      );
      if (data) {
        console.log(data)
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
        <div className="signup-form">
      <form onSubmit={onSignUp}>
          <div className="login-header">
            <img src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645347043/ok-godo_lkgfaa.svg"  alt="logo"/>
          </div>
          <h3 className='site-info'>It's like Instagram, but for gardens!</h3>
          <div>
          <div className="signup-errors">
            {errors.map((error, ind) => (

              <div key={ind}>{error}</div>

            ))}
          </div>
            <label></label>
            <input className="signup-input"
              placeholder="Username"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label></label>
            <input className="signup-input"
              placeholder="First Name"
              type="text"
              name="firstname"
              onChange={updateFirstname}
              value={firstname}
            ></input>
          </div>
          <div>
            <label></label>
            <input className="signup-input"
              placeholder="Last Name"
              type="text"
              name="lastname"
              onChange={updateLastname}
              value={lastname}
            ></input>
          </div>
          <div>
            <label></label>
            <input className="signup-input"
              placeholder="Email"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label></label>
            <input className="signup-input"
              placeholder="Password"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label></label>
            <input className="signup-input"
              placeholder="Confirm password"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              // required={true}
            ></input>
          </div>
          <div>
            <button className="login-butt"
            disabled={!username || !password || !email || !repeatPassword || !firstname || !lastname ? true: false}
            type="submit">
              Sign Up
            </button>
          </div>

          <button className="demo-butt" type="submit" onClick={demoLogin}>
            Demo User
          </button>
      </form>

        </div>
      <div className="signup-redirect">
        <p>
          Have an account?
          <span className="sign-up">
            <NavLink to="/">Log in</NavLink>
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
    </div>
  );
};

export default SignUpForm;
