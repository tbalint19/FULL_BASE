package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
