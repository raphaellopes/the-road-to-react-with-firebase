# The Road to React with Firebase

This project was written while I was studying the Firebase fundamentals reading
the book [The Road to React with Firebase](https://www.robinwieruch.de/the-road-to-react-with-firebase-book).

## Topics of studying
- Autentication
- Autentication with Social Logins
- Link accounts with different Social Logins
- Protected Routes with Authorization using HOC
- Roles-based Authorization
- Database with Users and Messages
- Deploy with firebase
- For the layout I used [tailwindcss](https://tailwindcss.com/).

## Demo
- To see the final result, you can open this [link](https://book-react-with-firebase.web.app/)

> The landing page has no features and this route is public. I will add some
  feature in the future and manage its content with admin route.

  You can sign up an user with admin role using the sign up route. It is not a
  good practice to keep this flag, but this project is only for studying, so 
  I keep it there

## Available Scripts

In the project directory, you can run:


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `firebase`

You try locally you must create a Firebase project, and set the `.env` file based
on `.env.example` file with the environment variables.

After that, you must login locally with you firebase account. You can follow
the [official docs](https://firebase.google.com/docs/web/setup).
