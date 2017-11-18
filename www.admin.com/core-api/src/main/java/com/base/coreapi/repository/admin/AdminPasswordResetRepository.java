package com.base.coreapi.repository.admin;

import com.base.coreapi.model.admin.AdminPasswordReset;
import org.springframework.data.repository.CrudRepository;

public interface AdminPasswordResetRepository extends CrudRepository<AdminPasswordReset, Long> {
    AdminPasswordReset findByCode(String code);
}
