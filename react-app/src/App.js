import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import LoginForm from './components/auth/LoginForm';
import LoginPage from "./components/Splash/Login";
// import SignUpForm from './components/auth/SignUpForm';
import SignUpPage from "./components/Splash/Signup";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import FeedView from "./components/FeedView/FeedView";
import { authenticate } from "./store/session";

import PostForm from "./components/PostForm/PostForm";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <LoginPage />
          {/* <LoginForm /> */}
        </Route>
        <Route path="/signup" exact={true}>
          {/* <p> hi from signup</p> */}
          <SignUpPage />
        </Route>
        <Route path="/feed" exact={true}>
          <NavBar />

          <FeedView />
        </Route>
        <Route path="/posts/new">
          <PostForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
