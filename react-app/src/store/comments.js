//  ---------------- Action Types:  ----------------
const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'




// ---------------- Action creators:  ----------------
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}


const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const updateComment = (payload) => {
    return {
        type: EDIT_COMMENT,
        payload
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


// --------------- CREATE A COMMENT ON A SPECIFIC POST --------------
export const createNewComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/${payload.post_id}/new`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(createComment(comment))
    }
}


// --------------- DELETE USERS COMMENT -------------
export const deleteAComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}


 // --------------- EDIT COMMENT -------------
 export const editComment = ({id, comment}) => async (dispatch) => {
     console.log(id, 'edit comment thunk')
     const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id, comment})
     })
     if (response.ok) {
         const updatedComment = await response.json();
         dispatch(updateComment(updatedComment))
         return updatedComment
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
        case CREATE_COMMENT: {
            newState = {...state, [action.comment.id]: action.comment}
            return newState;
        }
        case DELETE_COMMENT: {
            newState = {...state}
            delete newState[action.commentId]
            return newState
        }
        case EDIT_COMMENT: {
            newState = {
                ...state,
                [action.payload.id]: action.payload.comment
            }
            return newState
        }


        default:
            return state;
    }
}

export default commentReducer
