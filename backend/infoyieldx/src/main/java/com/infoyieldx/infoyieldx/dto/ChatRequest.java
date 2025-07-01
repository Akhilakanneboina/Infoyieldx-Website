package com.infoyieldx.infoyieldx.dto;

public class ChatRequest {
    private String email;
    private String service;
    private String chat;

    public ChatRequest() {
    }

    public ChatRequest(String email, String service, String chat) {
        this.email = email;
        this.service = service;
        this.chat = chat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getChat() {
        return chat;
    }

    public void setChat(String chat) {
        this.chat = chat;
    }

    @Override
    public String toString() {
        return "ChatRequestDto{" +
                "email='" + email + '\'' +
                ", service='" + service + '\'' +
                ", chat='" + chat + '\'' +
                '}';
    }
}
