package com.base.coreapi.controller.calendar;

import com.base.coreapi.controller.calendar.dto.OrderDayResponse;
import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.OrderDay;
import com.base.coreapi.repository.calendar.OrderDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar/orderday")
public class OrderDayController {

    @Autowired
    private OrderDayRepository orderDayRepository;

    @GetMapping("/all")
    public List<OrderDayResponse> getAll(){
        Date today = new Date();
        List<OrderDay> orderDays = orderDayRepository.findByDateAfter(today);
        List<OrderDayResponse> response = new ArrayList<>();
        for (OrderDay orderDay: orderDays){
            OrderDayResponse toAdd = new OrderDayResponse();
            toAdd.setId(orderDay.getId());
            toAdd.setDate(orderDay.getDate());
            toAdd.setSlots(orderDay.getSlots());
            List<Event> events = new ArrayList<>(orderDay.getEvents());
            toAdd.setEvents(events);
            response.add(toAdd);
        }
        return response;
    }
}
