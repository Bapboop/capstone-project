from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# --------------- GET USERS POSTS -------------
# TODO: Create a route that gets all posts by a user for their profile.
@user_routes.route('/<int:id>/posts')
def users_posts(id):
    # return 'Is this thing on?'
    # posts = Post.query.filter(Post.user_id == id).all()
    # return {'posts': [post.to_dict() for post in posts]}

    posts = list()

    print(id, 'what is this?')
    for u, p in db.session.query(User, Post).filter(id == User.id).filter(User.id == Post.user_id).all():
    # .filter(User.id == Post.user_id).all():

                                                  # .filter(id == Post.id).all():

        # print(posts)
        # print(u.username)
        posts.append({
                "id": p.id,
                "photo_url": p.photo_url,
                "description": p.description,
                "user_id": p.user_id,
                "username": u.username,
        })

        # print(jsonify(posts.username))

    # print(posts)
    return {'posts': posts}
