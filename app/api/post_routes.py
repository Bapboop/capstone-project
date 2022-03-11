from flask import Blueprint, jsonify, request
from flask_login import login_fresh, login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, db, User
from app.forms.post_form import EditPostForm, PostForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
                "profile_pic": u.profile_pic
        })

    return {'posts': posts}





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



# -------------------------- Upload image s3: --------------------------------
@post_routes.route("/image", methods=["POST"])
# @login_required
def upload_image():
    # print('we\'re hitting the backend upload image!')
    if "image" not in request.files:
        return {"errors": "image required"}, 400


    image = request.files["image"]
    # print(image, 'what is the image? upload image route')

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    # print(upload, 'what is the upload?')

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # print(url, 'is the url working? ---------->')
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}
