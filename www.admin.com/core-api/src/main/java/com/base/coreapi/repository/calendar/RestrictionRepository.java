package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Restriction;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface RestrictionRepository extends CrudRepository<Restriction, Long> {

    List<Restriction> findAll();

    List<Restriction> findByDateBetween(Date start, Date end);

}
