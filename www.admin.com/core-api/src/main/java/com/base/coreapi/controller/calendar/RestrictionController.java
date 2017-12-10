package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Restriction;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.RestrictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/restriction")
public class RestrictionController {

    @Autowired
    private RestrictionRepository repository;

    @GetMapping("/all")
    public List<Restriction> getAll(@RequestParam Long start) {
        Date monday = new Date(start);
        Date sunday = new Date(start + 604800000);
        return repository.findByDateBetween(monday, sunday);
    }

    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Restriction restriction) {
        repository.save(restriction);
        return new SuccessResponse(true);
    }

    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody Restriction restriction) {
        repository.delete(restriction);
        return new SuccessResponse(true);
    }
}
