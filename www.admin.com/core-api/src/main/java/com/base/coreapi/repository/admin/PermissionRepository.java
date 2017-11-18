package com.base.coreapi.repository.admin;

import com.base.coreapi.model.admin.Permission;
import org.springframework.data.repository.CrudRepository;

public interface PermissionRepository extends CrudRepository<Permission, Long> {
}
