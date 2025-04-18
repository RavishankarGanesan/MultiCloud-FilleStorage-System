package com.cloudstorageapi.api.model;

import java.time.Instant;

public class CloudStorageToken {
    private String userId;
    private String provider; // "google" or "onedrive"
    private String accessToken;
    private String refreshToken;
    private Instant expiresAt;
    private String tokenType;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public boolean isExpired() {
        return Instant.now().isAfter(expiresAt);
    }
}