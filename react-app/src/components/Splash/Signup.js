import React from "react";
import { NavLink } from "react-router-dom";
import SignUpForm from "../auth/SignUpForm"

const SignUpPage = () => {




  return (
    <>
      <div className="signup-container">
        <div className="signup-header">
          <h1>Gardengram</h1>
        </div>
        <SignUpForm />

        <div className="signup-redirect">
            <p>Have an account?
                <NavLink to='/'>
                    Log in
                </NavLink>
            </p>

        </div>
      </div>
    </>
  );
};

export default SignUpPage
