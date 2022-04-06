from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='GreenFinger', email='demo@aa.io', profile_pic='https://res.cloudinary.com/dd9qejhag/image/upload/v1646049499/Gardengram/image_crts8i.jpg', first_name='Green', last_name='Finger', password='password')
    barry = User (
        username='Barry', email='barry@barry.com', profile_pic='https://res.cloudinary.com/dd9qejhag/image/upload/v1646049154/Gardengram/2021summer-wild-berries-1188x792_jrd5zz.jpg', first_name='Barry', last_name="Berry", password='barry'
    )
    marnie = User(
        username='Marnie', email='marnie@aa.io', profile_pic='https://res.cloudinary.com/dd9qejhag/image/upload/v1649212932/Gardengram/Marnie_ydcljz.png', first_name='Marnie', last_name='M', password='password')
    bobbie = User(
        username='Joe', email='bobbie@aa.io', profile_pic='https://res.cloudinary.com/dd9qejhag/image/upload/v1649213354/Gardengram/Joe_nqwxiv.png', first_name='Joe', last_name='M', password='password')

    db.session.add(demo)
    db.session.add(barry)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
