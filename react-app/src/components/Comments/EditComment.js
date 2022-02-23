import {React, useState} from "react";
import { editComment, getAllComments } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";


const EditComment = ({comment, post}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // console.log(post, 'post inside of edit comment?')
    const postId = post?.id
    const userId = user?.id

    const [commentValue, setCommentValue] = useState(comment?.comment)

    const updateComment = (e) => setCommentValue(e.target.value);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const payload = {
            id: comment.id,
            comment: commentValue
        }

        // const id = comment.id
        // console.log(payload, 'update comment payload??')
        // // const updatedComment = await
        //  dispatch(editComment(id, comment))

        // dispatch(getAllComments(postId))
        // // if (updatedComment) {
        // }
    }


    return (
        <>
        {/* <form className="edit-comment-form" onSubmit={handleUpdate}>

               <input
               type="text"
               placeholder="Add a comment..."
               required
               value={commentValue}
               onChange={updateComment}
               />
               </form> */}
               {/* <button >Save changes</button> */}
        </>
    )
}


export default EditComment
