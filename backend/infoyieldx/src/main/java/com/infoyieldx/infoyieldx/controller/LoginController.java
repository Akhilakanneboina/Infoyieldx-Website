package com.infoyieldx.infoyieldx.controller;

import com.infoyieldx.infoyieldx.dto.LoginDto;
import com.infoyieldx.infoyieldx.model.Login;
import com.infoyieldx.infoyieldx.service.EmailService;
import com.infoyieldx.infoyieldx.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Match with your React frontend origin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private EmailService emailServices;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDTO) {
        try {
            Login user = loginService.loginUser(loginDTO);

            // ✅ Send success email after successful login
            emailServices.sendSuccessLoginEmail(user.getEmail());

            return ResponseEntity.ok(Map.of("message", "Login successful", "user", user));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
