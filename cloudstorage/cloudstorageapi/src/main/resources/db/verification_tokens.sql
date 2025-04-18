CREATE TABLE verification_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for faster token lookups
CREATE INDEX idx_token ON verification_tokens(token);
-- Index for finding tokens by user
CREATE INDEX idx_user_id ON verification_tokens(user_id);
-- Index for cleanup of expired tokens
CREATE INDEX idx_expiry_date ON verification_tokens(expiry_date);