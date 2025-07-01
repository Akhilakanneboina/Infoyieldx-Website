package com.infoyieldx.infoyieldx.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.infoyieldx.infoyieldx.dto.RegisterDto;
import com.infoyieldx.infoyieldx.service.RegisterService;
import com.infoyieldx.infoyieldx.util.GoogleTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    // ✅ 1. Normal registration (manual form)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto) {
        try {
            String response = registerService.registerUser(registerDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Error during registration: " + e.getMessage());
        }
    }

    // ✅ 2. Google Sign-In registration
    @PostMapping("/google-register")
    public ResponseEntity<?> googleRegister(@RequestBody Map<String, String> body) {
        try {
            String idTokenString = body.get("idToken");
            System.out.println("📨 Received idToken: " + idTokenString);

            Optional<GoogleIdToken.Payload> optionalPayload = GoogleTokenUtil.verifyToken(idTokenString);
            if (optionalPayload.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid Google token");
            }

            GoogleIdToken.Payload payload = optionalPayload.get();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            System.out.println("📧 Email: " + email);
            System.out.println("👤 Name: " + name);

            String message = registerService.registerWithGoogle(email, name, picture);
            return ResponseEntity.ok(message);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Internal Server Error: " + e.getMessage());
        }
    }
}
