package com.example.store.controller;

import com.example.store.model.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final Map<Long, Customer> customers = new ConcurrentHashMap<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public CustomerController() {
        // sample data
        save(new Customer(null, "Ada", "Lovelace", "ada@example.com", "555-0100", "12 Analytical Way"));
        save(new Customer(null, "Alan", "Turing", "alan@example.com", "555-0101", "7 Enigma Road"));
    }

    private Customer save(Customer customer) {
        customer.setId(nextId.getAndIncrement());
        customers.put(customer.getId(), customer);
        return customer;
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(new ArrayList<>(customers.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(@PathVariable Long id) {
        Customer customer = customers.get(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(save(customer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer updated) {
        if (!customers.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        customers.put(id, updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (customers.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
