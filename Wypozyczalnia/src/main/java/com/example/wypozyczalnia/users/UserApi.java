package com.example.wypozyczalnia.users;

import com.example.wypozyczalnia.LoginRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserApi {
    private static final Logger logger = LoggerFactory.getLogger(UserApi.class);
    private final UserManager userManager;

    public UserApi(UserManager userManager) {
        this.userManager = userManager;
    }

    @GetMapping("/all")
    public Iterable<User> getAll() {
        return userManager.FindAll();
    }

    @GetMapping("/id")
    public Optional<User> getById(@RequestParam Long id){
        return userManager.FindById(id);
    }

    @GetMapping("/{userId}")
    public Optional<User> getId(@PathVariable("userId") Long id){
        return userManager.FindById(id);
    }

    @GetMapping("/email")
    public Optional<User> getUserByEmail(@RequestParam String email){
        return userManager.FindByEmail(email);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userManager.save(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        return userManager.FindByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
