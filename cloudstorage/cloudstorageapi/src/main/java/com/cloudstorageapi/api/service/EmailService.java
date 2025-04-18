package com.cloudstorageapi.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final Random random = new Random();
    private final Map<String, String> otpStorage = new HashMap<>();

    public String createVerificationEmail(String toEmail) throws MailException {
        String otp = generateOTP();
        otpStorage.put(toEmail, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("multicloud.ver6767@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Email Verification");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);

        return otp;
    }

    private String generateOTP() {
        return String.format("%04d", random.nextInt(10000));
    }

    public boolean verifyOTP(String email, String userInputOTP) {
        String storedOTP = otpStorage.get(email);
        if (storedOTP != null && storedOTP.equals(userInputOTP)) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }

    public void sendWelcomeEmail(String toEmail) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("multicloud.ver6767@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Welcome to Our Service!");
        message.setText("Hi there!\n\nThanks for signing up. We're excited to have you.");
        mailSender.send(message);
    }

    public void sendEmail(String to, String subject, String body) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("multicloud.ver6767@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}