package com.infoyieldx.infoyieldx.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_name")
    private String username;

    @Column(name = "auth_provider")
    private String authProvider;

    @Column(name = "reset_token")
    private String resetToken;

    // Constructors
    public Login() {
    }

    public Login(Long id, String email, String password, String username, String authProvider, String resetToken) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.authProvider = authProvider;
        this.resetToken = resetToken;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
        return "Login{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", authProvider='" + authProvider + '\'' +
                ", resetToken='" + resetToken + '\'' +
                '}';
    }
}
