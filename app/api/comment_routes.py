from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms.comment_form import CommentForm, EditCommentForm
from app.models import Comment, db
from app.api.auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)



#Gets all comments associated with a post id.
@comment_routes.route('/<int:post_id>')
def get_all_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    # print(comments, '##########################')
    return {'comments': [comment.to_dict() for comment in comments]}


# Post a comment on an associated post:
@comment_routes.route('/<int:post_id>/new', methods=["POST"])
# @login_required
def new_comment(post_id):
    # return 'hi from comments route'
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        print(data, 'DATA DATA DATA?')
        new_comment = Comment(
            comment = data["comment"],
            user_id = current_user.id,
            post_id = post_id
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}




# Edit a comment
@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_comment(id):
    req = request.json
    print(req, 'is this working????? comemnts route')
    print(id, 'is this working?')
    # form = EditCommentForm()
    comment = Comment.query.filter_by(id=id).first()
    print(comment)
    comment.comment = req
    db.session.commit()
    return comment.to_dict()

    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     data = form.data
    #     print(data, 'DATA DATA DATA!')
    #     comment.comment = form.data["comment"]
    #     db.session.commit()
        # return comment.to_dict()
    # return {"errors": validation_errors_to_error_messages(form.errors)}, 401



# Delete a comment:
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    deleted_comment = Comment.query.get(id)
    # print(deleted_comment, 'DELETED DELETED DELETED')
    db.session.delete(deleted_comment)
    db.session.commit()
    return {"COMMENT": "DELETED"}
