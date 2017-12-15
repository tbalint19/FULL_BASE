package com.base.coreapi.controller.info;

import com.base.coreapi.model.info.MainMessage;
import com.base.coreapi.repository.info.MainMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/info/mainmessage")
public class MainMessageController {

    @Autowired
    private MainMessageRepository repository;

    @GetMapping("/get/home")
    public MainMessage getHome() {
        return repository.findByIdentifier("home-message");
    }

    @GetMapping("/get/calendar")
    public MainMessage getCalendar() {
        return repository.findByIdentifier("calendar-message");
    }
}
