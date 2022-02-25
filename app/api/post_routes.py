from flask import Blueprint, jsonify, request
from flask_login import login_fresh, login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, db, User
from app.forms.post_form import EditPostForm, PostForm

post_routes = Blueprint('posts', __name__)



#Gets all posts
@post_routes.route('/')
def feed_posts():
    posts = list()

    for u, p in db.session.query(User, Post).filter(User.id == Post.user_id).all():

        posts.append({
                "id": p.id,
                "photo_url": p.photo_url,
                "description": p.description,
                "user_id": p.user_id,
                "username": u.username,
        })

    return {'posts': posts}




    # posts = Post.query.all()
    # return{'posts': [post.to_dict() for post in posts]}




# Gets a post by id
@post_routes.route('/<int:id>')
def test_posts(id):


    posts = list()

    for u, p in db.session.query(User, Post).filter(User.id == Post.user_id).all():
    # .filter(id == Post.id).all():

        posts.append({
                "id": p.id,
                "photo_url": p.photo_url,
                "description": p.description,
                "user_id": p.user_id,
                "username": u.username,
        })

    # print(posts)
    return {'posts': posts}

    # posts = Post.query.get(id)
    # return {'posts': posts.to_dict()}



# -------------------------- Create a post: --------------------------------
@post_routes.route('/new', methods=['POST'])
@login_required
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

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# -------------------------- Delete a post: --------------------------------
@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    deletePost = Post.query.filter(Post.id == id).first()
    # print(deletePost)
    db.session.delete(deletePost)
    db.session.commit()

    return {"POST": "DELETED"}



# -------------------------- Edit a post: --------------------------------
@post_routes.route('/<id>/edit', methods=["PUT"])
def edit_post(id):
    form = EditPostForm()
    post = Post.query.get(id)


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post.description = form.data['description']

        db.session.commit()

        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
