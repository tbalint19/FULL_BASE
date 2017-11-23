package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Slot;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotRepository extends CrudRepository<Slot, Long> {
}
