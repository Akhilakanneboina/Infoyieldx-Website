package com.infoyieldx.infoyieldx.service;

import com.infoyieldx.infoyieldx.dto.RegisterDto;
import com.infoyieldx.infoyieldx.model.RegisterModel;
import com.infoyieldx.infoyieldx.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailServices;

    // Manual registration
    public String registerUser(RegisterDto dto) {
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new RuntimeException("❌ Password and Confirm Password do not match.");
        }

        if (registerRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("❌ This email is already registered.");
        }

        RegisterModel user = new RegisterModel();
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        registerRepository.save(user);

        // Send welcome email
        String subject = "🎉 Welcome to InfoYieldX!";
        String body = "Hi " + user.getUserName() + ",\n\nThank you for registering with InfoYieldX.\n\nBest regards,\nInfoYieldX Team";
        emailServices.sendEmail(user.getEmail(), subject, body);

        return "✅ User registered successfully!";
    }

    // Google Sign-In registration
    public String registerWithGoogle(String email, String name, String pictureUrl) {
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("❌ Email is missing in Google token payload.");
        }

        Optional<RegisterModel> existingUser = registerRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "ℹ️ User already registered with this email.";
        }

        RegisterModel user = new RegisterModel();
        user.setUserName(name != null ? name : "Google User");
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("GOOGLE_LOGIN")); // placeholder password

        registerRepository.save(user);

        // Send welcome email
        String subject = "🎉 Welcome to InfoYieldX!";
        String body = "Hi " + user.getUserName() + ",\n\nThanks for registering using Google Sign-In.\nWe're glad to have you on board.\n\nBest regards,\nInfoYieldX Team";
        emailServices.sendEmail(email, subject, body);

        return "✅ User registered successfully using Google.";
    }
}
