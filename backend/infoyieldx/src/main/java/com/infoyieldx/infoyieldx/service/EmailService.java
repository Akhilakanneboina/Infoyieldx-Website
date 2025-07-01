package com.infoyieldx.infoyieldx.service;

import com.infoyieldx.infoyieldx.dto.ChatRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String FROM_EMAIL = "akhiy759@gmail.com";  // sender
    private static final String TEAM_EMAIL = "akhikanneboina78@gmail.com";  // ✅ use different recipient than sender

    public void sendResetLink(String toEmail, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(toEmail);
            message.setSubject("Password Reset Request");
            message.setText("Hello,\n\nClick the following link to reset your password:\n" + resetLink +
                    "\n\nIf you didn't request this, you can safely ignore this email.\n\nBest regards,\nInfoYieldX Team");

            mailSender.send(message);
            System.out.println("✅ Reset email sent to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Error sending reset email: " + e.getMessage());
        }
    }

    public void sendEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            System.out.println("✅ Email sent to: " + toEmail);
            System.out.println("📨 Subject: " + subject);
            System.out.println("📝 Body:\n" + body);
        } catch (Exception e) {
            System.err.println("❌ Error sending email to " + toEmail + ": " + e.getMessage());
        }
    }

    public void sendSuccessRegistrationEmail(String toEmail) {
        sendEmail(toEmail, "Welcome to InfoYieldX!",
                "✅ You have successfully registered with InfoYieldX using your Google account.\n\nBest regards,\nInfoYieldX Team");
    }

    public void sendSuccessLoginEmail(String toEmail) {
        sendEmail(toEmail, "Login Successful - InfoYieldX",
                "🎉 You have successfully logged in to InfoYieldX.\n\nIf this wasn't you, please reset your password immediately.\n\nBest regards,\nInfoYieldX Team");
    }

    // ✅ Send chat details to HR/team
    public void sendToTeam(ChatRequest request) {
        String subject = "New Chat Inquiry - " + request.getService();
        String body = "📧 Email: " + request.getEmail() +
                "\n💼 Service: " + request.getService() +
                "\n\n💬 Chat Summary:\n" + request.getChat();

        System.out.println("📤 Sending chat summary to HR: " + TEAM_EMAIL);
        sendEmail(TEAM_EMAIL, subject, body);
    }

    // ✅ Send thank-you confirmation to the user
    public void sendConfirmationToUser(String userEmail) {
        String subject = "Thank You for Contacting InfoYieldX";
        String body = "Hi,\n\nThank you for reaching out to InfoYieldX. "
                + "Our team has received your query and will get back to you shortly.\n\n"
                + "Best regards,\nInfoYieldX Team";

        sendEmail(userEmail, subject, body);
    }

    // ✅ Optional: combine both for reuse
    public void handleChatSubmission(ChatRequest request) {
        sendToTeam(request);
        sendConfirmationToUser(request.getEmail());
    }
}
