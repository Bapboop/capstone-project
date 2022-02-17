from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo1 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076095/Gardengram/garden4_zcme0j.png",
        description="Wow.",
        user_id = 1,
        )
    demo2 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076095/Gardengram/garden1_njwrdv.jpg",
        description="Cool!",
        user_id = 1,
        )
    demo3 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garden5_zo24hf.jpg",
        description="Amazing",
        user_id = 2,
        )
    demo4 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garedn2_okdkup.jpg",
        description="Wow.",
        user_id = 2,
        )
    demo5 = Post(
        photo_url="https://res.cloudinary.com/dd9qejhag/image/upload/v1645076094/Gardengram/garden3_qkeosg.jpg",
        description="Wow.",
        user_id = 2,
        )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
