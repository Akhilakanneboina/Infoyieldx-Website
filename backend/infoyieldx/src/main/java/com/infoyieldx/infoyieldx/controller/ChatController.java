package com.infoyieldx.infoyieldx.controller;




import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/chat")
    @CrossOrigin(origins = "*")
    public class ChatController {

        @PostMapping
        public String respond(@RequestBody ChatRequest request) {
            String userMessage = request.getMessage().toLowerCase();

            if (userMessage.contains("service") || userMessage.contains("offer")) {
                return "We offer web development, analytics, and automation services!";
            } else if (userMessage.contains("contact")) {
                return "You can contact us at info@infoyieldx.com";
            } else if (userMessage.contains("thanks") || userMessage.contains("thank you")) {
                return "You're welcome! Let us know if you need anything else.";
            } else {
                return "Thanks for reaching out! We'll get back to you shortly.";
            }
        }

        static class ChatRequest {
            private String message;

            public String getMessage() {
                return message;
            }

            public void setMessage(String message) {
                this.message = message;
            }
        }
    }



