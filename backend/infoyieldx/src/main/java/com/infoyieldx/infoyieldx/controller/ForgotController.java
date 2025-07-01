package com.infoyieldx.infoyieldx.controller;

import com.infoyieldx.infoyieldx.dto.ForgotPasswordDto;
import com.infoyieldx.infoyieldx.dto.LoginDto;
import com.infoyieldx.infoyieldx.dto.RegisterDto;
import com.infoyieldx.infoyieldx.dto.ResetPasswordDto;
import com.infoyieldx.infoyieldx.model.ForgotModel;
import com.infoyieldx.infoyieldx.service.EmailService;
import com.infoyieldx.infoyieldx.service.ForgotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/user")
@CrossOrigin(origins = "http://localhost:3000")
public class ForgotController {

    @Autowired
    private ForgotService authService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto dto) {
        String result = authService.registerUser(dto);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto dto) {
        String result = authService.loginUser(dto);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody ForgotPasswordDto dto) {
        Map<String, String> response = new HashMap<>();
        String email = dto.getEmail();
        ForgotModel user = authService.findByEmail(email);

        if (user == null) {
            response.put("message", "❌ Email not found");
            return ResponseEntity.badRequest().body(response);
        }

        String token = java.util.UUID.randomUUID().toString();
        authService.updateResetToken(token, email);

        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        emailService.sendResetLink(email, resetLink);

        response.put("message", "✅ Password reset link sent to email.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordDto dto) {
        Map<String, String> response = new HashMap<>();
        boolean success = authService.resetPassword(dto.getToken(), dto.getNewPassword());

        if (success) {
            response.put("message", "✅ Password reset successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "❌ Invalid or expired token");
            return ResponseEntity.badRequest().body(response);
        }
    }

}
