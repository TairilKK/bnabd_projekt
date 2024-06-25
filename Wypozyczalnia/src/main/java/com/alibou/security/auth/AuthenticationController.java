package com.alibou.security.auth;

import com.alibou.security.config.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
          @RequestBody RegisterRequest request
  ) {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    System.out.println("Wylogowywanie użytkownika");
    service.logout(request, response);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/check")
  public ResponseEntity<Map<String, Boolean>> checkAuthentication(HttpServletRequest request) {
    final String authHeader = request.getHeader("Authorization");
    Map<String, Boolean> response = new HashMap<>();
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      System.out.println("Brak nagłówka Authorization lub nieprawidłowy format");
      response.put("isAuthenticated", false);
      return ResponseEntity.ok(response);
    }
    final String token = authHeader.substring(7);
    final String userEmail = service.getUsernameFromToken(token);
    if (userEmail != null) {
      UserDetails userDetails = service.loadUserByUsername(userEmail);
      var isTokenValid = service.isTokenValid(token, userDetails);
      var storedToken = service.findTokenByToken(token);
      boolean isValid = isTokenValid && storedToken != null && !storedToken.isExpired() && !storedToken.isRevoked();
      System.out.println("Token jest ważny: " + isValid);
      response.put("isAuthenticated", isValid);
      return ResponseEntity.ok(response);
    }
    System.out.println("Nie znaleziono użytkownika lub tokenu");
    response.put("isAuthenticated", false);
    return ResponseEntity.ok(response);
  }
}
