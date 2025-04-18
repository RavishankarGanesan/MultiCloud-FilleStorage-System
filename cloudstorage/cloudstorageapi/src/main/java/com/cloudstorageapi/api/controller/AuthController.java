package com.cloudstorageapi.api.controller;

import com.cloudstorageapi.api.model.User;
import com.cloudstorageapi.api.model.VerificationToken;
import com.cloudstorageapi.api.model.ResponseMessage;
import com.cloudstorageapi.api.model.LoginRequest;
import com.cloudstorageapi.api.model.JwtResponse;
import com.cloudstorageapi.api.service.UserService;
import com.cloudstorageapi.api.service.EmailService;
import com.cloudstorageapi.api.service.VerificationTokenService;
import com.cloudstorageapi.api.config.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationTokenService verificationTokenService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if user already exists
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Email already registered"));
        }

        // Since OTP verification is already done, set user as verified
        user.setVerified(true);

        // Save user
        userService.save(user);

        // Send welcome email
        try {
            emailService.sendWelcomeEmail(user.getEmail());
        } catch (Exception e) {
            // Log the error but continue with registration
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }

        return ResponseEntity.ok(new ResponseMessage("Registration successful. Welcome to MultiCloud!"));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);

        if (verificationToken == null) {
            return ResponseEntity.badRequest().body("Invalid verification token");
        }

        if (verificationToken.isExpired()) {
            return ResponseEntity.badRequest().body("Verification token has expired. Please request a new one.");
        }

        if (verificationToken.isUsed()) {
            return ResponseEntity.badRequest().body("This verification link has already been used.");
        }

        if (!verificationTokenService.validateToken(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired verification token");
        }

        User user = verificationToken.getUser();
        user.setVerified(true);
        userService.save(user);

        return ResponseEntity.ok("Email verified successfully. You can now log in.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String email = loginRequest.getEmail().trim().toLowerCase(); // Normalize email
            String password = loginRequest.getPassword();

            // Authenticate the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            // Retrieve the user from the database
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

            // Generate JWT token
            final String jwt = jwtTokenUtil.generateToken(user.getEmail());

            // Return the token in the response
            return ResponseEntity.ok(Map.of("token", jwt));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }
    }
}
