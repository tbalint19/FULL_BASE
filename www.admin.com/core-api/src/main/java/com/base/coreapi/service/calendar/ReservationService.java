package com.base.coreapi.service.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.Reservation;
import com.base.coreapi.model.calendar.Slot;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.repository.calendar.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private SlotRepository slotRepository;

    public void createReservation(ApplicationUser user, Event event, List<Slot> slots){
        for (Slot slot: slots){
            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setEvent(event);
            repository.save(reservation);
            slot.setReservation(reservation);
            slotRepository.save(slot);
        }
    }
}
