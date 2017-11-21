package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/event")
public class EventController {

    @Autowired
    private EventRepository repository;

    @GetMapping("/all")
    public List<Event> getAll(){
        List<Event> all = new ArrayList<>();
        for (Event event: repository.findAll()){
            all.add(event);
        }
        return all;
    }

    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Event event){
        repository.save(event);
        return new SuccessResponse(true);
    }
}
