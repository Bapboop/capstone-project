from flask import Blueprint, jsonify, request
from flask_login import login_fresh, login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, db
from app.forms.post_form import PostForm
from app.api.auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)



#Gets all posts
@post_routes.route('/')
def feed_posts():
    # return jsonify('hi') # Works

    posts = Post.query.all()
    return{'posts': [post.to_dict() for post in posts]}




# Gets a post by id
@post_routes.route('/<int:id>')
def test_posts(id):
    posts = Post.query.get(id)
    return {'posts': posts.to_dict()}



# -------------------------- Create a post: --------------------------------
@post_routes.route('/new', methods=['POST'])
# @login_required
def new_post():
    # return 'hi from new post route!'
    form = PostForm()


    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_post = Post(photo_url = data["photo_url"],
                                description = data["description"],
                                user_id = current_user.id)

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401