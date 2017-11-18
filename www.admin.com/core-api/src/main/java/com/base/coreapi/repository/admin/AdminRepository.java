package com.base.coreapi.repository.admin;

import com.base.coreapi.model.admin.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long> {

    Admin findByEmailIgnoreCase(String s);

    Admin findByNameIgnoreCase(String credential);

    Admin findByName(String username);
}
