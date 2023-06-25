# React News-explorer

Welcome to the React News Explorer API frontend repository! This project serves as the frontend component of a full-stack web application developed with React, Node.js, and MongoDB. It enables users to search for articles worldwide using the "news-explorer" API, save interesting articles, and view their images, titles, descriptions, and source links. Feel free to explore and navigate to the source pages of the articles you find intriguing.

## Installation

The app is running on VM on "https://www.news-expo.mooo.com"

The server is running on VM on "https://api.news-expo.mooo.com"

To run this project locally, you need to have Node.js and MongoDB and Git installed on your machine.

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the dependencies.
4. Run `npm run start` to start the app.
5. The Homepage will start running on `http://localhost:3000`;

## API Endpoints

The API exposes the following endpoints:

- `POST /signup` - returns Barer token when seccessful registration
- `POST /signin` - login registered user
- `GET /articles` - returns a list of all articles of logged in user.
- `GET /users/me` - returns the user with the specified `userId`.
- `POST /articles` - saves the desired article.
- `DELETE /articles/:articleId` - unsave the saved article from the saved articles list.

## Technologies

This project is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- cors

  The server is using the following technologies:

- Google Cloud
- ssh keygen
- Nginx
- pm2
- certbot
- logs | Winston | Celabrate | Joi

## Contributing

We welcome contributions to this project! To contribute, please fork this repository, create a new branch with your changes, and submit a pull request.

## License

This project is licensed under the Practicum 100 - Masters school By Yandex.
