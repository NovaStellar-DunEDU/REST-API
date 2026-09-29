package com.example.store.controller;

import com.example.store.model.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/books")
public class BookController {

    // temporary data, replace for legit database later
    private final Map<Long, Book> books = new ConcurrentHashMap<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public BookController() {
        // sample data
        save(new Book(null, "Dune", "Frank Herbert", "9780441013593", 9.99, 1965));
        save(new Book(null, "The Hobbit", "J.R.R. Tolkien", "9780547928227", 8.99, 1937));
        save(new Book(null, "1984", "George Orwell", "9780451524935", 7.99, 1949));
    }

    private Book save(Book book) {
        book.setId(nextId.getAndIncrement());
        books.put(book.getId(), book);
        return book;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAll() {
        return ResponseEntity.ok(new ArrayList<>(books.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@PathVariable Long id) {
        Book book = books.get(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(save(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody Book updated) {
        if (!books.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        books.put(id, updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (books.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
