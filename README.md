# Overall Project Design Principles

This project uses a frontend-backend separation design. The frontend code is in the client folder, and the backend code is in the server folder, with each part having its own package.json file to manage dependencies separately. Each section also includes .env and .gitignore files for environment settings and to keep sensitive information secure.

The project structure follows the Separation of Concerns principle, organizing features into separate modules and folders for a clear and organized layout. This setup makes the code easier to read and supports future development, scalability, and maintenance.

---

# Client Project Directory

This is the client-side project for the application, built with React.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
This will run all the tests and display results in the terminal.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  
The build is minified and the filenames include the hashes. Your app is ready to be deployed.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**  
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.  
This command will remove the single build dependency from your project.  
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them.  
At this point, you're on your own. You don't have to ever use `eject`, but if you need customizations, it is available.

## Learn More

You can learn more about React and other tools in the documentation:

- [React documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)

## Dependencies

The following core dependencies are used in the project:

- **axios**: A promise-based HTTP client for making API requests.
- **bootstrap**: A front-end framework for building responsive websites.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **formik**: A library for handling form state in React.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods for React.
- **react-router-dom**: DOM bindings for React Router to handle routing.
- **web-vitals**: A library for measuring web performance metrics.
- **react-paginate**: A React component library used to implement pagination in your application.
- **xml2js**: A library used to parse XML data into JavaScript objects and convert JavaScript objects back into XML format.

## Development Dependencies

These dependencies are used during development:

- **cross-env**: A utility for setting environment variables across different platforms.

## License

## This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

# Server Project Directory

This is the server-side project for the application, built with Node.js and Express.

## Available Scripts

In the project directory, you can run:

### `npm run devStart`

Runs the backend server in development mode.  
Open [http://localhost:5000](http://localhost:5000) to interact with the API.  
The server will automatically restart when you make changes.  
You may also see any errors or logs in the terminal.

### `npm run testStart`

Runs the server in test mode with `nde`.  
This is useful for running the server in a test environment.

### `npm test`

Runs the tests using the `mocha` testing framework.  
This will run all tests defined in your project and report the results.

## Learn More

You can learn more about the used technologies here:

- [Express.js documentation](https://expressjs.com/)
- [Mocha testing framework](https://mochajs.org/)
- [Axios HTTP client](https://axios-http.com/)
- [Bcrypt for password hashing](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken for JWT](https://www.npmjs.com/package/jsonwebtoken)

## Dependencies

The following core dependencies are used in the project:

- **axios**: For making HTTP requests.
- **bcrypt**: For password hashing.
- **cors**: For enabling Cross-Origin Resource Sharing (CORS).
- **dotenv**: For loading environment variables.
- **express**: A web framework for building the API.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens (JWT).
- **nodemon**: For auto-restarting the server during development.
- **pg**: PostgreSQL client for Node.js to interact with the database.

## Development Dependencies

These dependencies are used during development:

- **chai**: Assertion library for testing.
- **cross-env**: For setting environment variables across different platforms.
- **mocha**: JavaScript test framework for running tests.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

# Project Directory Structure Explanation

## Since the project is ongoing, the directory file structure may continue to change. Therefore, the displayed structure is the initial one, and adjustments will be made once the project is completed.

## Root Directory

- `.env` - Global environment variables
- `.gitignore` - Global Git ignore file
- `README.md` - Project documentation

## Client (Frontend)

- `client/`
  - `public/` - Public resources folder
  - `src/` - Frontend source code
    - `assets/` - Static resources (e.g., images, icons)
    - `components/` - Reusable UI components
    - `contexts/` - Context API for state management
    - `pages/` - Application pages
      - `home.js` - Home page component
      - `movieDetails.js` - Movie details page component
      - `signIn.js` - Sign-in page component
      - `signUp.js` - Sign-up page component
    - `services/` - Service layer for backend API interactions
      - `authService.js` - Authentication requests
      - `tmdbService.js` - Movie-related API requests
      - `reviewService.js` - Review-related API requests
      - `finnkinoService.js` - Finnkino API service
    - `App.js` - Root component
    - `App.test.js` - App component tests
    - `index.js` - Frontend entry point
    - `logo.svg` - Default icon
    - `reportWebVitals.js` - Performance reporting
    - `setupTests.js` - Testing environment setup
  - `.env` - Frontend environment variables
  - `.gitignore` - Git ignore file
  - `package.json` - Frontend dependencies and scripts

## Server (Backend)

- `server/`
  - `controllers/` - Routing logic controllers
    - `authController.js` - User authentication
    - `groupController.js` - User group
    - `movieController.js` - Movie data
    - `reviewController.js` - Review data
  - `database/` - Database configuration
    - `db.js` - Database connection config
    - `seeders/` - SQL scripts for initial data
  - `models/` - Data models
    - `groupModel.js` - User group model
    - `movieModel.js` - Movie model
    - `reviewModel.js` - Review model
    - `userModel.js` - User model
  - `routes/` - Application routes
    - `authRoutes.js` - User authentication routes
    - `groupRoutes.js` - User group routes
    - `movieRoutes.js` - Movie routes
    - `reviewRoutes.js` - Review routes
  - `services/` - External API services
    - `finnkinoService.js` - Finnkino API
    - `tmdbService.js` - Movie API
    - `reviewService.js` - Review API
    - `authService.js` - Authentication API
  - `test.rest` - Backend checking API
  - `index.js` - Backend entry point
  - `index.test.js` - Backend entry test file
  - `.env` - Backend environment variables
  - `.gitignore` - Git ignore file
  - `package.json` - Backend dependencies and scripts

---

# about .env files

Since the .gitignore file is set to ignore the .env file, it won't be tracked or uploaded to GitHub. Therefore, you'll need to create your own .env files locally. There are three .env files in total, located as follows: one in the root directory (currently an empty file), one in the client directory (also currently empty), and one in the server directory.

I have set up the .env file in the server directory with the following content:

PORT = 5000 <br>
DB_HOST = localhost <br>
DB_PORT = 5432 <br>
DB_USER = postgres <br>
DB_PASSWORD = your_password <br>
DB_NAME = movieapp <br>
TEST_DB_NAME = test_movieapp <br>
JWT_SECRET = your_jwt_secret <br>
TMDB_API_KEY = your_tmdb_api_key <br>

Please add this to your local environment files accordingly.

---

# Restclient

First send request for Register user with email and password
Second send request for Login with email and password.
When Login successfully this will generate a token.
With the help of token the account can be deleted. Paste the token when sending delete request.

# May continue to increase as the project progresses
