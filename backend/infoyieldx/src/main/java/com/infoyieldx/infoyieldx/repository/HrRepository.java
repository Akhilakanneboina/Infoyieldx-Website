package com.infoyieldx.infoyieldx.repository;

import com.infoyieldx.infoyieldx.model.HrModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HrRepository extends JpaRepository<HrModel, Long> {
}
