# Gardengram
It's like Instagram, but for gardens!

A project inspired by Instagram -- Gardengram is an application that allows users to share their garden with others!

- Sign in / Sign up:
![Splash-login](https://user-images.githubusercontent.com/6257940/155988409-5b4267e5-2cf9-4be6-9b8c-5c29568fd978.PNG)
![Signup-splash](https://user-images.githubusercontent.com/6257940/155988426-524cf6df-9c10-4db1-9e0b-8dc02d081eb9.PNG)

- Splash page upon logging in: 
![splash-page](https://user-images.githubusercontent.com/6257940/155988457-17b67067-cbbc-4d16-973d-d3c49141bdc1.PNG)

- User's profile page:
![personal-page](https://user-images.githubusercontent.com/6257940/155988556-0147f5b8-b754-4cf2-bc12-f6852fa92613.PNG)

- Viewing single posts:
![new-single-photo](https://user-images.githubusercontent.com/6257940/155988897-4ee93f72-738d-4ee7-baf6-41b9003d79d4.PNG)




# Technologies used:
- Backend:
   - Python, Flask, SQLAlchemy PostgreSQL, Docker, WTForms
- Frontend: 
   - JavaScript, React, Redux, Vanilla CSS


# Local Installation:
- Running locally requires Python 3.9 and PostgreSQL.

## How to get started:

   -1: Clone the repository
```
git clone https://github.com/Bapboop/capstone-project.git
```


   -2: Install dependencies

      -Backend:

      ```
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```
      -Frontend:
      cd into react-app
      ```
      npm install
      ```

-3: Create a **.env** file based on the .env.example in the root directory.
   ```
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=<secret key>
   DATABASE_URL=postgresql://<username>:<password>@<server>/<database name>

   ```
-4: Setup your PostgreSQL user, password and database based on the data in your .env file.

-5: Start the pipenv shell from the root directory. Migrate and seed the database.

   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

-6: You can now start the server from the root directory with the following command:
   ```
   flask run
   ```

-6: Now cd into react-app to start the frontend server.
   ```
   npm start
   ```



## Future directions:
- Implement likes
- Implement followers
- Implement messaging
