package com.infoyieldx.infoyieldx.util;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;



import java.util.Collections;
import java.util.Optional;

public class GoogleTokenUtil {

    private static final String CLIENT_ID = "944679613259-6dj3p7mnr8v9qji346vvc95i7hsr8f3r.apps.googleusercontent.com";

    public static Optional<GoogleIdToken.Payload> verifyToken(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                return Optional.of(idToken.getPayload());
            } else {
                System.err.println("❌ Invalid ID token");
                return Optional.empty();
            }
        } catch (Exception e) {
            System.err.println("❌ Error verifying Google ID token: " + e.getMessage());
            return Optional.empty();
        }
    }
}
