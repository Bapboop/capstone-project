//  ---------------- Action Types:  ----------------
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const GET_USERS_POSTS = 'posts/GET_USERS_POSTS'
const DELETE_POST = 'posts/DELETE_POST'
const EDIT_POST = '/posts/EDIT_POST'
const EDIT_POST_TWO = '/posts/EDIT_POST_TWO'



// ---------------- Action creators:  ----------------
const getPosts = (posts) => {
    return {
       type: GET_POSTS,
       posts
    }
}


const createPost = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}


const usersPosts = (payload) => {
    return {
        type: GET_USERS_POSTS,
        payload
    }
}

const deleteAPost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

const updatePost = (payload) => {
    return {
        type: EDIT_POST,
        payload
    }
}

const updatePostTwo = (payload) => {
    return {
        type: EDIT_POST_TWO,
        payload
    }
}

//  ---------------- Thunks:  ----------------

// --------------- GET ALL POSTS --------------
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const allPosts = await response.json();
        dispatch(getPosts(allPosts))
    }
}

// --------------- CREATE SINGLE POST ------------
export const createNewPost = (payload) => async (dispatch) => {
    const response = await fetch('/api/posts/new', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createPost)
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        // console.log('data????', data.errors)
        if (data.errors) {
            return data
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

// --------------- GET USERS POSTS -------------
export const getUsersPost = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/posts`)

    if (response.ok) {
        const posts = await response.json();

        dispatch(usersPosts(posts))
    }
}



 // --------------- DELETE USERS POST -------------
 export const deletePost = (postId) => async (dispatch) => {
     const response = await fetch(`/api/posts/${postId}`, {
         method: "DELETE",
     })

     if (response.ok) {
         dispatch(deleteAPost(postId))
        //  return 'Delete is working!'
     }
 }


  // --------------- EDIT POST -------------
  export const editPost = ({id, description}) => async (dispatch) => {
      const response = await fetch(`/api/posts/${id}/edit`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id, description})
      })
      if (response.ok) {
          const updatedPost = await response.json();
          dispatch(updatePost(updatedPost))

          return updatedPost
      }
  }


  export const editPostTwo = ({id, description}) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id, description})
    })
    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePostTwo(updatedPost))

        return updatedPost
    }
}

//  ---------------- Reducer:  ----------------
const postReducer = (state = {}, action) => {
    let newState = {}

    switch (action.type) {
        case GET_POSTS: {
            action.posts.posts.forEach((post) => {
                newState[post.id] = post
            });
            return {
                ...newState,
                ...state,
            }
        }
        case CREATE_POST: {
            newState = { ...state, [action.post.id]: action.post}
            return newState
        }
        case GET_USERS_POSTS: {
            action.payload.posts.forEach((post) => {
                newState[post.id] = post
            })
            return newState
        }
        case DELETE_POST: {
            newState = {...state}
            delete newState[action.postid]
            return newState
        }
        case EDIT_POST: {

        }

        default:
            return state;
    }

}


export default postReducer
