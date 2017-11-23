package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
}
