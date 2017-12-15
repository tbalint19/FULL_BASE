package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Holiday;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface HolidayRepository extends CrudRepository<Holiday, Long> {

    List<Holiday> findAll();

    List<Holiday> findByDateBetween(Date start, Date end);
}
