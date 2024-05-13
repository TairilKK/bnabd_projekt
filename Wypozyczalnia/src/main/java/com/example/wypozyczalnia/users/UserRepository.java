package com.example.wypozyczalnia.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailIgnoreCase(String email);
    List<User> findByRoleIgnoreCase(String role);
}
