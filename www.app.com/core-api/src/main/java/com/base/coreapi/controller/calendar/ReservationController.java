package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.Reservation;
import com.base.coreapi.model.calendar.Slot;
import com.base.coreapi.model.calendar.dto.ReservationCreateDTO;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.auth.UserRepository;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.repository.calendar.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/calendar/reservation")
public class ReservationController {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SlotRepository slotRepository;

    @PostMapping("/reserve")
    public SuccessResponse reserve(@RequestBody ReservationCreateDTO dto, Principal principal){
        ApplicationUser user = userRepository.findByUsername(principal.getName());
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setEvent(dto.getEvent());
        repository.save(reservation);
        dto.getSlot().setActive(false);
        dto.getSlot().setReservation(reservation);
        slotRepository.save(dto.getSlot());
        return new SuccessResponse(true);
    }
}
