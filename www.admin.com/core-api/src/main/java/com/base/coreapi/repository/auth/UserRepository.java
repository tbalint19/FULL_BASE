package com.base.coreapi.repository.auth;

import com.base.coreapi.model.auth.ApplicationUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<ApplicationUser, Long> {

    ApplicationUser findByUsername(String username);

    ApplicationUser findByEmail(String email);

    ApplicationUser findByUsernameIgnoreCase(String username);

    ApplicationUser findByEmailIgnoreCase(String email);

    ApplicationUser findById(Long userId);

//    ApplicationUser findByUsernameOrEmail(String credential);
}
