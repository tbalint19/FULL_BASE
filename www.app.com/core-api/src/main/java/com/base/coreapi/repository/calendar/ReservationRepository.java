package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {

    List<Reservation> findByDateBetween(Date start, Date end);

    List<Reservation> findByDateAfterAndUser(Date date, ApplicationUser user);
}
