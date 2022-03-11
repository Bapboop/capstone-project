const GET_USER = "users/GET_USER";

const getUserProfile = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const getAUserProfile = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  // console.log(response, '--------------')

  if (response.ok) {
    const user = await response.json();
    // console.log(user, '!!!!!!!!!!!!!!!!')

    dispatch(getUserProfile(user));
  }
};

const userReducer = (state = {}, action) => {
  let newState = {};

  switch (action.type) {
    case GET_USER: {
      newState = { user: action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default userReducer;
