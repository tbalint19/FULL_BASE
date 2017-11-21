package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Slot;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/calendar/slot")
public class SlotController {

    @Autowired
    private SlotRepository repository;

    @RequestMapping("/toggle")
    public SuccessResponse toggle(@RequestBody Slot slot){
        slot.setActive(!slot.getActive());
        repository.save(slot);
        return new SuccessResponse(true);
    }
}
