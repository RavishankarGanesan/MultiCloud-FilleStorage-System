package com.cloudstorageapi.api.service;

import com.cloudstorageapi.api.model.User;
import com.cloudstorageapi.api.model.VerificationToken;
import com.cloudstorageapi.api.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    public VerificationToken createVerificationToken(User user) {
        // First, check if user already has a token
        VerificationToken existingToken = tokenRepository.findByUser(user);
        if (existingToken != null) {
            tokenRepository.delete(existingToken);
        }

        // Create new token
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(user, token);
        return tokenRepository.save(verificationToken);
    }

    public VerificationToken getVerificationToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public boolean validateToken(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null) {
            return false;
        }

        if (verificationToken.isUsed()) {
            return false;
        }

        if (verificationToken.isExpired()) {
            return false;
        }

        // Mark token as used
        verificationToken.setUsed(true);
        tokenRepository.save(verificationToken);

        return true;
    }

    public void deleteExpiredTokens() {
        tokenRepository.findAll().stream()
            .filter(token -> token.isExpired() || token.isUsed())
            .forEach(tokenRepository::delete);
    }
}