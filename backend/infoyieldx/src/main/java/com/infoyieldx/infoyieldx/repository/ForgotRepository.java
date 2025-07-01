package com.infoyieldx.infoyieldx.repository;

import com.infoyieldx.infoyieldx.model.ForgotModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotRepository extends JpaRepository<ForgotModel, Long> {
    Optional<ForgotModel> findByEmail(String email);
    Optional<ForgotModel> findByResetToken(String resetToken);
}
