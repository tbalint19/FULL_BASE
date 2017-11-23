package com.base.coreapi.repository.info;

import com.base.coreapi.model.info.MainMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainMessageRepository extends CrudRepository<MainMessage, Long> {
    MainMessage findByIdentifier(String s);
}
