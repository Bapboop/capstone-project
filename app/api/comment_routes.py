from tkinter import N
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms.comment_form import CommentForm, EditCommentForm
from app.models import Comment, db, User
from app.api.auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)



#Gets all comments associated with a post id.
@comment_routes.route('/<int:post_id>')
def get_all_comments(post_id):
    comments = list()

    for u, c in db.session.query(User, Comment).filter(User.id == Comment.user_id)\
                                                .filter(Comment.post_id == post_id).all():
        comments.append({
            'id': c.id,
            'comment': c.comment,
            'user_id': c.user_id,
            'post_id': c.post_id,
            'username': u.username,
            "profile_pic": u.profile_pic
        })


    return {'comments': comments}




# Post a comment on an associated post:
@comment_routes.route('/<int:post_id>/new', methods=["POST"])
# @login_required
def new_comment(post_id):
    # return 'hi from comments route'
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_comment = Comment(
            comment = data["comment"],
            user_id = current_user.id,
            post_id = post_id,
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}




# Edit a comment
@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_comment(id):

    form = EditCommentForm()

    comment = Comment.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.comment = form.data["comment"]
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



# Delete a comment:
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    deleted_comment = Comment.query.get(id)
    # print(deleted_comment, 'DELETED DELETED DELETED')
    db.session.delete(deleted_comment)
    db.session.commit()
    return {"COMMENT": "DELETED"}
