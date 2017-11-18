package com.base.coreapi.repository.auth;

import com.base.coreapi.model.auth.Confirmation;
import org.springframework.data.repository.CrudRepository;

public interface ConfirmationRepository extends CrudRepository<Confirmation, Long> {

}
