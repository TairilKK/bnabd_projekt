package com.alibou.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService service;

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = service.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long id,
            @RequestParam String role,
            Principal principal
    ) {
        service.updateUserRole(id, role, principal.getName());
        return ResponseEntity.ok().build();
    }
}

