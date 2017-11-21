package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface EventRepository extends CrudRepository<Event, Long> {

    Set<Event> findByIdIn(List<Long> ids);
}
