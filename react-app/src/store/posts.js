//  ---------------- Action Types:  ----------------
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const GET_USERS_POSTS = 'posts/GET_USERS_POSTS'



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
        const post = await response.json();
        dispatch(createPost)
        return post
    }
}

// --------------- GET USERS POSTS -------------
export const getUsersPost = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/posts`)

    if (response.ok) {
        const posts = await response.json();
        console.log(posts, 'INSIDE THE USERS POST THUNK')
        dispatch(usersPosts(posts))
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
        case GET_USERS_POSTS: {
            action.payload.posts.forEach((post) => {
                newState[post.id] = post
            })
            return newState
        }
        default:
            return state;
    }

}


export default postReducer
