package com.infoyieldx.infoyieldx.repository;

import com.infoyieldx.infoyieldx.model.RegisterModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<RegisterModel, Long> {
    Optional<RegisterModel> findByEmail(String email);
    boolean existsByEmail(String email);
}
