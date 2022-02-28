from .db import db


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    photo_url = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")



    def to_dict(self):
        return {
            "id": self.id,
            "photo_url": self.photo_url,
            "description": self.description,
            "user_id": self.user_id,
            # 'username': self.username
        }
