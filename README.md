# Gardengram
It's like Instagram, but for gardens!

A project inspired by Instagram, you can visit the live site [here](https://gardengram.herokuapp.com/). Gardengram is an application that allows users to share their garden with others!

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
