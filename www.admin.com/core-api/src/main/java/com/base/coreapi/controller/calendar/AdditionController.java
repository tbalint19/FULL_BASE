package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Addition;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.AdditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/addition")
public class AdditionController {

    @Autowired
    private AdditionRepository repository;

    @GetMapping("/all")
    public List<Addition> getAll(@RequestParam Long start) {
        Date monday = new Date(start);
        Date sunday = new Date(start + 604800000);
        return repository.findByDateBetween(monday, sunday);
    }

    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Addition addition) {
        repository.save(addition);
        return new SuccessResponse(true);
    }

    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody Addition addition) {
        repository.delete(addition);
        return new SuccessResponse(true);
    }
}
