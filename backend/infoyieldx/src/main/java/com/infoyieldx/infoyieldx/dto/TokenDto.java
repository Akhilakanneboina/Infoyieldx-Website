package com.infoyieldx.infoyieldx.dto;

public class TokenDto {
    private String idToken;

    public TokenDto() {
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public TokenDto(String idToken) {
        this.idToken = idToken;
    }

    @Override
    public String toString() {
        return "TokenDto{" +
                "idToken='" + idToken + '\'' +
                '}';
    }
}
