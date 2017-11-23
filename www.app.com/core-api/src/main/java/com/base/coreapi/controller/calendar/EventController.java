package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.repository.calendar.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/event")
public class EventController {

    @Autowired
    private EventRepository repository;

    @GetMapping("/all")
    public List<Event> getAll(){
        List<Event> events = new ArrayList<>();
        for (Event event: repository.findAll()){
            events.add(event);
        }
        return events;
    }
}
