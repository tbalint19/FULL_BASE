package com.base.coreapi.repository.faq;

import com.base.coreapi.model.faq.Faq;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends CrudRepository<Faq, Long> {

    List<Faq> findAll();
}
