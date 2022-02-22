import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../../store/comments';

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

    console.log(comments, '***********************comments component')


    return (
        <>
        {comments?.map((comment) => (
            <p> {comment?.comment}</p>
        )

        )}
        </>
    )
}

export default ViewComments
