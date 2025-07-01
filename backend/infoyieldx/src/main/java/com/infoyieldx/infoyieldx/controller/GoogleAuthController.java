package com.infoyieldx.infoyieldx.controller;

import com.infoyieldx.infoyieldx.dto.TokenDto;
import com.infoyieldx.infoyieldx.service.GoogleAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React frontend origin
public class GoogleAuthController {

    @Autowired
    private GoogleAuthService googleAuthService;

    @PostMapping("/google-auth")
    public ResponseEntity<?> googleRegister(@RequestBody TokenDto tokenDto) {
        return googleAuthService.verifyGoogleToken(tokenDto);
    }
}
