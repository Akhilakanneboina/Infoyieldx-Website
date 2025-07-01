package com.infoyieldx.infoyieldx.service;

import com.infoyieldx.infoyieldx.model.HrModel;
import com.infoyieldx.infoyieldx.repository.HrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HrService {

    @Autowired
    private HrRepository hrRepository;

    @Autowired
    private EmailService emailService;

    public HrModel saveMessage(HrModel hrModel) {
        HrModel savedModel = hrRepository.save(hrModel);

        // Send email to management
        String subject = "📩 New Contact Message Received";
        String body = "You have received a new message:\n\n" +
                "👤 Name: " + hrModel.getName() + "\n" +
                "📧 Email: " + hrModel.getEmail() + "\n" +
                "✉️ Message:\n" + hrModel.getMessage() + "\n\n" +
                "📅 Time: " + hrModel.getSubmittedAt();

        // Change the management email address here:
        emailService.sendEmail("info@infoyieldx.com", subject, body);

        return savedModel;
    }
}
