package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Addition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AdditionRepository extends CrudRepository<Addition, Long> {

    List<Addition> findAll();

    List<Addition> findByDateBetween(Date start, Date end);
}
