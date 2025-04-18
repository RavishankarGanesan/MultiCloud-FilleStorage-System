package com.cloudstorageapi.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/email/**").permitAll()  // 👈 Allow unauthenticated email access
//                 .anyRequest().authenticated()
//             )
//             .httpBasic(Customizer.withDefaults()); // Optional: Basic auth support

//         return http.build();
//     }
// }



@Configuration
@ConfigurationProperties(prefix = "cloud.storage")
public class CloudStorageConfig {
    private Google google;
    private OneDrive onedrive;

    public static class Google {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
        private String authUri;
        private String tokenUri;

        public String getClientId() { return clientId; }
        public void setClientId(String clientId) { this.clientId = clientId; }
        public String getClientSecret() { return clientSecret; }
        public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
        public String getRedirectUri() { return redirectUri; }
        public void setRedirectUri(String redirectUri) { this.redirectUri = redirectUri; }
        public String getAuthUri() { return authUri; }
        public void setAuthUri(String authUri) { this.authUri = authUri; }
        public String getTokenUri() { return tokenUri; }
        public void setTokenUri(String tokenUri) { this.tokenUri = tokenUri; }
    }

    public static class OneDrive {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
        private String authUri;
        private String tokenUri;

        public String getClientId() { return clientId; }
        public void setClientId(String clientId) { this.clientId = clientId; }
        public String getClientSecret() { return clientSecret; }
        public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
        public String getRedirectUri() { return redirectUri; }
        public void setRedirectUri(String redirectUri) { this.redirectUri = redirectUri; }
        public String getAuthUri() { return authUri; }
        public void setAuthUri(String authUri) { this.authUri = authUri; }
        public String getTokenUri() { return tokenUri; }
        public void setTokenUri(String tokenUri) { this.tokenUri = tokenUri; }
    }

    public Google getGoogle() { return google; }
    public void setGoogle(Google google) { this.google = google; }
    public OneDrive getOnedrive() { return onedrive; }
    public void setOnedrive(OneDrive onedrive) { this.onedrive = onedrive; }
}