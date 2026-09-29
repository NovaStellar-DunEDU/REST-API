# Store API (Spring Boot)

Run: `mvn spring-boot:run`  (Java 17+)

Endpoints (same for /books and /customers):
- GET    /books        -> 200
- GET    /books/{id}   -> 200 / 404
- POST   /books        -> 201
- PUT    /books/{id}   -> 200 / 404
- DELETE /books/{id}   -> 204 / 404


- All of the customer information is FAKE and made up.
