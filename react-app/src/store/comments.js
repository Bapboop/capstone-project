//  ---------------- Action Types:  ----------------
const GET_COMMENTS = 'comments/GET_COMMENTS'




// ---------------- Action creators:  ----------------
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}



//  ---------------- Thunks:  ----------------

// --------------- GET ALL COMMENTS TO A SPECIFIC POST --------------
export const getAllComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json();
        console.log(comments, 'COMMENTS INSIDE OF THUNK')
        dispatch(getComments(comments))
    }
}


//  ---------------- Reducer:  ----------------
const commentReducer = (state = {}, action) => {
    let newState = {}

    switch (action.type) {
        case GET_COMMENTS: {
            action.comments.comments.forEach((comment) => {
                newState[comment.id] = comment
            })
            return newState
        }


        default:
            return state;
    }
}

export default commentReducer
