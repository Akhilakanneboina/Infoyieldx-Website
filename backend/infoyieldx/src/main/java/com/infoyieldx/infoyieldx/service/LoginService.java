package com.infoyieldx.infoyieldx.service;

import com.infoyieldx.infoyieldx.dto.LoginDto;
import com.infoyieldx.infoyieldx.model.Login;
import com.infoyieldx.infoyieldx.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmailService emailServices;  // ✅ Inject the Email Service

    public Login loginUser(LoginDto loginDTO) {
        Login user = loginRepository.findByEmail(loginDTO.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }


        emailServices.sendSuccessLoginEmail(user.getEmail());
  

        return user;
    }
}
