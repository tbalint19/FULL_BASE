package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.*;
import com.base.coreapi.repository.calendar.AdditionRepository;
import com.base.coreapi.repository.calendar.HolidayRepository;
import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.repository.calendar.RestrictionRepository;
import com.base.coreapi.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api/calendar/data/")
public class DTOController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdditionRepository additionRepository;

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private RestrictionRepository restrictionRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    @GetMapping("/all")
    public CalendarDTO getAll(@RequestParam Long start, Principal principal){
        ApplicationUser user = userService.getUserByCredential(principal.getName());
        Date now = new Date();
        Date threeWeeksLater = new Date(now.getTime() + 2629746000L);

        CalendarDTO dto = new CalendarDTO();
        dto.setAdditions(additionRepository.findByDateBetween(now, threeWeeksLater));
        dto.setHolidays(holidayRepository.findByDateBetween(now, threeWeeksLater));
        dto.setRestrictions(restrictionRepository.findByDateBetween(now, threeWeeksLater));
        dto.setReservations(reservationRepository.findByDateBetween(now, threeWeeksLater));
        dto.setOwnReservations(reservationRepository.findByDateAfterAndUser(now, user));

        return dto;
    }
}
