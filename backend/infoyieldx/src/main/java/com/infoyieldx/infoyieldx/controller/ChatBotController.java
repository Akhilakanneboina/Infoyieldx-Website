package com.infoyieldx.infoyieldx.controller;

import com.infoyieldx.infoyieldx.dto.ChatRequest;
import com.infoyieldx.infoyieldx.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatBotController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit")
    public ResponseEntity<String> handleChat(@RequestBody ChatRequest request) {
        try {
            System.out.println("📥 Received chatbot request:");
            System.out.println("🧑 Email: " + request.getEmail());
            System.out.println("💼 Service: " + request.getService());
            System.out.println("💬 Chat: " + request.getChat());

            // ✅ Send chat summary to team + confirmation to user
            emailService.handleChatSubmission(request);

            return ResponseEntity.ok("✅ Emails sent successfully.");
        } catch (Exception e) {
            System.err.println("❌ Failed to send chatbot emails: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Failed to send emails.");
        }
    }
}
