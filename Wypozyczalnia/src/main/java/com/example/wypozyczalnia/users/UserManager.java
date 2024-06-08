package com.example.wypozyczalnia.users;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserManager {
    private final UserRepository userRepository;

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> FindById(Long id) {
        return userRepository.findById(id);
    }
    public Iterable<User> FindAll(){
        return userRepository.findAll();
    }
    public User save(User user) {
        return userRepository.save(user);
    }
    public void delete(User user) {
        userRepository.delete(user);
    }
    public Optional<User> FindByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
