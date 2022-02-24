from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

def valid_format(form, field):
    photo_url = field.data

    if 'png' in photo_url or 'jpg' in photo_url:
        return
    elif 'jpeg' in photo_url or 'gif' in photo_url:
        return
    else:
        raise ValidationError("The entered URL is not a valid format")


class PostForm(FlaskForm):
    photo_url = StringField('photo_url', validators=[DataRequired(), valid_format])
    description = StringField('description')


class EditPostForm(FlaskForm):
    description = StringField('description')
