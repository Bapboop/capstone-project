import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";

const LoginPage = () => {




  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h1>Gardengram</h1>
        </div>
        <LoginForm />

        <div className="signup-redirect">
            <p>Don't have an account?
                <NavLink to='/signup'>
                    Sign up
                </NavLink>
            </p>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
