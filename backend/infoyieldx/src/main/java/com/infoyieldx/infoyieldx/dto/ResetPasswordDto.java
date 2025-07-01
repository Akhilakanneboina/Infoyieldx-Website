package com.infoyieldx.infoyieldx.dto;

public class ResetPasswordDto {
    private String token;
    private String newPassword;

    // Constructors
    public ResetPasswordDto() {
    }

    public ResetPasswordDto(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "ResetPasswordDto{" +
                "token='" + token + '\'' +
                ", newPassword='" + newPassword + '\'' +
                '}';
    }
}
