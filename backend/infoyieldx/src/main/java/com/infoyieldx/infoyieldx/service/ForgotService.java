package com.infoyieldx.infoyieldx.service;

import com.infoyieldx.infoyieldx.dto.LoginDto;
import com.infoyieldx.infoyieldx.dto.RegisterDto;
import com.infoyieldx.infoyieldx.model.ForgotModel;
import com.infoyieldx.infoyieldx.repository.ForgotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ForgotService {

    @Autowired
    private ForgotRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(RegisterDto dto) {
        Optional<ForgotModel> existingUser = userRepository.findByEmail(dto.getEmail());
        if (existingUser.isPresent()) {
            return "❌ User already exists with this email";
        }

        ForgotModel user = new ForgotModel();
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setAuthProvider("local");

        userRepository.save(user);
        return "✅ User registered successfully";
    }

    public String loginUser(LoginDto dto) {
        Optional<ForgotModel> userOpt = userRepository.findByEmail(dto.getEmail());
        if (userOpt.isEmpty()) {
            return "❌ User not found";
        }

        ForgotModel user = userOpt.get();
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return "❌ Invalid credentials";
        }

        return "✅ Login successful";
    }

    public ForgotModel findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public void updateResetToken(String token, String email) {
        Optional<ForgotModel> userOpt = userRepository.findByEmail(email);
        userOpt.ifPresent(user -> {
            user.setResetToken(token);
            userRepository.save(user);
        });
    }
    @Autowired
    private EmailService emailService;

    public void sendPasswordResetEmail(String email) {
        ForgotModel user = findByEmail(email);
        if (user == null) return;

        // Generate reset token (UUID or random string)
        String token = UUID.randomUUID().toString();
        updateResetToken(token, email);

        String resetLink = "http://localhost:3001/reset-password?token=" + token;
        emailService.sendResetLink(email, resetLink);
    }
    public boolean resetPassword(String token, String newPassword) {
        Optional<ForgotModel> userOpt = userRepository.findByResetToken(token);
        if (userOpt.isPresent()) {
            ForgotModel user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null); // Clear the token after reset
            userRepository.save(user);
            return true;
        }
        return false;
    }


}
