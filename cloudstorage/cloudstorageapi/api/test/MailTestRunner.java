package com.cloudstorageapi.api.test;

import com.cloudstorageapi.api.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MailTestRunner implements CommandLineRunner {

    @Autowired
    private EmailService emailService;

    @Override
    public void run(String... args) throws Exception {
        emailService.sendEmail("raghavturkar7@gmail.com", "Test Email", "Hello from Spring Boot!");
    }
}
// more tests