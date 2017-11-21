package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Reservation;
import com.base.coreapi.model.calendar.dto.ReservationCreateDTO;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.service.calendar.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/calendar/reservarion")
public class ReservationController {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private ReservationService service;

    @Transactional
    @PostMapping("/create")
    public SuccessResponse create(@RequestBody ReservationCreateDTO dto){
        service.createReservation(dto.getUser(), dto.getEvent(), dto.getSlots());
        return new SuccessResponse(true);
    }

    @Transactional
    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody List<Reservation> reservations){
        repository.delete(reservations);
        return new SuccessResponse(true);
    }
}
