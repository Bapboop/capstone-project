from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo1 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076095/Gardengram/garden4_zcme0j.png",
        description="Dream garden!",
        user_id = 1,
        )
    demo2 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076095/Gardengram/garden1_njwrdv.jpg",
        description="I can't wait until spring!",
        user_id = 1,
        )
    demo3 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garden5_zo24hf.jpg",
        description="Harvest haul!",
        user_id = 3,
        )
    demo4 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garedn2_okdkup.jpg",
        description="Wow.",
        user_id = 3,
        )
    demo5 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garden3_qkeosg.jpg",
        description="Fun garden ideas!.",
        user_id = 3,
        )
    demo6 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1646049318/Gardengram/Chia-Pet-Keyboard_m4w0yv.jpg",
        description="My kind of garden!",
        user_id = 2,
        )
    demo7 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1646049811/Gardengram/zzzzzzzzz_ed52md.png",
        description="Keeping my garden green!",
        user_id = 2,
        )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
