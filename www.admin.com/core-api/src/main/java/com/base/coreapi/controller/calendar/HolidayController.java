package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Holiday;
import com.base.coreapi.model.calendar.Restriction;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/holiday")
public class HolidayController {

    @Autowired
    private HolidayRepository repository;

    @GetMapping("/all")
    public List<Holiday> getAll(@RequestParam Long start) {
        Date monday = new Date(start);
        Date sunday = new Date(start + 604800000);
        return repository.findByDateBetween(monday, sunday);
    }

    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Holiday holiday) {
        repository.save(holiday);
        return new SuccessResponse(true);
    }

    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody Holiday holiday) {
        repository.delete(holiday);
        return new SuccessResponse(true);
    }
}
