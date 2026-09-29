# Store API (Spring Boot)

Run: `mvn spring-boot:run`  (Java 17+)

Endpoints (same for /books and /customers):
- GET    /books        -> 200
- GET    /books/{id}   -> 200 / 404
- POST   /books        -> 201
- PUT    /books/{id}   -> 200 / 404
- DELETE /books/{id}   -> 204 / 404


NOTE: All of the customer information is FAKE and made up.
<img width="896" height="825" alt="image" src="https://github.com/user-attachments/assets/45cde7ef-a5d1-42fd-b92c-eee42259d6a3" />
