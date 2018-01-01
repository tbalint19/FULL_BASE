package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.Reservation;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/reservation")
public class ReservationController {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<Reservation> getAllUpcoming(Principal principal) {
        ApplicationUser user = userService.getUserByCredential(principal.getName());
        return repository.findByDateAfterAndUser(new Date(), user);
    }

    @GetMapping("/all")
    public List<Reservation> getAllForTheWeek(@RequestParam Long start) {
        Date monday = new Date(start);
        Date sunday = new Date(start + 1814400000);
        return repository.findByDateBetween(monday, sunday);
    }

    @Transactional
    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Reservation reservation, Principal principal){
        List<Reservation> reservationsForSameSpot = repository.findByDateBetween(
            new Date(reservation.getDate().getTime()), new Date(reservation.getDate().getTime())
        );
        if (0 < reservationsForSameSpot.size()) {
            return new SuccessResponse(false);
        }
        ApplicationUser user = userService.getUserByCredential(principal.getName());
        reservation.setUser(user);
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
