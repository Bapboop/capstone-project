import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments, deleteAComment } from '../../store/comments';
import EditComment from './EditComment';

const ViewComments = ({ post }) => {
    const dispatch = useDispatch();
    const postId = post?.id

    // console.log('test test test test')
    // console.log(post)
    // Access to: post.description, post.id, post.photo_url, post.user_id

    
    useEffect(() => {
        dispatch(getAllComments(postId))
    }, [dispatch])

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })


    // Temp delete placeholder:
    const handleDelete = async (e) => {
        e.preventDefault();
        const commentId = e.target.id
        // console.log(commentId, "is this the comment id?") => works

        const deletedComment = await(dispatch(deleteAComment(commentId)))
    }

    // console.log(comments, '***********************comments component')


    return (
        <>
        {comments?.map((comment) => (

            <>
            <p> Username Placholder: {comment?.comment}</p>
            <div>
            <EditComment comment={comment} post={post} />
            <button id={comment?.id} className="delete-comment" onClick={handleDelete}> Delete </button>

            </div>
            </>
        )

        )}
        </>
    )
}

export default ViewComments
