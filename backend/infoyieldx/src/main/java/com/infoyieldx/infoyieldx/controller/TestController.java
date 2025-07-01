package com.infoyieldx.infoyieldx.controller;




import com.infoyieldx.infoyieldx.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/test")
    public class TestController {

        @Autowired
        private EmailService emailServices;

        @GetMapping("/email")
        public String testEmail() {
            emailServices.sendSuccessLoginEmail("your_email@gmail.com");
            return "✅ Email triggered";
        }
    }


