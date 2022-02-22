from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        comment='Test comment1', user_id=1, post_id=1)
    comment2 = Comment(
        comment='Test comment2', user_id=1, post_id=1)
    comment3 = Comment(
        comment='Test comment3', user_id=1, post_id=1)
    comment4 = Comment(
        comment='Test comment4', user_id=1, post_id=2)
    comment5 = Comment(
        comment='Test comment5', user_id=1, post_id=2)


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()






def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
