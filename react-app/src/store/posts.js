//  ---------------- Action Types:  ----------------
const GET_POSTS = 'posts/GET_POSTS'


// ---------------- Action creators:  ----------------
const getPosts = (posts) => {
    return {
       type: GET_POSTS,
       posts
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








//  ---------------- Reducer:  ----------------
const postReducer = (state = {}, action) => {
    let newState = {}

    switch (action.type) {
        case GET_POSTS: {
            action.posts.forEach((post) => {
                newState[post.id] = post
            });
            return {
                ...newState,
                ...state,
            }
        }

        default:
            return state;
    }

}


export default postReducer
