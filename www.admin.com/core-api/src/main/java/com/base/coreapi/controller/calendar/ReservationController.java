package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Reservation;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.service.calendar.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/reservation")
public class ReservationController {

    @Autowired
    private ReservationRepository repository;

    @GetMapping("/all")
    public List<Reservation> getAllForTheWeek(@RequestParam Long start) {
        Date monday = new Date(start);
        Date sunday = new Date(start + 604800000);
        return repository.findByDateBetween(monday, sunday);
    }

    @Transactional
    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Reservation reservation){
        repository.save(reservation);
        return new SuccessResponse(true);
    }

    @Transactional
    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody Reservation reservation){
        repository.delete(reservation);
        return new SuccessResponse(true);
    }
}
