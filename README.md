# Store API (Spring Boot)

Run: `mvn spring-boot:run`  (Java 17+)

Endpoints (same for /books and /customers):
- GET    /books        -> 200
- GET    /books/{id}   -> 200 / 404
- POST   /books        -> 201
- PUT    /books/{id}   -> 200 / 404
- DELETE /books/{id}   -> 204 / 404

Test:
curl -i localhost:8080/books
curl -i -X POST localhost:8080/books -H "Content-Type: application/json" \
  -d '{"title":"Emma","author":"Jane Austen","isbn":"123","price":7.5,"publishYear":1815}'
curl -i -X DELETE localhost:8080/books/1
