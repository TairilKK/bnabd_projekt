package com.example.wypozyczalnia.users;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserApi {
    private UserManager userManager;

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
    public Optional<User> getUserByEmail(@RequestParam  String email){
        return userManager.FindByEmail(email);
    }


}
