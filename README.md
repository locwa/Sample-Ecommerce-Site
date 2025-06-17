# Sample Ecommerce Site

This is a sample ecommerce site that contains cart functionality, simple product listing, and a product details page.<br>
Live Link: https://ecommerce.lapolicarpio.com

--------------------------------------------------------------------------------------------------------------------------

## Major Dependencies

* [Github](https://www.github.com)
* [MySQL](https://www.mysql.com/)
* [React](https://react.dev/)
* [Apollo Client](https://github.com/apollographql/apollo-client)
* [graphql-php](https://github.com/webonyx/graphql-php)
* [PHP](https://www.php.net/)
* [Vite](https://vite.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Upstash](https://upstash.com/)
* [Node.js](https://nodejs.org/en)

--------------------------------------------------------------------------------------------------------------------------

## Getting Started

Make sure you have these dependencies before so that you can run the project locally.

* [Node.js](https://nodejs.org/en)
* [npm](https://docs.npmjs.com/about-npm)
* [Composer](https://getcomposer.org/)
* [MySQL](https://www.mysql.com/)

Make sure to import db.sql to your MySQL database.

## Installation

1. Get the code by cloning it or downloading and extracting the zip file.
2. Open your terminal and change directory to the location of the extracted zip file.

### Backend Setup
3. Change your directory to the backend folder in the terminal.
4. run `php composer install`
5. Copy all text from `.envexample` and create a new .env file.
6. Paste copied text to the .env file.
7. Fill out all variables in the .env file (remove Redis variables if you're not using cache).
8. Run this code to start a local GraphQL server:
   ```
   php -s localhost:8080 public/index.php
   ```
   
### Frontend Setup
   
9. Change your directory to the backend folder in the terminal.
10. Run `npm install` to install frontend dependencies.
11. Paste copied text to the .env file.
12. Fill out the VITE_GRAPHQL_URI variable with the link from step 8 (http://localhost:8080).
13. Run `npm run dev` to start the project locally.

--------------------------------------------------------------------------------------------------------------------------


