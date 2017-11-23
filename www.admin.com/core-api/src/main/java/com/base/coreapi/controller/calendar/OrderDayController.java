package com.base.coreapi.controller.calendar;

import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.OrderDay;
import com.base.coreapi.model.calendar.Slot;
import com.base.coreapi.model.calendar.dto.OrderDayCreatorDTO;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.calendar.SlotRepository;
import com.base.coreapi.service.calendar.OrderDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/calendar/orderday")
public class OrderDayController {

    @Autowired
    private OrderDayService orderDayService;

    @Autowired
    private SlotRepository slotRepository;

    @GetMapping("/weekly")
    public List<OrderDay> getForTheWeek(@RequestParam Long monday){
        return orderDayService.getOneWeek(monday);
    }

    @PostMapping("/add")
    public SuccessResponse addNewOrderDay(@RequestBody OrderDayCreatorDTO dto){
        OrderDay orderDay = dto.getOrderDay();
        Set<Event> events = new HashSet<>(dto.getEvents());
        orderDay.setEvents(events);
        orderDayService.save(orderDay);
        for (Slot slot: dto.getSlots()){
            slot.setOrderDay(orderDay);
            slotRepository.save(slot);
        }
        return new SuccessResponse(true);
    }
}
