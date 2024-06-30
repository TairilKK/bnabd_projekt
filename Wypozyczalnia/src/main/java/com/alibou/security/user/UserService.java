package com.alibou.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.util.Comparator;
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

    public Page<UserDTO> getAllUsers(Pageable pageable, String filter, String sortBy) {
        Sort sort = Sort.by(sortBy).reverse();
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        if (StringUtils.hasText(filter)) {
            return repository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    filter, filter, filter, sortedPageable).map(UserDTO::new);
        } else {
            return repository.findAll(sortedPageable).map(UserDTO::new);
        }
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

