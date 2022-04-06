from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        comment='IKR! Goals!', user_id=3, post_id=1)
    comment2 = Comment(
        comment='Nice haul!', user_id=1, post_id=3)
    comment3 = Comment(
        comment='Speechless!', user_id=1, post_id=5)
    comment4 = Comment(
        comment='This is coming along great!', user_id=2, post_id=2)
    comment5 = Comment(
        comment='I agree! I love what you did!', user_id=4, post_id=2)


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()






def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
