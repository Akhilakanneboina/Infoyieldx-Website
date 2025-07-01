package com.infoyieldx.infoyieldx.model;

import jakarta.persistence.*;

@Entity
@Table(name = "login")
public class ForgotModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String email;
    private String password;
    private String authProvider;
    private String resetToken;

    public ForgotModel() {}

    public ForgotModel(Long id, String userName, String email, String password, String authProvider, String resetToken) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.authProvider = authProvider;
        this.resetToken = resetToken;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    @Override
    public String toString() {
        return "ForgotModel{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", authProvider='" + authProvider + '\'' +
                ", resetToken='" + resetToken + '\'' +
                '}';
    }
}
