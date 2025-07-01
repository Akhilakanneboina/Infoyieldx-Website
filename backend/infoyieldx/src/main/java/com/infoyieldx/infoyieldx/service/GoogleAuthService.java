package com.infoyieldx.infoyieldx.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.infoyieldx.infoyieldx.dto.TokenDto;
import com.infoyieldx.infoyieldx.model.Login;
import com.infoyieldx.infoyieldx.repository.LoginRepository;
import com.infoyieldx.infoyieldx.util.GoogleTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class GoogleAuthService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmailService emailServices;

    public ResponseEntity<?> verifyGoogleToken(TokenDto tokenDto) {
        Optional<Payload> payloadOptional = GoogleTokenUtil.verifyToken(tokenDto.getIdToken());

        if (payloadOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid Google ID Token"));
        }

        Payload payload = payloadOptional.get();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        // Check if user exists
        Login existingUser = loginRepository.findByEmail(email);

        if (existingUser == null) {
            // ✅ Auto-register new user
            Login newUser = new Login();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setPassword("GOOGLE_OAUTH");
            newUser.setAuthProvider("GOOGLE");
            loginRepository.save(newUser);

            // ✅ Send welcome email
            emailServices.sendSuccessRegistrationEmail(email);

            existingUser = newUser;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Google Sign-In successful");
        response.put("user", existingUser);

        return ResponseEntity.ok(response);
    }
}
