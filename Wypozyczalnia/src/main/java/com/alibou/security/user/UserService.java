package com.alibou.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords are not the same");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);
    }

    public Optional<User> FindById(Long id) {
        return repository.findById(id);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = repository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole().name()))
                .collect(Collectors.toList());
    }

    public void updateUserRole(Long id, String role, String currentUserEmail) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getEmail().equals(currentUserEmail)) {
            throw new IllegalStateException("Cannot change your own role");
        }

        user.setRole(Role.valueOf(role));
        repository.save(user);
    }
}

