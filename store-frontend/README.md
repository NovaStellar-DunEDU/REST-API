# Book Store Front End (React)

React front end for the Spring Boot `store-api` project.

## Run it

1. Start the Spring Boot API (port 8080): `mvn spring-boot:run` in the `store-api` folder.
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

The dev server proxies `/api/*` to `http://localhost:8080/*` (see `vite.config.js`),
so no CORS configuration is needed on the API.

## Pages

- **Catalog** (`/catalog`): every book as a small product card.
- **Management** (`/management`): form to add or edit a book, plus a table of all
  books with Edit and Delete buttons. The table reloads after every successful change.
  Empty or invalid fields block the add/update.

## Notes

The API stores data in memory, so books reset whenever the Spring Boot app restarts.
