from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Comment


class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])


class EditCommentForm(FlaskForm):
    comment = StringField('description')
