package com.cloudstorageapi.api.controller;

import com.cloudstorageapi.api.model.ResponseMessage;
import com.cloudstorageapi.api.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:5173") // Add CORS configuration to allow requests from frontend
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/index")
    public ResponseEntity<ResponseMessage> index() {
        return ResponseEntity.ok(new ResponseMessage("Email service is running"));
    }

    @PostMapping("/send-verification")
    public ResponseEntity<ResponseMessage> sendVerificationEmail(@RequestParam String email) {
        try {
            emailService.createVerificationEmail(email);
            return ResponseEntity.ok(new ResponseMessage("Verification email sent to " + email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Failed to send verification email: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ResponseMessage> verifyOTP(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = emailService.verifyOTP(email, otp);
        if (isValid) {
            return ResponseEntity.ok(new ResponseMessage("OTP verified successfully"));
        } else {
            return ResponseEntity.badRequest().body(new ResponseMessage("Invalid OTP or OTP expired"));
        }
    }

    @PostMapping("/sendWelcome")
    public ResponseEntity<ResponseMessage> sendWelcomeMail(@RequestParam String email) {
        try {
            emailService.sendWelcomeEmail(email);
            return ResponseEntity.ok(new ResponseMessage("Welcome mail sent to " + email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Failed to send welcome email: " + e.getMessage()));
        }
    }
}