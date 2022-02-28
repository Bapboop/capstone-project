from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


#Follows join table
follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(500))
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # A user has many comments:
    comments = db.relationship('Comment', back_populates='user')



    # TODO: Figure out M:M Self-referential followers relationship. Focus on this later.
    """
    Use primary join to find all rows in the followers table where follower_id is X,
    use secondary join to find all rows in the followers table where followed_id is X,
    get those two to find all users that follow user X, and all users that are followed by user X.

    Lazy determines how the related objects get loaded when querying. Dynamic returns an sqlalchemy
    object, which allows us to further query(?).
    """
    #Follows relationship: M:M
    followers = db.relationship(
        "User",
        secondary = follows,
        primaryjoin = (follows.c.follower_id == id),
        secondaryjoin = (follows.c.followed_id == id),
        backref = db.backref('follows', lazy ='dynamic'),
        lazy ='dynamic'
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'email': self.email
        }
